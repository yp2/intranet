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
                password: password.val(),
                password2: password2.val()
            };
            Meteor.call('registerOrganization', options, function(error, result){
                if (error) {
                    if (error.error = 403) {
                        var errorMsg = error.reason,
                            errorSpan = $('span.email-error');

                        if (errorMsg === 'Username already exists.') {
                            errorMsg = errorMsg.replace(/Username/, 'Email')
                        }

                        errorSpan.html(errorMsg);
                        errorSpan.closest('div').addClass('has-error');
                        errorSpan.closest('label').toggle();
                    } else if (error.error = 'passwords') {
                        var passwordSpan = $('span.password-error');
                        passwordSpan.html(error.reason);
                        passwordSpan.closest('div').addClass('has-error');
                        passwordSpan.closest('label').toggle();
                    } else {
                        console.log(error.reason);
                    }
                }
                if (result) {
                    var alertConfig,
                        msg,
                        title;

                    Meteor.loginWithPassword(options.email, options.password);
                    alertConfig = _.clone(sAlert.settings);
                    alertConfig.onRouteClose = false;

                    title = "Organization created !";
                    msg = "Welcome " + options.email + " to Intranet App";

                    sAlert.addSuccess(msg, title, alertConfig);
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
        body.removeClass();
        body.addClass('register-page');
        $(":button").addClass("disabled");

        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });


    }
});

Template.organizationRegister.onDestroyed(function () {
});

