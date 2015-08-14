FlowRouter.route("/", {
    action: function (params, queryParams) {
        var regions = _.extend({content: "mainDashContent"}, MyApp.mainDashRegions);
        BlazeLayout.render('mainDashLayout', regions);
        //BlazeLayout.render('mainDashLayout1', {content: "mainDashContent" })
    },
    name: 'mainDash'

});
