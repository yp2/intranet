Template.registerHelper('userIsOrg', function () {
    return Meteor.user().profile.type === 'org'
});
Template.registerHelper('scopeName', function () {
    var scopeSelected = Meteor.user().profile.scopeSelected;
    return scopeSelected ? scopeSelected.name : '';
});
Template.registerHelper('scopeTypeIsOrg', function () {
    var scopeSelected = Meteor.user().profile.scopeSelected;
    return scopeSelected ? scopeSelected.type === 'org' : false;
});
