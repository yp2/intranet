// App

_ = lodash;

if (typeof MyApp === 'undefined' ) {
    MyApp = {}
}

MyApp._mainDashRegions = {
    header: "mainDashHeader",
    sideBar: "mainDashSideBar",
    footer: "mainDashFooter",
    controlSideBar: "mainDashControlSideBar"
};

MyApp.validateEmail = function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

MyApp.levelMainDashLayout = 3;

MyApp.mainDashRegions = function (contentTemplate) {
    var regions;
    if (contentTemplate) {
        check(contentTemplate, String);
        regions = _.extend({content: contentTemplate}, this._mainDashRegions)
    } else {
        regions = _.clone(this._mainDashRegions)
    }
    return regions
};

MyApp.informLayout = function () {
    if (Meteor.isClient) {
        var mainDashLayout = Blaze.getView($('div.wrapper')[0]).templateInstance(),
            renderedTemplates = mainDashLayout.renderedTemplates.get();
        mainDashLayout.renderedTemplates.set(renderedTemplates + 1);

    }
};

MyApp.getWikiForUser = function (user, projectId) {
    if (projectId) {
        var project = Project.findOne({_id: projectId, $or: [{'admin.id': user._id}, {allowedUser: user._id}]})
        if (project) {
            return Wiki.findOne({"project.id": project._id})
        }
    } else {
        var scopeSelected = MyApp.getScopeForUser(user);
        return Wiki.findOne({_id: scopeSelected.wiki.id});

    }
};

MyApp.getScopeForUser= function (user) {
    var scopeSelected = UserScope.findOne({_id: user.profile.scopeSelected.id});
    if (!scopeSelected) {
        throw new Meteor.Error(404, "No scope for user");
    }
    return scopeSelected
};

MyApp.user = {
    isWikiAdmin (user, wiki) {
        if (Meteor.isServer) {
            return wiki.secure.admin.id === user._id;
        }
        if (Meteor.isClient) {
            return wiki.admin.id === user._id;
        }
    },
    isScopeAdmin (user, scope) {
        if (Meteor.isServer) {
            return scope.secure.admin.id === user._id;
        }
        if (Meteor.isClient){
            return scope.admin.id === user._id;
        }
    }
};

//MyApp.informLayoutSubtract = function () {
//    if (Meteor.isClient) {
//        var mainDashLayout = Blaze.getView($('div.wrapper')[0]).templateInstance(),
//            renderedTemplates = mainDashLayout.renderedTemplates.get();
//        mainDashLayout.renderedTemplates.set(renderedTemplates - 1);
//
//    }
//}
