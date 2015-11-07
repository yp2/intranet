"use strict";
Template.projectTalks.helpers({
    project () {
        return Template.instance().project()
    },
    draftTalk () {
        return Talks.findOne({
            'project.id': FlowRouter.getParam("projectId"),
            status: "draft"
        })
    }
});

Template.projectTalks.events({
    //add your events here
});

Template.projectTalks.onCreated(function () {
    let self = this;

    self.autorun(() => {
        if (self.parentTemplate(MyApp.levelMainDashLayout).subscriptionsReady()){

            self.project = function () {
                FlowRouter.watchPathChange();
                let context = FlowRouter.current();
                return Project.findOne({_id: context.params.projectId})
            };

            if (!self.project()) {
                FlowRouter.go('mainDash');

            }
            self.subscribe('talks', {'project.id': self.project()._id});
            
            if (self.subscriptionsReady()) {
                self.talks = () => {
                    return Talks.find({'project.id': self.project()._id})
                }
            }
        }

    })
});

Template.projectTalks.onRendered(function () {
    //add your statement here
});

Template.projectTalks.onDestroyed(function () {
    //add your statement here
});

