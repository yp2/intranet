"use strict";
Template.editArticleTitle.helpers({
    //add you helpers here
});

Template.editArticleTitle.events({
    "blur input" (e, t) {
        e.preventDefault();
        t.parentTemplate().editTitle.set(false);
    }
});

Template.editArticleTitle.onCreated(function () {

});

Template.editArticleTitle.onRendered(function () {
    var self = this;

    self.$('input').focus();
});

Template.editArticleTitle.onDestroyed(function () {
    //add your statement here
});

