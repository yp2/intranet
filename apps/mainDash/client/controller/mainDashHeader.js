"use strict";

Template.mainDashHeader.helpers({
    scopes () {
        return Template.instance().scopes()
    },
    scopeDesc () {
        let user = Meteor.user();
        if (this._id === user.profile.scopeMain.id) {
            if (this.type === 'per') {
                return "Personal scope"
            } else if (this.type === "org") {
                return "Organization scope"
            }
        }
        return this.name;
    },
    scopeIsOrg () {
        return this.type === "org";
    },
    selected () {
        let user = Meteor.user();
        return this._id === user.profile.scopeSelected.id ? 'show-element' : "hide-element";
    }
});

Template.mainDashHeader.events({
    "click .change-scope" (e, t){
        e.preventDefault();
        let scopeId = $(e.currentTarget).data().id,
            user = Meteor.user();
        if (scopeId !== user.profile.scopeSelected.id) {
            Meteor.call("changeUserScope", scopeId, function (error, result) {
                if (error) {
                    sAlert.addError(error.reason, "Error changing scope")
                }
                if (result) {
                    var current = FlowRouter.current();
                    if (current.route.name !== "mainDash") {
                        FlowRouter.go("mainDash")
                        
                    }
                }
            });
        }
    }
});

Template.mainDashHeader.onCreated(function () {
    let self = this;

    self.autorun(function () {
        self.scopes = function () {
            let user = Meteor.user();
            return UserScope.find({allowedUsers: user._id}, {sort: {name: 1}}).fetch();
        }

    })
});

Template.mainDashHeader.onRendered(function () {
    let self = this;

    if (self.view.isRendered) {
        MyApp.informLayout()

    }
});

Template.mainDashHeader.onDestroyed(function () {
    //add your statement here
});

