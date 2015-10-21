"use strict";
Template.editForm.helpers({
    thisArticle () {
        console.log('article', WikiArticle.findOne(FlowRouter.getParam("articleId")));
        return WikiArticle.findOne(FlowRouter.getParam("articleId"))
    }
});

Template.editForm.events({
    //add your events here
});

Template.editForm.onCreated(function () {
    //add your statement here
});

Template.editForm.onRendered(function () {
});

Template.editForm.onDestroyed(function () {
    //add your statement here
});

