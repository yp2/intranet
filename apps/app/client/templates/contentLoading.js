"use strict";

Template.contentLoading.helpers({
    //add you helpers here
});

Template.contentLoading.events({
    //add your events here
});

Template.contentLoading.onCreated(function () {
    //add your statement here
});

Template.contentLoading.onRendered(function () {
    let self = this;
    if (self.view.isRendered) {
        self.$(".content.loading span").fadeIn(1000);
    }
});

Template.contentLoading.onDestroyed(function () {
    //add your statement here
});

