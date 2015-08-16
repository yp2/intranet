FlowRouter.route("/wiki/test", {
    action: function (params, queryParams) {
        var regions = _.extend({content: "wikiTest"}, MyApp.mainDashRegions);
        BlazeLayout.render('mainDashLayout', regions)
    },
    name: 'wikiTest'
});
