FlowRouter.route('/projectSummary/:projectId', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('projectMain'));
    },
    name: 'projectMain'
});

FlowRouter.route('/projectWiki/:projectId', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('mainWiki'));
    },
    name: 'projectWiki'
})
FlowRouter.route('/projectWiki/:projectId/:category/:articleId', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('wikiArticle'))
    },
    name: 'projectWikiArticle'
});

FlowRouter.route('/projectWiki/:projectId/:category', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('wikiCategory'));
    },
    name: 'projectWikiCategory'
});

FlowRouter.route('/projectConversation/:projectId', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('projectTalks'));
    },
    name: 'projectTalks'
})
