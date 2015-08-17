/**
 * Created by daniel on 16.08.15.
 */
WikiArticle = new Meteor.Collection('wikiArticle');

WikiArticle.before.insert(function (userId, doc) {
    doc.createdAt = new Date();
});

WikiArticle.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = new Date();
});
