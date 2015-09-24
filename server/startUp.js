
Meteor.startup(function () {
    // code to run on server at startup
    process.env.MAIL_URL = Meteor.settings.email.SMTPCreds;
    
    let debug = Meteor.settings.debug;
    let version = Meteor.release;
    console.log("-----------------------------------------------------------");
    console.log(`${version}`);
    console.log(`Debug mode: ${debug}`);

    if (Meteor.isServer) {
        Migrations.migrateTo('latest');
    }

    console.log("-----------------------------------------------------------");
});
