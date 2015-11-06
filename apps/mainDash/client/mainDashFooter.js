Template.mainDashFooter.helpers({
    //add you helpers here
});

Template.mainDashFooter.events({
    //add your events here
});

Template.mainDashFooter.onCreated(function () {
    //add your statement here
});

Template.mainDashFooter.onRendered(function () {
    var self = this;

    if (self.view.isRendered) {
        MyApp.informLayout()
    }
});

Template.mainDashFooter.onDestroyed(function () {
    //add your statement here
});

