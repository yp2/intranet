Meteor.users.deny({
    update: function () {
        return true;
    }
});

Meteor.publish('appUsers', function () {
    if (this.userId) {

        var scopes = UserScope.find({
                $or: [{'secure.admin.id': this.userId}, {'secure.allowedUsers': this.userId}]
            },
            {
                fields: {'secure.allowedUsers':1}
            }).fetch();

        var projects = Project.find(
            {
                $or: [{'secure.admin.id': this.userId}, {'secure.allowedUsers': this.userId}]
            },
            {
                fields: {'secure.allowedUsers':1}
            }).fetch();

        scopes = _.uniq(_.flatten(_.pluck(scopes, 'secure.allowedUsers')));
        projects = _.uniq(_.flatten(_.pluck(projects, 'secure.allowedUsers')));

        var usersIds = _.uniq(_.flatten([scopes, projects]));

        var sel = {_id: {$in : usersIds}};
        console.log("pub appUsers", Meteor.users.find(sel).count());

        return Meteor.users.find(sel);
    }
})

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
