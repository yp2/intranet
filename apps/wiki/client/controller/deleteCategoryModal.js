Template.deleteCategoryModal.helpers({
    getCategory: function () {
        var category = Template.instance().parentTemplate().categoryToDelete.get() || {category: ""};
        return category.category;
    }
});

Template.deleteCategoryModal.events({
    'hide.bs.modal #deleteCategoryModal': function (e, t) {
        t.parentTemplate().showDeleteCategoryModal.set(false);
    },
    'click .delete-category': function(e,t) {

        var parentTemplate = t.parentTemplate();

        Meteor.call('deleteCategory',parentTemplate.categoryToDelete.get(), parentTemplate.category, function (error, result) {
            if(error) {
                $('#deleteCategoryModal').modal('hide');
                sAlert.addError(error.reason, "Can't delete category")

            }
            if (result) {
                $('#deleteCategoryModal').modal('hide');
                sAlert.addSuccess('Category deleted');
            }
        });
    }
});

Template.deleteCategoryModal.onCreated(function () {
    //add your statement here
});

Template.deleteCategoryModal.onRendered(function () {
    //add your statement here
});

Template.deleteCategoryModal.onDestroyed(function () {
    this.parentTemplate().showDeleteCategoryModal.set(false);
    $(".modal-backdrop").remove();
    $('body').removeClass('modal-open');
});

