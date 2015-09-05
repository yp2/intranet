Template.viewArticle.helpers({
    canDeleteArticle: function (article) {
        var user = Meteor.user();
        var wiki = MyApp.getWikiForUser(user);
        var scope = MyApp.getScopeForUser(user);
        return article.author.id === user._id || MyApp.user.isScopeAdmin(user, scope) || MyApp.user.isWikiAdmin(user, wiki)
    }
});

Template.viewArticle.events({
    //add your events here
});

Template.viewArticle.onCreated(function () {
    //add your statement here
});

Template.viewArticle.onRendered(function () {
    //add your statement here
});

Template.viewArticle.onDestroyed(function () {
    //add your statement here
});

