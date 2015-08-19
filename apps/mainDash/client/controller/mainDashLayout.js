Template.mainDashLayout.helpers({
    authInProcess: function () {
        return Meteor.loggingIn();
    },
    canShow: function () {
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
    console.log('created', self);
    self.renderedTemplates = new ReactiveVar(0);
    self.autorun(function () {
        var userId = Meteor.userId();
        var loggingIn = Meteor.loggingIn();
        if (!userId && !loggingIn) {
            FlowRouter.go('login')
        }
        self.subscribe('userScopes');
    })
});

Template.mainDashLayout.onRendered(function () {

    var self = this;

    Deps.autorun(function () {
        console.log(self.renderedTemplates.get());
        if (self.renderedTemplates.get() === 4){
            var body = $('body');
                body.removeClass();
                body.addClass("skin-blue sidebar-mini");

                $(function () {
                    MeteorAdminLTE.run()
                });
        }
    })
});

Template.mainDashLayout.onDestroyed(function () {
});

