FlowRouter.route("/organization/register", {
    action: function (params, queryParams) {
        //var regions = _.extend({content: "mainDashContent"}, MyApp.mainDashRegions);
        //BlazeLayout.render('mainDashLayout', regions);
        BlazeLayout.render('notLoggedLayout', {content: "organizationRegister" })
    },
    name: 'organizationRegister'

});
