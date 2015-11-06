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
        MyApp.informLayout();
        // for layout subs ready
        //var controlSidebar = MeteorAdminLTE.AdminLTE.controlSidebar;
        //controlSidebar ? controlSidebar.activate() : ""
        //MeteorAdminLTE.AdminLTE.controlSidebar.activate();
    }

});

Template.mainDashControlSideBar.onDestroyed(function () {

});

