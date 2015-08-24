Template.listArticlesCategory.helpers({
    categoryArticles: function () {
        return Template.instance().categoryArticles()
    }
});

Template.listArticlesCategory.events({
    //add your events here
});

Template.listArticlesCategory.onCreated(function () {
    var self = this;

    self.articleSortData = new ReactiveVar(null);
    var category = self.data.category;

    self.categoryArticles = function () {
        console.log('aaa');
        var sortData = self.articleSortData.get();
        if (!sortData){
            return WikiArticle.find({
                status:'published', category: category
            },
                {sort:{title:1}}).fetch()
        }
    }
});

Template.listArticlesCategory.onRendered(function () {
    //add your statement here
});

Template.listArticlesCategory.onDestroyed(function () {
    //add your statement here
});

