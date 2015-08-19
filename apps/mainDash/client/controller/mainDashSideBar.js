Template.mainDashSideBar.helpers({
    //add you helpers here
});

Template.mainDashSideBar.events({
    //add your events here
});

Template.mainDashSideBar.onCreated(function () {
    //add your statement here
});

Template.mainDashSideBar.onRendered(function () {
    var self = this;

    if (self.view.isRendered) {
        MyApp.informLayout()

    }
});

Template.mainDashSideBar.onDestroyed(function () {
    //add your statement here
});

