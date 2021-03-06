"use strict";

Template.projectMain.helpers({
    project () {
        return Template.instance().project();
    },
    projectUser () {
        return Template.instance().projectUsers();
    },
    editTitle () {
        return Template.instance().editTitle.get();
    },
    editDescription () {
        return Template.instance().editDescription.get();
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
    },
    projectDelete () {
        let project = Template.instance().project();
        return {
            id: 'projectDelete',
            actionBtnLabel: 'Delete',
            cancelBtnLabel: 'Cancel',
            template: Template.projectMain,
            modalTitle: "Delete project",
            modalBody: `Delete poroject <strong>${project.title}</strong>`,
            modalBodyIsTemplate: false,
            hideOnSuccess: true,
            confirmAction: function (e, t) {
                let projectId = FlowRouter.getParam("projectId");
                Meteor.call('deleteProject', {projectId: projectId}, function (error, result) {
                    if (error) {
                        sAlert.addError(error.reason, "Can't delete");
                    }
                    if (result) {
                        let alertConfig = _.clone(sAlert.settings);
                        alertConfig.onRouteClose = false;
                        FlowRouter.go('mainDash');
                        sAlert.addSuccess("Project deleted", alertConfig);
                    }
                })
            }
        }
    }

});

Template.projectMain.events({
    "click .edit-project-title" (e,t) {
        e.preventDefault();
        let value = t.editTitle.get();
        if (value) {
            t.editTitle.set(false);
        } else {
            t.editTitle.set(true);
        }
    },
    'blur .content-header input' (e, t) {
        let value = t.editTitle.get();
        if (value) {
            t.editTitle.set(false);
        } else {
            t.editTitle.set(true);
        }
    },
    'blur .project-description textarea' (e, t) {

        let value = t.editDescription.get();
        if (value) {
            t.editDescription.set(false);
        } else {
            t.editDescription.set(true);
        }
    },

    "click .edit-project-description" (e, t) {
        e.preventDefault();
        let value = t.editDescription.get();

        if (value) {
            t.editDescription.set(false);
        } else {
            t.editDescription.set(true);
        }
    }


});

Template.projectMain.onCreated(function () {
    let self = this;

    self.editTitle = new ReactiveVar(false);
    self.editDescription = new ReactiveVar(false);

    self.autorun(function () {
        if (self.parentTemplate(MyApp.levelMainDashLayout).subscriptionsReady()){

            self.project = function () {
                FlowRouter.watchPathChange();
                let context = FlowRouter.current();
                return Project.findOne({_id: context.params.projectId})
            };

            let project = self.project();

            if (!project) {
                FlowRouter.go('mainDash');

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

