"use strict";

Template.sidebarUserElement.helpers({
    userShort () {
        return this.username.slice(0,2)
    }
});

Template.sidebarUserElement.events({
    //add your events here
});

Template.sidebarUserElement.onCreated(function () {
    //add your statement here
});

Template.sidebarUserElement.onRendered(function () {
    var self = this;
    
    //    console.log('ggg', self);
    //if (self.view.isRendered) {
    //    self.$(".sidebar-project.user-element").popover({
    //        html : true,
    //        content: function() {
    //            return $('.sidebar-project.popover-user-element').html();
    //        },
    //        title: function() {
    //            return self.data.username;
    //        },
    //        placement: "right",
    //        trigger: 'focus click'
    //    });
    //}
});

Template.sidebarUserElement.onDestroyed(function () {
    //add your statement here
});

