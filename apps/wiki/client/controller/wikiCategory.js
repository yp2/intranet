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
        var user = Meteor.user();

        //var wikiSub = self.subscribe('scopeWiki');
        var articleSub = self.subscribe('articlesForWikiCategory', self.category());
        
        //if (wikiSub.ready()) {
            self.wiki = function () {
                return MyApp.getWikiForUser(user);
            };
            var cat = self.category();
            if (typeof scopeWiki === undefined || !_.find(self.wiki().categories, _.matches({title: cat}))) {
                FlowRouter.go('404')
            }
        //}

    })
});

Template.wikiCategory.onRendered(function () {
    //add your statement here
});

Template.wikiCategory.onDestroyed(function () {
    //add your statement here
});

