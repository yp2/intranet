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

        var wikiSub = self.subscribe('scopeWiki');

        var articleSub = self.subscribe('articlesForWikiCategory', self.category);

        var wikiScope = [];

        if (wikiSub.ready()) {
            wikiScope = Wiki.findOne();
            console.log('wiki categories', _.contains(wikiScope.categories, self.category));
            //Todo 404 on Wiki.findOne()=== undefined
            if (typeof scopeWiki === undefined || (wikiScope && !_.contains(wikiScope.categories, self.category))) {
                //sprawdzamy cz mamy kategorie w kategirach i wtedy 404
                console.log('404');
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

