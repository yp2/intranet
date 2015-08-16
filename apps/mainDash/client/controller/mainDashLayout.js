Template.mainDashLayout.helpers({
    authInProcess: function() {
        return Meteor.loggingIn();
    },
    canShow: function() {
        return !!Meteor.user();
    }
});

Template.mainDashLayout.events({
    'click .sign-out': function (event, instance) {
        console.log('sign=out');

        Meteor.call('userLogout');
        Meteor.logout();
    }
});

Template.mainDashLayout.onCreated(function () {
    var self = this;
    console.log(self);
    self.autorun(function(){
        var userId = Meteor.userId();
        var loggingIn = Meteor.loggingIn();
        if(!userId && !loggingIn) {
            FlowRouter.go('login')
        }

    })
});

Template.mainDashLayout.onRendered(function () {

    var self = this;
    if (self.view.isRendered) {
        var body = $('body');
            body.removeClass();
            body.addClass("skin-blue sidebar-mini");

        $(function () {
            MeteorAdminLTE.run()
        });
    }
});

Template.mainDashLayout.onDestroyed(function () {
});

