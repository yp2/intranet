/**
 * Created by daniel on 14.10.15.
 */
Template.registerHelper("parentSubsReady", function () {
    //console.log(Template.instance().parentTemplate(3).subscriptionsReady());
    // levelMainDashLayout = 3
    return Template.instance().parentTemplate(3).subscriptionsReady();
})
