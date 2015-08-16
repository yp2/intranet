FlowRouter.route("/", {
    action: function (params, queryParams) {
        //var regions = _.extend({content: "mainDashContent"}, MyApp.mainDashRegions);
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('mainDashContent'));
    },
    name: 'mainDash'

});
