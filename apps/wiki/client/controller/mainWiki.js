Template.mainWiki.helpers({
    canAddCategory: function () {
        return Boolean(Template.instance().category === 'main');
    },
    categories: function () {
        return Wiki.findOne().categories || []
    }
});

Template.mainWiki.events({
    'click .add-category': function (e,t){
        e.preventDefault();
        Meteor.call("addWikiCategory", {name: 'testowa'} , function (error, result) {
            if (error) {
                console.log("error", error);
            }
            if (result) {

            }
        });
    }
});

Template.mainWiki.onCreated(function () {
    var self = this;

    self.autorun(function () {
        self.category = FlowRouter.getParam('category');
        console.log('category', self.category);

        var wikiSub = self.subscribe('scopeWiki');
        var articleSub = self.subscribe('articlesForWikiCategory', self.category)

    })
});

Template.mainWiki.onRendered(function () {
    //add your statement here
});

Template.mainWiki.onDestroyed(function () {
    //add your statement here
});

