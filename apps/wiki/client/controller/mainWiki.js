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
    }
});

Template.mainWiki.events({
    'click .add-category-modal': function (e, t) {
        t.showAddCategoryModal.set(true)
    },
    'click .delete-category-modal': function (e, t) {
        e.preventDefault();

        t.categoryToDelete.set($(e.currentTarget).data());
        t.showDeleteCategoryModal.set('true');
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
    }
});

Template.mainWiki.onCreated(function () {
    var self = this;
    self.showAddCategoryModal = new ReactiveVar(false);
    self.showDeleteCategoryModal = new ReactiveVar(false);
    self.categoryToDelete = new ReactiveVar(null);
    self.category = function () {
        return 'main'
    };
    self.autorun(function () {
        //var wikiSub = self.subscribe('scopeWiki');
        //var articleSub = self.subscribe('articlesForWikiCategory', self.category());
        self.wiki = function () {
            return Wiki.findOne()
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
    });
});

Template.mainWiki.onDestroyed(function () {
    //add your statement here
    var self = this;
    self.showAddCategoryModal.set(false);
    self.showDeleteCategoryModal.set(false);
});

