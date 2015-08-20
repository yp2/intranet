Template.mainWiki.helpers({
    canAddCategory: function () {
        //return Boolean(Template.instance().category === 'main');
        return true;
    },
    categories: function () {
        var wiki = Template.instance().wiki();
        return wiki ? wiki.categories : [];
        //return Wiki.findOne().categories || []
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

        console.log(t.categoryToDelete.get());
        
        //Meteor.call('deleteCategory',$(e.currentTarget).data(), t.category, function (error, result) {
        //    if(error) {
        //        sAlert.addError(error.reason, "Can't delete category")
        //    }
        //    if (result) {
        //        sAlert.addSuccess('Category deleted');
        //    }
        //});
    }
});

Template.mainWiki.onCreated(function () {
    var self = this;

    self.autorun(function () {
        self.category = FlowRouter.getParam('category');
        console.log('category', self.category);
        var wikiSub = self.subscribe('scopeWiki', self.category);
        var articleSub = self.subscribe('articlesForWikiCategory', self.category)
        self.wiki = function () {
            console.log('wiki',Wiki.find().count());
            return Wiki.findOne()
        }

    });
});

Template.mainWiki.onRendered(function () {
    //add your statement here
    var self = this;
    self.showAddCategoryModal = new ReactiveVar(false);
    self.showDeleteCategoryModal = new ReactiveVar(false);
    self.categoryToDelete = new ReactiveVar(null);

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

