Template.wikiCategory.helpers({
    wiki: function () {
        //console.log( Template.instance().wiki());
        return Template.instance().wiki()
    },
    currentCategory: function () {
        return Template.instance().category()
    },
    currentList: function (tabId) {
        return Session.get('user.articleList') === tabId ? 'active': "";
    }
});

Template.wikiCategory.events({
    'click .add-article': function (e, t) {
        e.preventDefault();

        var data = {category: t.category()};

        var projectId = FlowRouter.getParam('projectId');

        if (projectId) {
            _.extend(data, {projectId: projectId});
        }

        Meteor.call('addArticle', data, function(error, result){
            if (error) {
                sAlert.addError(error.reason, 'Add article Error');
            }
            if (result) {
                var alertConfig = _.clone(sAlert.settings);
                alertConfig.onRouteClose = false;

                sAlert.addSuccess('Article added', "", alertConfig);
                if (projectId) {
                    FlowRouter.go('projectWikiArticle', {category: t.category(), articleId: result, projectId: projectId})
                } else {
                    FlowRouter.go('wikiArticle', {category: t.category(), articleId: result})
                }
            }
        })
    }
});

Template.wikiCategory.onCreated(function () {
    var self = this;

    Session.setDefault('user.articleList', "#tab_1");

    self.autorun(function () {
        self.category = function () {
            FlowRouter.watchPathChange();
            var context = FlowRouter.current();
            return context.params.category
        };
        
        self.projectId = function () {
            FlowRouter.watchPathChange();
            var context = FlowRouter.current();
            return context.params.projectId
        };
        var user = Meteor.user();
        var articleSub;
        if (self.projectId()) {
            articleSub = self.subscribe('articlesForWikiCategory', self.category(), self.projectId());
        } else {
            articleSub = self.subscribe('articlesForWikiCategory', self.category());

        }


        self.wiki = function () {
            if (self.projectId()) {
                return MyApp.getWikiForUser(user, self.projectId());
            } else {
                return MyApp.getWikiForUser(user)
            }
        };
        var cat = self.category();
        console.log('dd', self.parentTemplate(MyApp.levelMainDashLayout).subscriptionsReady());
        if (self.parentTemplate(MyApp.levelMainDashLayout).subscriptionsReady()) {
            console.log(self.wiki(), cat);
            if (!self.wiki() || !_.find(self.wiki().categories, _.matches({title: cat}))) {
                FlowRouter.go('404')
            }

        }
    })
});

Template.wikiCategory.onRendered(function () {
    //add your statement here
});

Template.wikiCategory.onDestroyed(function () {
    //add your statement here
});

