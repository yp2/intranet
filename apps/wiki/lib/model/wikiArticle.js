/**
 * Created by daniel on 16.08.15.
 */
WikiArticle = new Meteor.Collection('wikiArticle');

WikiArticle.before.insert(function (userId, doc) {
    var createDate = new Date();
    doc.createdAt = createDate;
});

WikiArticle.before.update(function (userId, doc, fieldNames, modifier, options) {
    var modDate = new Date();
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = modDate;
});
