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
        var content = Template.instance().parentTemplate().currentArticle().content;
        Session.set('articleContent', content);
        return content
    },
    isPublished: function () {
        var article = Template.instance().parentTemplate().currentArticle();
        return article.status === 'published'
    }
});

Template.editArticle.events({
    //add your events here
    "keyup .CodeMirror, change .CodeMirror": function (e, t) {
        e.preventDefault();
        var code = t.find("#wiki-editor").value,
            saveData = {content: code, id: t.parentTemplate().articleId()};

        Session.set("articleContent", code);

        Meteor.call('saveArticleContent', saveData, function (error, result) {
            if (error) {
                sAlert.addError(error.reason, "Save error")
            }
        })
    },
    'keyup #articleTitle, blur #articleTitle': function(e,t) {
        e.preventDefault();
        var saveData = {id: t.parentTemplate().articleId(), title: e.currentTarget.value};
        Meteor.call('saveArticleTitle', saveData, function (error, result) {
            if(error) {
                sAlert.addError(error.reason, "Save error");
            }
        })
    },
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

    }
});

Template.editArticle.onCreated(function () {
    //add your statement here
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

