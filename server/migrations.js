/**
 * Created by daniel on 16.08.15.
 */
Meteor.startup(function () {
    if (Meteor.isServer) {
        Migrations.migrateTo('latest');
    }
});
