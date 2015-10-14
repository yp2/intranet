/**
 * Created by daniel on 16.08.15.
 */

"use strict";


Meteor.methods({
    'userLogout' () {
        Meteor.users.upsert({_id: this.userId}, {
            $set: {
                "profile.login.status": 'offline',
                "profile.login.lastLogout": new Date()
            }
        })
    },
    changeUserScope (newScopeId) {
        let user = Meteor.users.findOne(this.userId);

        if (newScopeId !== user.profile.scopeSelected.id) {
            let scope = UserScope.findOne({_id: newScopeId, allowedUsers: user._id});
            if (!scope) {
                throw new Meteor.Error(404, "Change to this scope is forbidden");
            }
            Meteor.users.update({_id: user._id},
                {
                    $set: {
                        "profile.scopeSelected": {
                            type: scope.type,
                            id: scope._id,
                            name: scope.name
                        }
                    }
                });
            return true
        }
    }
});


