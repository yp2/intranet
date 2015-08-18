Template.mainWiki.helpers({
    canAddCategory: function () {
        return Boolean(Template.instance().category === 'main');
    },
    categories: function () {
        return Wiki.findOne().categories || []
    }
});

Template.mainWiki.events({
    'click .add-category': function (e, t) {
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
    'hide.bs.modal #addCategoryModal': function (e, t) {
        t.showAddCategoryModal.set(false);
        t.$('span.category-error').html('').closest('div').removeClass('has-error has-success');
        t.$('span.category-error').closest('label').hide();
        t.$('#inputAddCategory').val("");

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
    })
});

Template.mainWiki.onDestroyed(function () {
    //add your statement here
    var self = this;
    self.showAddCategoryModal.set(false);
    $(".modal-backdrop").remove();
    $('body').removeClass('modal-open');
});

