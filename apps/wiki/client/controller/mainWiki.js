Template.mainWiki.helpers({
    canAddCategory: function () {
        //return Boolean(Template.instance().category === 'main');
        return true;
    },
    categories: function () {
        return Wiki.findOne().categories || []
    }
});

Template.mainWiki.events({
    'click .add-category, submit .add-category-form': function (e, t) {
        e.preventDefault();

        var categoryData = {
            name: t.$("#inputAddCategory").val()
        };

        Meteor.call("addWikiCategory", categoryData, function (error, result) {
            if (error) {
                t.$('span.category-error').html(error.reason).closest('div').addClass('has-error');
                t.$('span.category-error').closest('label').show();
            }
            if (result) {
                t.$('span.category-error').removeClass('has-error').addClass('has-success');
                t.$('span.category-error').closest('label').hide();
                $('#addCategoryModal').modal('hide');
                sAlert.addSuccess('Category added');
            }
        });
    },
    'click .add-category-modal': function (e, t) {
        t.showAddCategoryModal.set(true)
    },
    'shown.bs.modal #addCategoryModal': function(e,t) {
        console.log('show');
        t.$('#inputAddCategory').focus()
    },

    'hide.bs.modal #addCategoryModal': function (e, t) {
        t.showAddCategoryModal.set(false);
        t.$('span.category-error').html('').closest('div').removeClass('has-error has-success');
        t.$('span.category-error').closest('label').hide();
        t.$('.add-category-form')[0].reset();
    },
    'click .delete-category': function (e, t) {
        e.preventDefault();
        console.log($(e.currentTarget).data());

        Meteor.call('deleteCategory',$(e.currentTarget).data(), t.category, function (error, result) {
            if(error) {
                sAlert.addError(error.reason, "Can't delete category")
            }
            if (result) {
                sAlert.addSuccess('Category deleted');
            }
        });
    }
});

Template.mainWiki.onCreated(function () {
    var self = this;


    self.autorun(function () {
        self.category = FlowRouter.getParam('category');

        //if self.showAddCategoryModal

        console.log('category', self.category);

        var wikiSub = self.subscribe('scopeWiki');
        var articleSub = self.subscribe('articlesForWikiCategory', self.category)

    })
});

Template.mainWiki.onRendered(function () {
    //add your statement here
    var self = this;
    self.showAddCategoryModal = new ReactiveVar(false);

    Deps.autorun(function () {
        if (self.showAddCategoryModal.get()) {
            $('#addCategoryModal').modal('show');
        }
    });
    //if (self.view.isRendered) {
    //
    //
    //    $(function () {
    //        MeteorAdminLTE.run()
    //    });
    //}


});

Template.mainWiki.onDestroyed(function () {
    //add your statement here
    var self = this;
    self.showAddCategoryModal.set(false);
    $(".modal-backdrop").remove();
    $('body').removeClass('modal-open');
});

