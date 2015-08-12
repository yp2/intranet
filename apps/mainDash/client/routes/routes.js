FlowRouter.route("/", {
    action: function (params, queryParams) {
        console.log("router - Main dash");
        BlazeLayout.render('mainDashLayout', MyApp.mainDashRegions)
    }
});
