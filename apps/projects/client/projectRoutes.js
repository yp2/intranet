FlowRouter.route('/project/:projectId', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('projectMain'));
    },
    name: 'projectMain'
});

FlowRouter.route('/project/:projectId/wiki', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('mainWiki'));
    },
    name: 'projectWiki'
})
FlowRouter.route('/project/:projectId/wiki/:category/:articleId', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('wikiArticle'))
    },
    name: 'projectWikiArticle'
});

FlowRouter.route('/project/:projectId/wiki/:category', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('wikiCategory'));
    },
    name: 'projectWikiCategory'
});
