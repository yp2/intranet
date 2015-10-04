"use strict";

Template.yfInput.helpers({
    getParams () {
        return {
            fieldParams:yfUtils.fieldParams(this)
        }
    },
    getTmpl () {
        return this.tmpl ? this.tmpl : "yfBaseInput"
    }
});

Template.yfInput.events({
    'keyup input, change input' (e, t){
        console.log('key', $(e.currentTarget).val());

        t.$("input").closest('.form-group').addClass('has-success').delay(1000).queue(function(){
            $(this).removeClass("has-success").dequeue();
        });
        //t.$(".testowa").dequeue().fadeIn().delay(1000).fadeOut();
    }
});

Template.yfInput.onCreated(function () {
    //add your statement here
});

Template.yfInput.onRendered(function () {
    //add your statement here
});

Template.yfInput.onDestroyed(function () {
    //add your statement here
});

