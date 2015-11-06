Template.wikiTest.helpers({
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
        return 'Code to show in editor'
    },
    preview: function () {
        console.log(Session.get('editorContent'));
        return Session.get('editorContent');
    }
});

Template.wikiTest.events({

});

Template.wikiTest.onCreated(function () {
    //add your statement here
    Session.set('editorContent', 'Session')
});

Template.wikiTest.onRendered(function () {
    $('<link>', {
        href: 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/styles/github.min.css',
        rel: 'stylesheet'}
    ).appendTo('head')

});

Template.wikiTest.onDestroyed(function () {
    $('<link>', {
            href: 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/styles/github.min.css',
            rel: 'stylesheet'}
    ).remove('head')
});

