"use strict";


Template.mainDashContent.helpers({
    projectsCount () {
        let user = Meteor.user();
        console.log(Meteor.users.find().fetch());
        return Project.find({'scope.id': user.profile.scopeSelected.id}).count()
    },
    registeredUser () {
        return Meteor.users.find().count();
    },
    wikiCategoriesCount() {
        return Wiki.findOne({type: 'org'}).categories.length;
    },
    wikiProjectCategoriesCount() {
        let count = 0;
        Wiki.find({type: 'pro'}).forEach(function (ele) {
            count = count + ele.categories.length;
        });
        return count
    }

});

Template.mainDashContent.events({
    'click .test-btn' (e, t){
        Session.set('showInviteUserDialog', true);
    }
});

Template.mainDashContent.onCreated(function () {
});

Template.mainDashContent.onRendered(function () {
    let self = this;
});

Template.mainDashContent.onDestroyed(function () {

});

