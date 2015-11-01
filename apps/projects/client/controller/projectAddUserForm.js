"use strict";

Template.projectAddUserForm.helpers({
    formFunction () {
        return function (dataForMethod) {
            let fields = dataForMethod.fieldsValues;

            if (!MyApp.validateEmail(fields.email)) {
                throw new Meteor.Error(406, {field: 'email', reason: "Incorrect email address"});
            }

            if (typeof dataForMethod.formElementData.projectId === "undefined") {
                throw new Meteor.Error(406, {field: "email", reason: "No project specified"});
            }

            let project = Project.findOne(dataForMethod.formElementData.projectId);

            if (!project) {
                throw new Meteor.Error(406, {field: "email", reason: "No project specified"});
            }

            let dataForInvitation = {
                invitedUserEmail: fields.email,
                invitingId: Meteor.userId(),
                type: 'pro',
                typeId: project._id
            };

            Meteor.call("inviteUser", dataForInvitation, function (error, result) {
                if (error) {
                   sAlert.addError(error.reason, "Error sending invitation email");

                }
                if (result) {
                    if (result.hasOwnProperty('msg')) {
                        sAlert.addSuccess(result.msg);
                    } else {
                        sAlert.addSuccess("Invitation email send");

                    }
                }
            })

        }
    }
});

Template.projectAddUserForm.events({
    //add your events here
});

Template.projectAddUserForm.onCreated(function () {
    //add your statement here
});

Template.projectAddUserForm.onRendered(function () {
    //add your statement here
});

Template.projectAddUserForm.onDestroyed(function () {
    //add your statement here
});

