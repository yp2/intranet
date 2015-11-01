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
        var inviting = Meteor.users.findOne(data.invitingId);

        if (!MyApp.validateEmail(email)) {
            throw new Meteor.Error(406, "Incorrect email address");
        }

        if (inviting.profile.type !== "org" && data.type === 'org') {
            throw new Meteor.Error(403, "You can't invite users for your scope only for projects");
        }

        if(inviting.emails[0].address === email) {
            throw new Meteor.Error(406, "You can't invite yourself");
        }

        if(data.type === 'pro') {
            var pro = Project.findOne(data.typeId);
            if (pro && (pro.admin.id !== data.invitingId && !_.includes(pro.allowedUsers, data.invitingId))) {
                throw new Meteor.Error(403, "You can't invite user to project");
            }
        }

        if (Meteor.isClient) {
            return true;
        }

        if (Meteor.isServer) {
            var user = Meteor.users.findOne({"emails.address": email});

            if (user.emails[0].address === email)

            if (user && data.type !== 'pro') {
                UserScope.update({_id: inviting.secure.profile.scopeMain.id},
                    {
                        $addToSet: {
                            allowedUsers: user._id,
                            'secure.allowedUsers': user._id
                        }
                    });
                return {msg: "User added to scope organization"}
            } else if (user && data.type === 'pro') {
                var project = Project.findOne(data.typeId);

                if (project.secure.admin.id === user._id) {
                    throw new Meteor.Error(403, "You can't invite user to project");
                }

                if (project && (project.secure.admin.id === data.invitingId || _.includes(project.secure.allowedUsers, data.invitingId))) {
                    Project.update({_id: data.typeId}, {
                        $addToSet: {
                            'secure.allowedUsers': user._id,
                            allowedUsers: user._id
                        }
                    });
                    return {msg: `User added to ${project.title} project`}
                } else {
                    throw new Meteor.Error(403, "You can't invite user to project");
                }
            }

            data.invitingUsername = inviting.username;
            data.typeName = inviting.username;

            var invId, invUrl, type;

            invId = Invitation.addInvitation(data);

            invUrl = 'http://' + this.connection.httpHeaders.host + FlowRouter.path("/user/register/:invitationId", {invitationId: invId});

            if (data.type === 'org') {
                type = `${inviting.username} organization`;
            } else if (data.type === 'pro') {
                let project = Project.findOne(data.typeId);
                type = `${project.title} project`
            }

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
