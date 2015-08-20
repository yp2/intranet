Template.wikiCategory.helpers({
    wiki: function () {
        console.log( Template.instance().wiki());
        return Template.instance().wiki()
    }
});

Template.wikiCategory.events({
    //add your events here
});

Template.wikiCategory.onCreated(function () {
    var self = this;

    self.autorun(function () {
        self.category = FlowRouter.getParam('category');
        console.log(self.category);

        var wikiSub = self.subscribe('scopeWiki', self.category);
        var articleSub = self.subscribe('articlesForWikiCategory', self.category);
        var wikiA = Wiki.findOne();

        if (wikiSub.ready()) {
            //Todo 404 on Wiki.findOne()=== undefined
            if (wikiA === undefined) {
                console.log('404');
                FlowRouter.go('mainWiki', {category: 'main'})
            }
        }
        self.wiki = function () {
            return wikiA;
        }
    })
});

Template.wikiCategory.onRendered(function () {
    //add your statement here
});

Template.wikiCategory.onDestroyed(function () {
    //add your statement here
});

