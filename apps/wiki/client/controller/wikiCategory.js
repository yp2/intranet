Template.wikiCategory.helpers({
    wiki: function () {
        //console.log( Template.instance().wiki());
        return Template.instance().wiki()
    },
    currentCategory: function () {
        return Template.instance().category()
    }
});

Template.wikiCategory.events({
    //add your events here
});

Template.wikiCategory.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.category = function () {
            FlowRouter.watchPathChange();
            var context = FlowRouter.current();
            return context.params.category
        };

        var wikiSub = self.subscribe('scopeWiki');
        var articleSub = self.subscribe('articlesForWikiCategory', self.category());
        
        if (wikiSub.ready()) {
            var scopeWiki = Wiki.findOne();
            var cat = self.category();
            if (typeof scopeWiki === undefined || !_.contains(scopeWiki.categories, cat)) {
                FlowRouter.go('404')
            } self.wiki = function () {
                return Wiki.findOne();
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

