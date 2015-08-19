FlowRouter.route("/wiki/test", {
    action: function (params, queryParams) {
        //var regions = _.extend({content: "wikiTest"}, MyApp.mainDashRegions);
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('wikiTest'))
    },
    name: 'wikiTest'
});

FlowRouter.route('/wiki/:category', {
    action: function (params, queryParams) {
        console.log(params);
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('mainWiki'))
    },
    name: 'mainWiki'
});
