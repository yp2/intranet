Meteor.methods({
    registerOrganization: function (options) {
        check(options, {
            email: String,
            password: String
        });

        var profile = {
            // type
            // org = organization
            // per = personal
            type: 'org',
            name: options.email
        };

        var secureProfile = {
            type: 'org',
            name: options.emial
        };

        options.profile = profile;
        options.username = options.email;

        var newUserId = Accounts.createUser(options);
        if (newUserId) {
            Meteor.users.update({_id:newUserId}, {$set: {'emails.0.verified':true, 'secure.profile': secureProfile}});
            return true;
        } else {
            return false;
        }
    }
});
