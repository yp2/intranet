//FlowRouter.route("/wiki/test", {
//    action: function (params, queryParams) {
//        //var regions = _.extend({content: "wikiTest"}, MyApp.mainDashRegions);
//        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('wikiTest'))
//    },
//    name: 'wikiTest'
//});

FlowRouter.route('/main/wiki', {
    action: function (params, queryParams) {
            BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('mainWiki'));
    },
    name: 'mainWiki'
});

FlowRouter.route('/wiki/:category', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('wikiCategory'));
    },
    name: 'wikiCategory'
});

FlowRouter.route('/wiki/:category/:articleId', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('wikiArticle'))
    },
    name: 'wikiArticle'
});
