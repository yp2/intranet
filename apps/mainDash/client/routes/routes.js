FlowRouter.route("/", {
    action: function (params, queryParams) {
        console.log("router - Main dash");
        var regions = _.extend({content: "mainDashContent"}, MyApp.mainDashRegions);
        console.log(MyApp.mainDashRegions);
        BlazeLayout.render('mainDashLayout', regions)
    }
});
