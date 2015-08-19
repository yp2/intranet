Template.mainDashControlSideBar.helpers({
    //add you helpers here
});

Template.mainDashControlSideBar.events({
    //add your events here
});

Template.mainDashControlSideBar.onCreated(function () {
    //add your statement here
});

Template.mainDashControlSideBar.onRendered(function () {
    var self = this;

    if (self.view.isRendered) {
        MyApp.informLayout()

    }
});

Template.mainDashControlSideBar.onDestroyed(function () {
    //add your statement here
});

