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
            scopeMain: {
                type: 'org',
                name: options.email.split('@')[1]
            }
        };

        var secureProfile = _.clone(profile);

        options.profile = profile;
        options.username = options.email;

        var newUserId = Accounts.createUser(options);
        if (newUserId) {
            var scopeId = UserScope.insert({
                name: profile.scopeMain.name,
                type: 'org',
                admin: {
                    name: options.username,
                    id: newUserId
                },
                allowedUsers: [newUserId],
                secure: {
                    type: 'org',
                    admin: {
                        name: options.username,
                        id: newUserId
                    },
                    allowedUsers: [newUserId]
                }
            });

            var wikiId = Wiki.insert({
                type: 'org',
                admin: {
                    name: options.username,
                    id: newUserId
                },
                scope: {
                    name: profile.scopeMain.name,
                    id: scopeId
                },
                categories: [],
                secure: {
                    type: 'org',
                    admin: {
                        name: options.username,
                        id: newUserId
                    },
                    scope: {
                        name: profile.scopeMain.name,
                        id: scopeId
                    },
                    categories: []
                }
            });

            secureProfile.scopeMain.id = scopeId;

            Meteor.users.upsert({_id:newUserId}, {
                $set: {
                    'emails.0.verified':true,
                    'secure.profile': secureProfile,
                    'profile.scopeMain.id': scopeId,
                    'profile.scopeSelected': {type: 'org', id:scopeId, name:profile.scopeMain.name}
                }
            });

            UserScope.upsert({_id: scopeId}, {$set:{'wiki.id': wikiId, 'secure.wiki.id': wikiId}});
            return true;
        } else {
            return false;
        }
    }
});

