/**
 * Created by daniel on 21.09.15.
 */
Meteor.methods({
    inviteUser: function (data) {
        check(data, {
            invitedUserEmail: String,
            invitingId: String,
            type: String,
            typeId: String
        });

        this.unblock();
        var email = data.invitedUserEmail;

        if (!MyApp.validateEmail(email)) {
            throw new Meteor.Error(406, "Incorrect email address");
        }


        if(Meteor.isClient) {
            return true
        }

        if (Meteor.isServer){
            var user = Meteor.users.findOne({"emails.address": email});

            var inviting = Meteor.users.findOne(this.userId);

            if (inviting.secure.profile.type !== "org") {
                throw new Meteor.Error(403, "You can't invite users for your scope only for projects");
            }

            if (user) {
                UserScope.update({_id: inviting.secure.profile.scopeMain.id},
                    {$push: {
                        allowedUsers: user._id,
                        'secure.allowedUsers': user._id
                    }});
                return {msg: "User added to scope organization"}
            }

            data.invitingUsername = inviting.username;
            data.typeName = inviting.username;

            var invId = Invitation.addInvitation(data),
                invUrl= 'http://' + this.connection.httpHeaders.host + FlowRouter.path("/user/register/:invitationId",{invitationId:invId}),
                type = `${inviting.username} organization`;

            Email.send(HijackEmail({
                from: Meteor.settings.email.invitationFrom,
                to: email,
                subject: MyApp.email.invitation.subject(inviting.username),
                text: MyApp.email.invitation.contentText(type, invUrl)
            }));

            return true;
        }


    }
})
