"use strict";


Template.mainDashContent.helpers({

});

Template.mainDashContent.events({
    'click .test-btn' (e, t){
        Session.set('showInviteUserDialog', true);
    }
});

Template.mainDashContent.onCreated(function () {
});

Template.mainDashContent.onRendered(function () {
    let self = this;
});

Template.mainDashContent.onDestroyed(function () {

});

