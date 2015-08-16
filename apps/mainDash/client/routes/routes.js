FlowRouter.route("/", {
    action: function (params, queryParams) {
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions('mainDashContent'));
    },
    name: 'mainDash'

});
