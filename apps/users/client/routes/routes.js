FlowRouter.route("/organization/register", {
    action: function (params, queryParams) {
        //var regions = _.extend({content: "mainDashContent"}, MyApp.mainDashRegions);
        //BlazeLayout.render('mainDashLayout', regions);
        BlazeLayout.render('notLoggedLayout', {content: "organizationRegister" })
    },
    name: 'organizationRegister'
});
FlowRouter.route('/login', {
    action: function(params, queryParams) {
        BlazeLayout.render('notLoggedLayout', {content: "login"})
    },
    name: 'login'
});

FlowRouter.route("/user/register/:invitationId", {
    action: function (params, queryParams) {
        Session.set("invitation", params.invitationId);
        BlazeLayout.render('notLoggedLayout', {content: "userRegister"})
    },
    name: "userRegisterInvitation"
});
