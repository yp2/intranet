Template.mainDashControlSideBar.helpers({
    //add you helpers here
});

Template.mainDashControlSideBar.events({
    'click .btn.invite-user': function (e, t) {
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

