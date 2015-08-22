FlowRouter.route("/", {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('mainDashContent'));
    },
    name: 'mainDash'

});
FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('404'));
    },
    name: '404'
};
