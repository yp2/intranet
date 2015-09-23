
Meteor.startup(function () {
    // code to run on server at startup

    process.env.MAIL_URL = Meteor.settings.email.SMTPCreds;
    console.log(MyApp);
});
