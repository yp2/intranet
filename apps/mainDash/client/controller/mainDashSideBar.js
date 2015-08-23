Template.mainDashSideBar.helpers({
    currentWiki: function () {
        return Template.instance().wiki()
    },
    wikiCategories: function () {
        var wiki = Template.instance().wiki();
        return wiki.categories
    }
});

Template.mainDashSideBar.events({
    //add your events here
});

Template.mainDashSideBar.onCreated(function () {
    var self = this;

    self.autorun(function () {
        self.wiki = function () {
            return Wiki.findOne();
        }
    })
});

Template.mainDashSideBar.onRendered(function () {
    var self = this;

    if (self.view.isRendered) {
        MyApp.informLayout()

    }
});

Template.mainDashSideBar.onDestroyed(function () {
    //add your statement here
});

