/**
 * Created by daniel on 16.08.15.
 */
"use strict";

Meteor.publish('scopeWiki', function(scopeSelectedId) {
    let sel,
        opt;

    if (this.userId) {
        let user = Meteor.users.findOne(this.userId);

        if (user.profile.scopeSelected.id === scopeSelectedId) {
            sel = {'secure.scope.id': scopeSelectedId};
            opt = {fields: {secure: 0}};

            console.log("pub scopeWiki", sel, opt, Wiki.find(sel, opt).count());
            //Meteor._sleepForMs(4000);
            return Wiki.find(sel, opt)
        }
    }

});

Meteor.publish('projectWiki', function () {
    let sel, opt;

    if (this.userId) {
        let user = Meteor.users.findOne(this.userId);
        let scopeSelected = user.profile.scopeSelected.id;
        let allowedScopes = _.pluck(UserScope.find({'allowedUsers': user._id}, {fields: {_id: 1}}).fetch(), '_id');

        let  projects =  Project.find(
            {
                $or: [{"secure.scope.id": scopeSelected}, {"secure.allowedUsers": user._id, 'secure.scope.id': {$nin: allowedScopes}}]
            },
            {fields: {_id: 1}}).fetch();

        projects = _.pluck(projects, "_id");


        sel = {"secure.project.id": {$in : projects}};

        console.log("pub projectWiki", Wiki.find(sel).count());
        return Wiki.find(sel)
    }
})
