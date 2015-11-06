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
    //if (self.view.isRendered) {
    //    console.log('mainDash');
    //    $(function () {
    //        MeteorAdminLTE.run()
    //    });
    //}
});

Template.mainDashContent.onDestroyed(function () {

});

