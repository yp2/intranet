Accounts.validateNewUser(function (user) {
    if (!MyApp.validateEmail(user.emails[0].address)){
        throw new Meteor.Error(403, 'Wrong email address');
    }
    return true;
});
