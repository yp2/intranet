/**
 * Created by daniel on 16.08.15.
 */


Migrations.add({
    version: 1,
    name: "Title slug",
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

Migrations.add({
    version: 2,
    name: "Wiki main category",
    up: function () {
        Wiki.update({}, {$addToSet: {categories: "main", "secure.categories": "main"}}, {multi: true})
    }
});

Migrations.add({
    version: 3,
    name: "Wiki category objects",
    up: function () {
        Wiki.find().forEach(function (doc) {
            var categories = doc.secure.categories;
            var newCategories = [];

            for (var i = 0; i < categories.length; i++) {
                var obj = categories[i];
                newCategories.push({
                    title: obj,
                    titleSlug: s.slugify(obj)
                })
            }
            Wiki.update({_id:doc._id}, {$set:{categories: newCategories, 'secure.categories': newCategories}})

        })

    }

});
