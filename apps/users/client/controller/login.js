Template.login.helpers({
    //add you helpers here
});

Template.login.events({
    'click .login-btn' : function (event) {
        event.preventDefault();
        console.log('submit');
        
        var email, password;
        
        email = $("#email-input");
        password = $("#password-input");
        
        Meteor.loginWithPassword(email.val(), password.val(), function(error) {
            if (error) {
                $("span.login-error").html(error.reason).closest('div').addClass('has-error').show();
            } else {
                FlowRouter.go('mainDash')
            }
        })
    }
    
});

Template.login.onCreated(function () {
    //add your statement here
});

Template.login.onRendered(function () {
    var self = this,
        body;

    if (self.view.isRendered){
        body = $('body');
        body.removeClass();
        body.addClass('login-page');
    }

});

Template.login.onDestroyed(function () {
});

