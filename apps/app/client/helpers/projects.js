/**
 * Created by daniel on 31.10.15.
 */
"use strict";

Template.registerHelper('scopeProjects', function () {
    let user = Meteor.user();
    let scopeSelected = user.profile.scopeSelected.id;

    return Project.find({"scope.id": scopeSelected}, {sort: {titleSlug: 1}}).fetch();
});

Template.registerHelper("otherProjects", function () {
    let user = Meteor.user();
    let scopeSelected = user.profile.scopeSelected.id;
    let scopeMain = user.profile.scopeMain.id;

    if (scopeSelected === scopeMain) {
        let allowedScopes = _.pluck(UserScope.find({'allowedUsers': user._id}, {fields: {_id: 1}}).fetch(), '_id');
        return Project.find({"allowedUsers": user._id,'scope.id': {$nin: allowedScopes}}, {sort: {titleSlug: 1}}).fetch();
    }
});

Template.registerHelper('projectWiki', function () {
    return Wiki.findOne({'project.id': this._id});
});

Template.registerHelper('inProject', function () {
    return FlowRouter.getParam("projectId")
})

//Template.registerHelper('isProjectAdmin', function () {
//})
