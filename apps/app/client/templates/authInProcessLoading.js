"use strict";

Template.authInProcessLoading.helpers({
    //add you helpers here
});

Template.authInProcessLoading.events({
    //add your events here
});

Template.authInProcessLoading.onCreated(function () {
    //add your statement here
});

Template.authInProcessLoading.onRendered(function () {
    let self = this;

    if (self.view.isRendered) {
        self.$('.auth.loading').fadeIn(1000);
    }
});

Template.authInProcessLoading.onDestroyed(function () {
    //add your statement here
});

