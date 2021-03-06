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

    Session.set('showInviteUserDialog', false);

    self.renderedTemplates = new ReactiveVar(0);
    self.autorun(function () {
        var userId = Meteor.userId();
        var loggingIn = Meteor.loggingIn();
        if (!userId && !loggingIn) {
            FlowRouter.go('login')
        }
        var user = Meteor.user();
        var scopeSelected = user ? user.profile.scopeSelected.id : "";
        var project = Project.find().fetch();
        self.subscribe('userScopes');
        self.subscribe('scopeWiki', scopeSelected);
        self.subscribe('userProjects');
        self.subscribe("projectWiki", project);
        self.subscribe("appUsers");
    })
});

Template.mainDashLayout.onRendered(function () {

    var self = this;
    self.autorun(function () {
        if (Session.get('showInviteUserDialog')) {
            $("#inviteUserDialog").modal('show')
        } else {
            $("#inviteUserDialog").modal('hide')
        }
    });
    Deps.autorun(function () {
        if (self.renderedTemplates.get() === 4){
        //if (self.renderedTemplates.get() && !(self.renderedTemplates.get() % 4)){
            var body = $('body');
                body.removeClass();
                body.addClass("skin-blue sidebar-mini");

                $(function () {
                    $(document).off('click','.sidebar li a');
                    MeteorAdminLTE.run()
                });
        }
    })
});

Template.mainDashLayout.onDestroyed(function () {
    Session.set('showInviteUserDialog', false);
});

