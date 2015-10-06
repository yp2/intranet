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
        yfUtils.procField(e,t);
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

