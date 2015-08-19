Template.mainDashHeader.helpers({
    //add you helpers here
});

Template.mainDashHeader.events({
    //add your events here
});

Template.mainDashHeader.onCreated(function () {
    //add your statement here
});

Template.mainDashHeader.onRendered(function () {
    var self = this;

    if (self.view.isRendered) {
        MyApp.informLayout()

    }
});

Template.mainDashHeader.onDestroyed(function () {
    //add your statement here
});

