Template.mainDashLayout.helpers({
    'userId': function (){
        return Meteor.userId();
    }
});

Template.mainDashLayout.events({
    //add your events here
});

Template.mainDashLayout.onCreated(function () {
    //add your statement here
});

Template.mainDashLayout.onRendered(function () {
    var self = this;
    if (self.view.isRendered) {
        var body = $('body');
        body.addClass("skin-blue sidebar-mini");

        MeteorAdminLTE.run();
    }

});

Template.mainDashLayout.onDestroyed(function () {
    var body = $('body');
    body.removeClass();
});

