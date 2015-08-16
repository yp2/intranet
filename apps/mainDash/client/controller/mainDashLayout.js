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
        Meteor.call('userLogout');
        Meteor.logout();
    }
});

Template.mainDashLayout.onCreated(function () {
    var self = this;
    self.autorun(function(){
        var userId = Meteor.userId();
        var loggingIn = Meteor.loggingIn();
        if(!userId && !loggingIn) {
            FlowRouter.go('login')
        }
        self.subscribe('userScopes');
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

