"use strict";

Template.projectMain.helpers({
    project () {
        return Template.instance().project();
    },
    projectUser () {
        return Template.instance().projectUsers();
    },
    projectAddUser () {
        return {
            id: 'projectAddUser',
            actionBtnLabel: 'Add',
            cancelBtnLabel: 'Cancel',
            template: Template.projectMain,
            modalTitle: "Invite user",
            modalBody: "projectAddUserForm",
            modalBodyIsTemplate: true,
            hideOnSuccess: false,
            onShow: function (e, t) {
                //Session.set("projectId", t.elementData.projectId);
                console.log('on show callback' );

            },
            onShown: function (e, t) {
                t.$("#projectAddUserForm").data('projectId', t.elementData.projectId);

                console.log('on shown callback', t.$("#projectAddUserForm").data());
            },
            onHide: function (event, template) {
                console.log('on hide callback');
            },
            confirmAction: function (event, template) {
                event.preventDefault();
                console.log('confirm action');
                //console.log(template);
                $("#projectAddUserForm").submit();
                //$("#addProjectForm").submit();
            },
            cancelAction: function (event, template) {
                console.log('cancel action');
                $("#projectAddUserForm")[0].reset();
                //$("#addProjectForm")[0].reset();
            }
        }
    },
    projectRemoveUser() {
        return {
            id: 'projectRemoveUser',
            actionBtnLabel: 'Remove',
            cancelBtnLabel: 'Cancel',
            template: Template.projectMain,
            modalTitle: "Remove user",
            modalBody: 'Remove user <strong><span class="username"></span></strong> from project?',
            //modalBody: 'Remove user from project?',
            modalBodyIsTemplate: false,
            hideOnSuccess: true,
            onShow: function (e, t) {
                var user = Meteor.users.findOne({_id: t.elementData.userId});
                t.$(".username").text(user.username)

            },
            onShown: function (e, t) {
            },
            onHide: function (event, template) {
            },
            confirmAction: function (e, t) {
                event.preventDefault();
                var data = {
                    userId: t.elementData.userId,
                    projectId: FlowRouter.getParam("projectId")
                };
                Meteor.call("removeUserFromProject", data, function (error, result) {
                    if (error) {
                        sAlert.addError(error.reason)
                    }
                    if (result) {
                        sAlert.addSuccess("User removed from project")
                    }
                })

            },
            cancelAction: function (event, template) {
            }
        }
    }

});

Template.projectMain.events({
    //add your events here
});

Template.projectMain.onCreated(function () {
    let self = this;

    self.autorun(function () {
        if (self.parentTemplate(MyApp.levelMainDashLayout).subscriptionsReady()){
            self.project = function () {
                FlowRouter.watchPathChange();
                let context = FlowRouter.current();
                return Project.findOne({_id: context.params.projectId})
            };
            if (!self.project()) {
                FlowRouter.go('404');

            }
            self.projectUsers = function () {
                let project = self.project();
                return Meteor.users.find({_id: {$in: project.allowedUsers}}, {sort: {username: 1}})
            }
        }
    })
});

Template.projectMain.onRendered(function () {
});

Template.projectMain.onDestroyed(function () {
    //add your statement here
});

