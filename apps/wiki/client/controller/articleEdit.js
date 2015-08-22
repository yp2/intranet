Template.articleEdit.helpers({
    currentArticle: function (){
        console.log('helper');
        return Template.instance().currentArticle();
    },
    currentCategory: function () {
        return Template.instance().category()
    },
    checkMainCategory: function(category) {
        return category === 'main'
    }
});

Template.articleEdit.events({
    //add your events here
});

Template.articleEdit.onCreated(function () {
    var self = this;

    self.autorun(function () {
        self.category = function () {
            FlowRouter.watchPathChange();
            var context = FlowRouter.current();
            return context.params.category
        };
        self.articleId = function () {
            FlowRouter.watchPathChange();
            var context = FlowRouter.current();
            return context.params.articleId
        };
        
        console.log(self.category(), self.articleId());
        var wikiSub = self.subscribe('scopeWiki');
        var articleSub = self.subscribe('articlesForWikiCategory', self.category());

        if (wikiSub.ready() && articleSub.ready()) {
            var scopeWiki = Wiki.findOne();
            var curArticle = WikiArticle.findOne({_id: self.articleId()});
            console.log(scopeWiki, curArticle);

            if (self.category() === 'main') {
                scopeWiki.categories.push("main")
            }

            if (typeof scopeWiki === undefined || typeof curArticle === undefined ||
                !_.contains(scopeWiki.categories, self.category())) {
                console.log('adadasd');
                FlowRouter.go('404');
            }
            self.currentArticle = function () {
                return WikiArticle.findOne({_id: self.articleId()});
            }

        }

    })
});

Template.articleEdit.onRendered(function () {
    //add your statement here
});

Template.articleEdit.onDestroyed(function () {
    //add your statement here
});

