Meteor.users.deny({
    update: function () {
        return true;
    }
});

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
