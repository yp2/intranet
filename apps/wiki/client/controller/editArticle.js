"use strict";

Template.editArticle.helpers({
    articlePreview: function () {
        return Session.get('articleContent')
    },
    editorOptions: function () {
        return {
            lineNumbers: true,
            mode: 'gfm',
            viewportMargin: Infinity,
            lineWrapping: true,
            scrollbarStyle: "null"
        }
    },
    editorCode: function () {
        var content = this.content;
        Session.set('articleContent', content);
        console.log('aaaa', this);
        return content
    },
    isPublished: function () {
        var article = this;
        return article.status === 'published'
    },
    editTitle () {
        return Template.instance().editTitle.get();
    }
});

Template.editArticle.events({
    //add your events here
    "keyup .CodeMirror, change .CodeMirror": _.debounce(function (e, t) {
        e.preventDefault();
        var code = e.currentTarget.CodeMirror.getTextArea().value,
            saveData = {content: code, id: this._id};

        Session.set("articleContent", code);

        Meteor.call('saveArticleContent', saveData, function (error, result) {
            if (error) {
                sAlert.addError(error.reason, "Save error")
            }
        })
    }, 500),
    'keyup #articleTitle, blur #articleTitle': _.debounce(function (e){
        var saveData = {id: this._id, title: e.currentTarget.value};
        Meteor.call('saveArticleTitle', saveData, function (error, result) {
            if(error) {
                sAlert.addError(error.reason, "Save error");
            }
        });
    }, 500),

    'click .article-publish': function (e, t) {
        e.preventDefault();

        var article = t.parentTemplate().currentArticle();
        Meteor.call('publishArticle', {id: article._id}, function (error, result) {
                if (error) {
                    sAlert.addError(error.reason, "Publish article error");
                }
                if (result) {
                    if (result === 'published') {
                        sAlert.addSuccess("Article published")
                    } else {
                        sAlert.addSuccess("Article in draft")
                    }
                }
            }
        )
    },
    'click .article-view': function (e, t) {
        e.preventDefault();
        FlowRouter.setQueryParams({edit:undefined})
    },
    'click .edit-title' (e, t) {
        e.preventDefault();
        t.editTitle.set(true);
        t.$("#articleTittle").focus();
    }
});

Template.editArticle.onCreated(function () {
    var self = this;
    self.editTitle = new ReactiveVar(false);
});

Template.editArticle.onRendered(function () {
    $('<link>', {
            href: 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/styles/github.min.css',
            rel: 'stylesheet'
        }
    ).appendTo('head')
});

Template.editArticle.onDestroyed(function () {
    $('<link>', {
            href: 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/styles/github.min.css',
            rel: 'stylesheet'
        }
    ).remove('head')
});

