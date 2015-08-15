Meteor.methods({
    registerOrganization: function (options) {
        check(options, {
            email: String,
            password: String,
            password2: String
        });

        if (!options.password.length || !options.password2.length ||
            (options.password !== options.password2)) {
            throw new Meteor.Error('passwords', "Passwords don't match");
        }

        var profile = {
            // type
            // org = organization
            // per = personal
            type: 'org',
            name: options.email,
            org: {name: options.email.split('@')[1]}
        };

        var secureProfile = _.clone(profile);

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
