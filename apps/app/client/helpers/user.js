Template.registerHelper('userIsOrg', function () {
    return Meteor.user().profile.type === 'org'
});
Template.registerHelper('userOrgName', function () {
    var orgData = Meteor.user().profile.scopeSelected;
    return orgData ? orgData.name : '';
});
