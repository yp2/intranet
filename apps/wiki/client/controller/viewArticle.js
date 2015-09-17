Template.viewArticle.helpers({
    canDeleteArticle: function (article) {
        var user = Meteor.user();
        var wiki = MyApp.getWikiForUser(user);
        var scope = MyApp.getScopeForUser(user);
        return article.author.id === user._id || MyApp.user.isScopeAdmin(user, scope) || MyApp.user.isWikiAdmin(user, wiki)
    },
    isPublished: function () {
        var article = Template.instance().parentTemplate().currentArticle();
        return article.status === 'published'
    },
    modalData: function () {
        var articleId = Template.instance().articleId();
        var category = Template.instance().category();
        var article = WikiArticle.findOne({_id: articleId});
        
        return {
            id: 'deleteArticle',
            actionBtnLabel: 'Delete Article',
            template: Template.viewArticle,
            modalTitle: "Delete Article",
            modalBody: 'Delete "' + article.title + '" article ?',
            confirmAction: function(e,t) {
                Meteor.call('deleteArticle', {id: articleId}, function (error, result) {
                    if (error) {
                        sAlert.addError(error.reason, "Delete Article Error");
                    }
                    if (result) {
                        var alertConfig,
                            currentCategory = category;
                        alertConfig = _.clone(sAlert.settings);
                        alertConfig.onRouteClose = false;
                        sAlert.addSuccess('Article Deleted', "", alertConfig);
                        if (currentCategory === 'main') {
                            FlowRouter.go('mainWiki')
                        } else{
                            FlowRouter.go('wikiCategory', {category:currentCategory})
                        }
                    }
                })
            }
        }
    }
});

Template.viewArticle.events({
    'click .article-publish': function (e, t) {
        e.preventDefault();

        var article = t.parentTemplate().currentArticle();
        Meteor.call('publishArticle', {id: article._id}, function (error, result) {
                if (error) {
                    sAlert.addError(error.reason, "Publish article error");
                }
                if (result) {
                    if (result === 'published') {
                        sAlert.addSuccess("Article published")
                    } else {
                        sAlert.addSuccess("Article in draft")
                    }
                }
            }
        )
    }
});

Template.viewArticle.onCreated(function () {
    var self = this;
    self.articleId = function () {
        return FlowRouter.getParam('articleId')
    }
    self.category = function () {
        return FlowRouter.getParam('category')
    }

});

Template.viewArticle.onRendered(function () {
    var self = this;
});

Template.viewArticle.onDestroyed(function () {
    //add your statement here
});

