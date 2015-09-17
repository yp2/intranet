Template.wikiCategory.helpers({
    wiki: function () {
        //console.log( Template.instance().wiki());
        return Template.instance().wiki()
    },
    currentCategory: function () {
        return Template.instance().category()
    },
    currentList: function (tabId) {
        return Session.get('user.articleList') === tabId ? 'active': "";
    }
});

Template.wikiCategory.events({
    'click .add-article': function (e, t) {
        e.preventDefault();
        Meteor.call('addArticle', {category: t.category()}, function(error, result){
            if (error) {
                sAlert.addError(error.reason, 'Add article Error');
            }
            if (result) {
                var alertConfig = _.clone(sAlert.settings);
                alertConfig.onRouteClose = false;

                sAlert.addSuccess('Article added', "", alertConfig);
                FlowRouter.go('wikiArticle', {category: t.category(), articleId: result})
            }
        })
    }
});

Template.wikiCategory.onCreated(function () {
    var self = this;

    Session.setDefault('user.articleList', "#tab_1");

    self.autorun(function () {
        self.category = function () {
            FlowRouter.watchPathChange();
            var context = FlowRouter.current();
            return context.params.category
        };
        var user = Meteor.user();

        var articleSub = self.subscribe('articlesForWikiCategory', self.category());
        
        self.wiki = function () {
            return MyApp.getWikiForUser(user);
        };
        var cat = self.category();
        if (typeof scopeWiki === undefined || !_.find(self.wiki().categories, _.matches({title: cat}))) {
            FlowRouter.go('404')
        }
    })
});

Template.wikiCategory.onRendered(function () {
    //add your statement here
});

Template.wikiCategory.onDestroyed(function () {
    //add your statement here
});

