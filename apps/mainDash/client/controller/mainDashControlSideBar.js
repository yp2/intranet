"use strict";

Template.mainDashControlSideBar.helpers({
    canInvite () {
        var user = Meteor.user();
        return user.profile.type === "org" && user.profile.scopeMain.id === user.profile.scopeSelected.id;
    }
});

Template.mainDashControlSideBar.events({
    'click a.invite-user': function (e, t) {
        console.log(e,t);
        Session.set('showInviteUserDialog', true);
    }

});

Template.mainDashControlSideBar.onCreated(function () {
    var self = this;
});

Template.mainDashControlSideBar.onRendered(function () {
    var self = this;

    if (self.view.isRendered) {
        MyApp.informLayout()
    }

});

Template.mainDashControlSideBar.onDestroyed(function () {

});

