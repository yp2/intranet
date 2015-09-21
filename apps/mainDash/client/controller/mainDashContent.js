Template.mainDashContent.helpers({
    //add you helpers here
});

Template.mainDashContent.events({
    'click .test-btn':function (e, t){
        Session.set('showInviteUserDialog', true);
    }
});

Template.mainDashContent.onCreated(function () {
});

Template.mainDashContent.onRendered(function () {

});

Template.mainDashContent.onDestroyed(function () {

});

