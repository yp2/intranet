Template.listArticlesCategory.helpers({
    categoryArticles: function () {
        return Template.instance().categoryArticles()
    },
    currentCategory: function () {
        return Template.instance().data.category;
    }
});

Template.listArticlesCategory.events({
    //add your events here
});

Template.listArticlesCategory.onCreated(function () {
    var self = this;

    self.articleSortData = new ReactiveVar(null);
    var category = self.data.category;
    var status = self.data.draft ? "draft":"published";
    var user = Meteor.user();
    var scopeSelected = UserScope.findOne({_id: user.profile.scopeSelected.id});
    var wiki = Wiki.findOne({_id: scopeSelected.wiki.id});

    if (wiki.admin.id !== user._id) {
        status = "published"
    }

    self.autorun(function () {
        var articleSub = self.subscribe('articlesForWikiCategory', category);
    })

    self.categoryArticles = function () {
        var sortData = self.articleSortData.get();
        var sel = {
            status: status,
            category: category
        };
        if (self.data.mine) {
            _.assign(sel, {"author.id": user._id});
            delete sel.status
        }
        console.log(sel);
        if (!sortData){
            return WikiArticle.find(sel,
                {sort:{titleSlug: 1}}).fetch()
        }
    }
});

Template.listArticlesCategory.onRendered(function () {
    //add your statement here
});

Template.listArticlesCategory.onDestroyed(function () {
    //add your statement here
});

