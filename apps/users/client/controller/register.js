Template.register.helpers({
    //add you helpers here
});

Template.register.events({
    //add your events here
});

Template.register.onCreated(function () {
    //add your statement here
});

Template.register.onRendered(function () {
    var self = this;
    if (self.view.isRendered){
        var body = $('body');
        body.addClass('register-page');
    }
});

Template.register.onDestroyed(function () {
    var body = $('body');
    body.removeClass();
});

