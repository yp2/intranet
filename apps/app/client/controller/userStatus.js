Template.userStatus.helpers({
    userOnline: function () {
        return Meteor.user().profile.login.status === 'online'
    }
});

Template.userStatus.events({
    //add your events here
});

Template.userStatus.onCreated(function () {
    //add your statement here
});

Template.userStatus.onRendered(function () {
    //add your statement here
});

Template.userStatus.onDestroyed(function () {
    //add your statement here
});

