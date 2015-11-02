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

    self.autorun(function () {
        var category = self.data.category;
        var status = self.data.draft ? "draft":"published";
        FlowRouter.watchPathChange();
        var context = FlowRouter.current();
        var wiki, articleSub;
        var user = Meteor.user();

        if (context.params.hasOwnProperty('projectId')) {
            wiki = Wiki.findOne({"project.id": context.params.projectId});
            articleSub = self.subscribe('articlesForWikiCategory', category, context.params.projectId);

        } else {
            var scopeSelected = UserScope.findOne({_id: user.profile.scopeSelected.id});
            wiki = Wiki.findOne({_id: scopeSelected.wiki.id});
            articleSub = self.subscribe('articlesForWikiCategory', category);


        }

        if (wiki && wiki.admin.id !== user._id) {
            status = "published"
        }

        self.categoryArticles = function () {
            var sortData = self.articleSortData.get();
            var sel;

            if (context.params.hasOwnProperty('projectId')) {
                sel = {
                    status: status,
                    category: category,
                    'project.id': context.params.projectId
                }
            } else {
                sel = {
                    status: status,
                    category: category,
                    'scope.id': user.profile.scopeSelected.id
                };
            }

            if (self.data.mine) {
                _.assign(sel, {"author.id": user._id});
                delete sel.status
            }
            if (!sortData){
                return WikiArticle.find(sel,
                    {sort:{titleSlug: 1}}).fetch()
            }
        }
    })

});

Template.listArticlesCategory.onRendered(function () {
    //add your statement here
});

Template.listArticlesCategory.onDestroyed(function () {
    //add your statement here
});

