/**
 * Created by daniel on 16.08.15.
 */
Meteor.startup(function () {
    if (Meteor.isServer) {
        Migrations.migrateTo('latest');
    }
});

//Migrations.add({
//    version: 1,
//    name: "Wiki main category",
//    up: function () {
//       Wiki.upsert({},{$unset: {categories: '', 'secure.categories':''}}, {multi: true})
//    }
//});
