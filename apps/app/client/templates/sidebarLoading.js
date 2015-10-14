"use strict";

Template.sidebarLoading.helpers({
    //add you helpers here
});

Template.sidebarLoading.events({
    //add your events here
});

Template.sidebarLoading.onCreated(function () {
    //add your statement here
});

Template.sidebarLoading.onRendered(function () {
    let self= this;

    if (self.view.isRendered) {
        self.$(".sidebar.loading").fadeIn(1000);
    }
});

Template.sidebarLoading.onDestroyed(function () {
    //add your statement here
});

