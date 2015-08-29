Template.editCategoryModal.helpers({
    //add you helpers here
});

Template.editCategoryModal.events({
    'shown.bs.modal #editCategoryModal': function(e,t) {
        t.$("#inputEditCategory").val(t.category);
        t.$('#inputEditCategory').focus()
    },
    'hide.bs.modal #editCategoryModal': function (e, t) {
        t.parentTemplate().showEditCategoryModal.set(false);
        t.$('span.category-error').html('').closest('div').removeClass('has-error has-success');
        t.$('span.category-error').closest('label').hide();
        t.$('.edit-category-form')[0].reset();
    },
    'click .edit-category': function (e, t) {
        e.preventDefault();
        
        var categoryData = {
            title: t.$("#inputEditCategory").val()
        }
        
        console.log(categoryData.title);
        
    },
    'keyup #inputEditCategory, blur #inputEditCategory': _.debounce(function (e, t) {
        // nie na debounce nie ma takiej kategorii tylko na save. przenieść do góry
        e.preventDefault();
        console.log(e, t.wiki, t.category);
        var data = {
            title: t.category,
            wikiId: t.wiki,
            newTitle: t.$("#inputEditCategory").val()
        };
        
        Meteor.call("editWikiCategory", data, function (error, result) {
            if(error) {
                console.log(error);
            }
            if (result) {
                console.log('saved');
            }
        })
    }, 500)
});

Template.editCategoryModal.onCreated(function () {
    var self = this;

    self.autorun(function () {
        var context = self.parentTemplate().categoryToEdit.get();

        if (context) {
            self.wiki = context.wikiId;
            self.category = context.category;

            console.log(self.wiki, self.category);
        }

    })



});

Template.editCategoryModal.onRendered(function () {
    //add your statement here
});

Template.editCategoryModal.onDestroyed(function () {
    this.parentTemplate().showEditCategoryModal.set(false);
    $(".modal-backdrop").remove();
    $('body').removeClass('modal-open');
});

