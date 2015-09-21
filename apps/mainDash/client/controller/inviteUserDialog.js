Template.inviteUserDialog.helpers({
    //add you helpers here
});

Template.inviteUserDialog.events({
    'show.bs.modal #inviteUserDialog': function (e,t){
        t.$('#inviteUserEmail').focus()
    },
    'hide.bs.modal #inviteUserDialog': function (e, t) {
        Session.set('showInviteUserDialog', false);
        t.$('.invite-user-form')[0].reset();
    },
    'submit .invite-user-form': function(e, t) {
        e.preventDefault();
        // fields not validate no event
        if (e){
            var formData = MyApp.forms.serialize($(e.currentTarget));
            var data = {invitedUserEmail: formData['invite-user-email']};
            Meteor.call("inviteUser", data, function (error, result) {
                if (error) {
                    // error handling 406 !!!!
                    sAlert.addError(error.reason, "Error sending invitation email")
                }
                if (result) {
                    sAlert.addSuccess("Invitation email send");
                    t.$('.invite-user-form')[0].reset();
                    Session.set('showInviteUserDialog', false)
                }
            })
        }


    }
});

Template.inviteUserDialog.onCreated(function () {
    //add your statement here
});

Template.inviteUserDialog.onRendered(function () {
    //add your statement here
});

Template.inviteUserDialog.onDestroyed(function () {
    var self = this;
    Session.set('showInviteUserDialog', false);
    $(".modal-backdrop").remove();
    $('body').removeClass('modal-open');
});

