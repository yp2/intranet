Template.wikiArticle.helpers({
    currentArticle: function (){
        return Template.instance().currentArticle();
    },
    currentCategory: function () {
        return Template.instance().category()
    },
    checkMainCategory: function(category) {
        return category === 'main'
    },
    edit: function () {
        return FlowRouter.getQueryParam('edit')
    }
});

Template.wikiArticle.events({
    'click .edit-article': function (e, t) {
        e.preventDefault();
        FlowRouter.setQueryParams({edit: true})
    },

});

Template.wikiArticle.onCreated(function () {
    var self = this;
    //var artContent;
    Session.set('articleContent','');

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

        //var wikiSub = self.subscribe('scopeWiki');
        var articleSub = self.subscribe('articlesForWikiCategory', self.category());

        if (articleSub.ready()) {
            var scopeWiki = Wiki.findOne();
            var curArticle = WikiArticle.findOne({_id: self.articleId()});

            if (typeof scopeWiki === undefined || typeof curArticle === undefined ||
                !_.some(scopeWiki.categories, {title: self.category()})) {
                FlowRouter.go('404');
            }
            self.currentArticle = function () {
                return WikiArticle.findOne({_id: self.articleId()});
            };

        }

    });

});

Template.wikiArticle.onRendered(function () {
    $('<link>', {
            href: 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/styles/github.min.css',
            rel: 'stylesheet'
        }
    ).appendTo('head')
});

Template.wikiArticle.onDestroyed(function () {
    Session.set('articleContent', "");
    $('<link>', {
            href: 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/styles/github.min.css',
            rel: 'stylesheet'
        }
    ).remove('head')
});

