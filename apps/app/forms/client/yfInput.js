"use strict";

Template.yfInput.helpers({
    getParams () {
        return yfUtils.fieldParams(this);
    },

    error () {
        let t = Template.instance(),
            error = t.fieldError.get();

        if (error) {
            return error.reason
        }
    }
});

// todo refactoring
Template.yfInput.events({
    'keyup input, change input': _.debounce(function(e, t){

        t.fieldError.set(null);

        let val = t.$(e.currentTarget).val();
        if (typeof t.data.formClass !== "undefined") {
            try {
                val = t.data.formClass.validateField(t.data.field, val);
                console.log('validated val', val);
                if (typeof t.data.method !== "undefined") {
                    Meteor.call(t.data.method, t.data.obj, val, function(error, result) {
                        if (error) {
                            t.$("input").closest('.form-group').removeClass("has-succes").addClass('has-error');
                            t.fieldError.set(error)
                        }
                        if (result) {
                            t.$("input").closest('.form-group').removeClass("has-error").addClass('has-success');
                        }
                    })
                }
                t.$("input").closest('.form-group').removeClass("has-error").addClass('has-success');
            } catch (error) {
                console.log('catch', error);
                t.$("input").closest('.form-group').removeClass("has-success").addClass('has-error');
                t.fieldError.set(error)
            }
        }

    }, 500 )
});

Template.yfInput.onCreated(function () {
    var self = this;
    self.fieldError = new ReactiveVar(null)
});

Template.yfInput.onRendered(function () {
    //add your statement here
});

Template.yfInput.onDestroyed(function () {
    //add your statement here
});

