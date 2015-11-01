Meteor.users.deny({
    update: function () {
        return true;
    }
});

//Meteor.publish('invitationUser', function (email) {
//    if (this.userId) {
//        var sel = {'emails.address': email};
//        console.log("pub invitationUser", Meteor.users.find(sel).count());
//
//        return Meteor.users.find(sel);
//    }
//})

Accounts.onLogin(function (params) {
    if (params.type !== 'resume') {
        Meteor.users.upsert({_id: params.user._id}, {
            $set: {
                "profile.login.status": 'online',
                "profile.login.lastLogin": new Date(),
                "profile.login.loginIp": params.connection.clientAddress
            }
        });
    }
});
