"use strict";

Meteor.methods({
    'registerUser' (options) {
        check(options, {
            email: String,
            password: String,
            password2: String,
            invitation: Object
        });

        if (!options.password.length || !options.password2.length ||
            (options.password !== options.password2)) {
            throw new Meteor.Error('passwords', "Passwords don't match");
        }

        var profile = {
            // type
            // org = organization
            // per = personal
            type: 'per',
            name: options.email
            //scopeMain: {
            //    type: 'org',
            //    name: options.email.split('@')[1]
            //}
        };

        var secureProfile = _.clone(profile);

        options.profile = profile;
        options.username = options.email;

        var newUserId = Accounts.createUser(options);

        if (newUserId) {

            let scopeSelected;

            if (options.invitation.hasOwnProperty('type') && options.invitation.type.type === 'org') {
                //scope for organizations invitaitons
                let orgScope;
                orgScope = UserScope.findOne({'admin.id': options.invitation.inviting.id});
                UserScope.update({_id: orgScope._id}, {
                    $push: {
                        allowedUsers: newUserId,
                        'secure.allowedUsers': newUserId
                    }
                });
                scopeSelected = {type: orgScope.secure.type, id: orgScope._id, name: orgScope.name};
            }

            let userScope = {
                type: "per",
                name: options.email.split('@')[1]
            };

            //user scope
            userScope.id = UserScope.insert({
                name: userScope.name,
                type: userScope.type,
                admin: {
                    name: options.username,
                    id: newUserId
                },
                allowedUsers: [newUserId],
                secure: {
                    type: userScope.type,
                    admin: {
                        name: options.username,
                        id: newUserId
                    },
                    allowedUsers: [newUserId]
                }
            });


            // user wiki
            var userWikiId = Wiki.insert({
                type: userScope.type,
                admin: {
                    name: options.username,
                    id: newUserId
                },
                scope: {
                    name: userScope.name,
                    id: userScope.id
                },
                categories: [{title:"main", titleSlug: "main"}],
                secure: {
                    type: userScope.type,
                    admin: {
                        name: options.username,
                        id: newUserId
                    },
                    scope: {
                        name: userScope.name,
                        id: userScope.id
                    },
                    categories: [{title:"main", titleSlug: "main"}]
                }
            });


            secureProfile.scopeMain = {
                type: userScope.type,
                name: userScope.name,
                id: userScope.id
            };

            //secureProfile.scopeMain.id = scopeId;

            Meteor.users.upsert({_id:newUserId}, {
                $set: {
                    'emails.0.verified':true,
                    'secure.profile': secureProfile,
                    'profile.scopeMain': userScope,
                    'profile.scopeSelected': scopeSelected
                }
            });
            UserScope.upsert({_id: userScope.id}, {$set:{'wiki.id': userWikiId, 'secure.wiki.id': userWikiId}});

            return true;
        } else {
            return false;
        }

        //let userMainScope;
        //scope for organizations invitaitons
        //if (options.invitation.hasOwnProperty('type') && options.invitation.type.type === 'org'){
        //    userMainScope = UserScope.findOne({'admin.id': options.inviting.id})
        //}
    },
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
                categories: [{title:"main", titleSlug: "main"}],
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
                    categories: [{title:"main", titleSlug: "main"}]
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

