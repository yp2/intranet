"use strict";

Template.elementLoading.helpers({
    //add you helpers here
});

Template.elementLoading.events({
    //add your events here
});

Template.elementLoading.onCreated(function () {
    //add your statement here
});

Template.elementLoading.onRendered(function () {
    let self = this;

    if (self.view.isRendered) {
        self.$(".element-loading").fadeIn(1000);
    }
});

Template.elementLoading.onDestroyed(function () {
    //add your statement here
});

