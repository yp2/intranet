FlowRouter.route("/", {
    action: function (params, queryParams) {
        var regions = _.extend({content: "mainDashContent"}, MyApp.mainDashRegions);
        BlazeLayout.render('mainDashLayout', regions);
    },
    name: 'mainDash'

});
