/**
 * Created by daniel on 16.08.15.
 */
Meteor.startup(function () {
    if (Meteor.isServer) {
        Migrations.migrateTo('latest');
    }
});

Migrations.add({
    version: 1,
    name: "Wiki main category",
    up: function () {
        WikiArticle.find({titleSlug: {$exists: 0}}).forEach(function (doc) {
            WikiArticle.upsert({
                _id: doc._id
            }, {
                $set: {
                    titleSlug: s.slugify(doc.title),
                    'secure.titleSlug': s.slugify(doc.title)
                }
            })
        })
    }
});
