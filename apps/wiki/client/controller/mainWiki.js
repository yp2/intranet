Template.mainWiki.helpers({
    canAddCategory: function () {
        return Boolean(Template.instance().category() === 'main');
    },
    categories: function () {
        var wiki = Template.instance().wiki();
        var result = wiki ? wiki.categories : [];
        result = _.pull(_.pluck(result, 'title'), "main").sort(new Intl.Collator('en', { sensitivity: 'base' }).compare);
        return result;
    },
    currentCategory: function () {
        return Template.instance().category()
    },
    wikiAdmin: function () {
        return Template.instance().wiki().admin.id === Meteor.user()._id
    },
    currentWiki: function () {
        return Template.instance().wiki();
    },
    currentList: function (tabId) {
        return Session.get('user.articleList') === tabId ? 'active': "";
    }
});

Template.mainWiki.events({
    'click .add-category-modal': function (e, t) {
        t.showAddCategoryModal.set(true)
    },
    'click .delete-category-modal': function (e, t) {
        e.preventDefault();

        t.categoryToDelete.set($(e.currentTarget).data());
        t.showDeleteCategoryModal.set(true);
    },
    'click .edit-category-modal': function (e, t) {
        e.preventDefault();
        var data = $(e.currentTarget).data();
        t.categoryToEdit.set({category: data.category, wikiId: data.wikiid})
        t.showEditCategoryModal.set(true)
    },
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
    },
    'click .article.list' : function (e, t) {
        e.preventDefault();
        //console.log(e.currentTarget.firstChild.hash);
        Session.set('user.articleList', e.currentTarget.firstChild.hash)
    }
});

Template.mainWiki.onCreated(function () {
    var self = this;
    self.showAddCategoryModal = new ReactiveVar(false);
    self.showDeleteCategoryModal = new ReactiveVar(false);
    self.showEditCategoryModal = new ReactiveVar(false);
    self.categoryToEdit = new ReactiveVar(null);
    self.categoryToDelete = new ReactiveVar(null);
    
    Session.setDefault('user.articleList', "#tab_1");

    self.category = function () {
        return 'main'
    };
    self.autorun(function () {
        //var wikiSub = self.subscribe('scopeWiki');
        //var articleSub = self.subscribe('articlesForWikiCategory', self.category());
        var user = Meteor.user();
        self.wiki = function () {
            return MyApp.getWikiForUser(user);
        }

    });
});

Template.mainWiki.onRendered(function () {
    //add your statement here
    var self = this;

    Deps.autorun(function () {
        if (self.showAddCategoryModal.get()) {
            $('#addCategoryModal').modal('show');
        }
        if (self.showDeleteCategoryModal.get()){
            $('#deleteCategoryModal').modal('show');
        }
        if (self.showEditCategoryModal.get()){
            $("#editCategoryModal").modal('show');
        }
    });
});

Template.mainWiki.onDestroyed(function () {
    //add your statement here
    var self = this;
    self.showAddCategoryModal.set(false);
    self.showDeleteCategoryModal.set(false);
    self.showEditCategoryModal.set(false);
});

