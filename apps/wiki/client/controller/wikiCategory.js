Template.wikiCategory.helpers({
    //wiki: function () {
    //    console.log( Template.instance().wiki());
    //    return Template.instance().wiki()
    //}
});

Template.wikiCategory.events({
    //add your events here
});

Template.wikiCategory.onCreated(function () {
    var self = this;

    self.autorun(function () {
        self.category = FlowRouter.getParam('category');

        var wikiSub = self.subscribe('scopeWiki');

        var articleSub = self.subscribe('articlesForWikiCategory', self.category);

        var wikiScope = [];

        if (wikiSub.ready()) {
            wikiScope = Wiki.findOne();
            if (typeof scopeWiki === undefined || (wikiScope && !_.contains(wikiScope.categories, self.category))) {
                FlowRouter.go('404')
            }
        }
    })
});

Template.wikiCategory.onRendered(function () {
    //add your statement here
});

Template.wikiCategory.onDestroyed(function () {
    //add your statement here
});

