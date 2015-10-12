'use strict';
Template.userRegister.helpers({
    registerFor () {
        let inv = Template.instance().inv();
        let type;
        if (typeof inv !== 'undefined' && inv.type.type === 'org' ) {
            type = "organization"
        } else {
            type = "project"
        }

        return typeof inv !== 'undefined' ? `for ${type} ${inv.type.name}` : ""
    }
});

Template.userRegister.events({
    'submit .register-form' : function (e,t) {
        e.preventDefault();

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
                password2: password2.val(),
                invitation: t.inv() || {}
            };
            console.log('form opt', options);
            Meteor.call('registerUser', options, function(error, result){
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

                    title = "Account created !";
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

Template.userRegister.onCreated(function () {
    let self = this;
    let invId = Session.get('invitation');

    self.autorun(function () {
        self.subscribe('invitation', invId);
        self.inv = function () {
            return Invitation.findOne({_id: invId})
        }
    })
});

Template.userRegister.onRendered(function () {
    let self = this;
    if (self.view.isRendered){
        let body = $('body');
        body.removeClass();
        body.addClass('register-page');
        $(":button").addClass("disabled");


        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });
    }
    self.autorun(function () {
        let inv = self.inv();
        if (inv && inv.user.email) {
            $("#email-input").val(inv.user.email)
        }
    })
});

Template.userRegister.onDestroyed(function () {
    //add your statement here
});

