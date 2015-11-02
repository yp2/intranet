Template.addCategoryModal.helpers({
    //add you helpers here
});

Template.addCategoryModal.events({
    'click .add-category, submit .add-category-form': function (e, t) {
        e.preventDefault();

        var categoryData = {
            title: t.$("#inputAddCategory").val(),
        };

        var projectId = FlowRouter.getParam('projectId');

        if (projectId) {
            _.extend(categoryData, {projectId: projectId});
        }

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
    'shown.bs.modal #addCategoryModal': function(e,t) {
        console.log('ff', FlowRouter.getParam("projectId"));
        console.log('show');
        t.$('#inputAddCategory').focus()
    },

    'hide.bs.modal #addCategoryModal': function (e, t) {
        console.log(t.parentTemplate());
        t.parentTemplate().showAddCategoryModal.set(false);
        t.$('span.category-error').html('').closest('div').removeClass('has-error has-success');
        t.$('span.category-error').closest('label').hide();
        t.$('.add-category-form')[0].reset();
    }
});

Template.addCategoryModal.onCreated(function () {
    //add your statement here
});

Template.addCategoryModal.onRendered(function () {
    //add your statement here
});

Template.addCategoryModal.onDestroyed(function () {
    this.parentTemplate().showAddCategoryModal.set(false);
    $(".modal-backdrop").remove();
    $('body').removeClass('modal-open');
});

