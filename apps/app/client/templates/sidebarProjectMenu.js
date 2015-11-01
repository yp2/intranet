"use strict";

Template.sidebarProjectMenu.helpers({
    projectUsers () {
        return Meteor.users.find({_id: {$in: this.allowedUsers}})
    }
});

Template.sidebarProjectMenu.events({
   "click .project-link" (e, t) {
       // check if parent li is acti
       console.log(e);
   }
});

Template.sidebarProjectMenu.onCreated(function () {
    //add your statement here
});

Template.sidebarProjectMenu.onRendered(function () {
    //add your statement here
});

Template.sidebarProjectMenu.onDestroyed(function () {
    //add your statement here
});

