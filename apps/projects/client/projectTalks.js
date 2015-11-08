"use strict";
Template.projectTalks.helpers({
    project () {
        return Template.instance().project()
    },
    draftTalk () {
        return Template.instance().draftTalk();
    },
    canAdd () {
        let draftTalk = Template.instance().draftTalk();
        return draftTalk && !!draftTalk.title.length && !!draftTalk.content.length ?  "": "disabled";
    },
    talks () {
        return Template.instance().talks();
    }
});

Template.projectTalks.events({
    'click .add-talk' (e, t) {
        e.preventDefault();
        
        Meteor.call('addTalk', this, function(error, result) {
            if (error) {
                sAlert.addError(error.reason, "Add talk edit");
            }

            if (result) {
                sAlert.addSuccess("Talk added");
            }
        });
    }
});

Template.projectTalks.onCreated(function () {
    let self = this;

    self.autorun(() => {

        self.projectId = () => {
            FlowRouter.watchPathChange();
            let context = FlowRouter.current();
            return context.params.projectId
        };

        self.subscribe('userProjects');
        self.subscribe('talks', {'project.id': self.projectId()});


        if (self.subscriptionsReady()) {
            self.project = function () {
                return Project.findOne({_id: self.projectId()})
            };

            if (!self.project()) {
                FlowRouter.go('mainDash');
            }
            self.talks = () => {
                return Talks.find({'project.id': self.project()._id, status: "publish"}, {sort: {createdAt: -1}})
            };
            self.draftTalk = () => {
                return Talks.findOne({
                    'author.id': Meteor.user()._id,
                    'project.id': self.project()._id,
                    status: "draft"
                })
            };
        }


    })
});

Template.projectTalks.onRendered(function () {
    //add your statement here
});

Template.projectTalks.onDestroyed(function () {
    //add your statement here
});

