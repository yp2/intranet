Template.organizationRegister.helpers({
    //add you helpers here
});

Template.organizationRegister.events({
    'submit .register-form' : function (event) {
        event.preventDefault();

        var options,
            password = $('#password-input'),
            password2 = $('#password2-input'),
            submitButton = $(":button");

        if (password.length && (password.val() === password2.val())) {
            submitButton.removeClass("disabled");
            password2.closest('div').removeClass('has-error').addClass('has-success');

            options = {
                email: $("#email-input").val(),
                password: password2.val()
            };
            Meteor.call('registerOrganization', options, function(error, result){
                if (error) {
                    console.log('callback register error', error);

                }
                if (result) {
                    console.log('callback register success', result);
                    Meteor.loginWithPassword(options.email, options.password);
                    FlowRouter.go('mainDash');
                }
            })

        } else {
            password2.closest('div').addClass('has-error');
            submitButton.addClass("disabled");

        }

    },
    'keyup #password2-input, keyup #password-input': function (event) {
        var password = $('#password-input'),
            password2 = $('#password2-input'),
            submitButton = $(":button");
        
        if (password.val().length && password2.val().length && (password.val() === password2.val())) {
            password2.closest('div').removeClass('has-error').addClass('has-success');
            submitButton.removeClass("disabled")

        } else {
            if (!password.val().length && !password2.val().length){
                password2.closest('div').removeClass('has-error has-success');
            } else {
                password2.closest('div').addClass('has-error');
                submitButton.addClass('disabled')

            }
        }
    }
});

Template.organizationRegister.onCreated(function () {
    //add your statement here
});

Template.organizationRegister.onRendered(function () {
    var self = this;
    if (self.view.isRendered){
        var body = $('body');
        body.addClass('register-page');
        $(":button").addClass("disabled")


    }
});

Template.organizationRegister.onDestroyed(function () {
    var body = $('body');
    body.removeClass();
});

