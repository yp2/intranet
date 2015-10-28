/**
 * Created by daniel on 28.10.15.
 */
"use strict";

Meteor.publish('scopeProject', function (scopeSelectedId) {
    let sel, opt, user;
    user = Meteor.users.findOne(this.userId);

    if (user.profile.scopeSelected.id === scopeSelectedId) {
        sel = {'secure.scope.id': scopeSelectedId, 'secure.allowedUsers': user._id};
        opt = {fields: {secure: 0}};
        return Project.find(sel, opt)
    }
})
