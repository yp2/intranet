Template.inviteUserDialog.helpers({
    //add you helpers here
});

Template.inviteUserDialog.events({
    'shown.bs.modal #inviteUserDialog': function (e,t){
        t.$('#inviteUserEmail').focus()
    },
    'hide.bs.modal #inviteUserDialog': function (e, t) {
        Session.set('showInviteUserDialog', false);
        t.$('span.user-email-error').html('').closest('div').removeClass('has-error has-success');
        t.$('span.user-email-error').closest('label').hide();
        t.$('.invite-user-form')[0].reset();
    },
    'submit .invite-user-form': function(e, t) {
        e.preventDefault();
        // fields not validate no event
        if (e){
            var formData = MyApp.forms.serialize($(e.currentTarget));
            var invitingUser = Meteor.user();
            var data = {
                invitedUserEmail: formData['invite-user-email'],
                invitingId: invitingUser._id,
                type: 'org',
                typeId: invitingUser._id
            };
            t.$('span.user-email-error').html('').closest('div').removeClass('has-error has-success');
            t.$('span.user-email-error').closest('label').hide();
            t.$('.sending-email').show();
            Meteor.call("inviteUser", data, function (error, result) {
                if (error) {
                    if (error.error === 406) {
                        t.$('.sending-email').hide();
                        t.$('span.user-email-error').html(error.reason).closest('div').addClass('has-error');
                        t.$('span.user-email-error').closest('label').show();
                    } else {
                        t.$('.sending-email').hide();
                        Session.set('showInviteUserDialog', false);
                        sAlert.addError(error.reason, "Error sending invitation email");
                    }
                }
                if (result) {
                    Session.set('showInviteUserDialog', false);
                    t.$('span.user-email-error').removeClass('has-error').addClass('has-success');
                    t.$('span.user-email-error').closest('label').hide();
                    t.$('.invite-user-form')[0].reset();
                    t.$('.sending-email').hide();
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

