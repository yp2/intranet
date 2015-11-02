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
    'click .edit-category, submit .edit-category-form': function (e, t) {
        e.preventDefault();
        var data = {
            title: t.category,
            wikiId: t.wiki,
            newTitle: t.$("#inputEditCategory").val()
        };

        var projectId = FlowRouter.getParam('projectId');

        if (projectId) {
            _.extend(data, {projectId: projectId});
        }

        if (data.title !== data.newTitle) {
            Meteor.call("editWikiCategory", data, function (error, result) {
                if(error) {
                    console.log(error);
                    t.$('span.category-error').html(error.reason).closest('div').addClass('has-error');
                    t.$('span.category-error').closest('label').show();
                }
                if (result) {
                    t.$('span.category-error').removeClass('has-error').addClass('has-success');
                    t.$('span.category-error').closest('label').hide();
                    $('#editCategoryModal').modal('hide');
                    sAlert.addSuccess("Category saved")
                }
            })
        } else {
            $('#editCategoryModal').modal('hide');
        }
    }
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

