/**
 * Created by daniel on 28.10.15.
 */
"use strict";

Meteor.publish('userProjects', function () {
    let sel, opt, user;
    if (this.userId) {
        user = Meteor.users.findOne(this.userId);

        sel = {$or :[{'secure.allowedUsers': user._id}, {'secure.admin.id': user._id}]};
        opt = {fields: {secure: 0}};

        console.log("pub userProjects", user.username, Project.find(sel, opt).count());

        return Project.find(sel, opt);

        //if (user.profile.scopeSelected.id === scopeSelectedId) {
        //    //sel = {'secure.scope.id': scopeSelectedId 'secure.allowedUsers': user._id};
        //}
    }
})
