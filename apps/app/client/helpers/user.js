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

Template.registerHelper('isWikiAdmin', function (user) {
    var wiki = MyApp.getWikiForUser(user);
    return wiki ? wiki.admin.id === user._id: false;
})

