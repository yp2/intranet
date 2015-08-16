/**
 * Created by daniel on 16.08.15.
 */
Wiki = new Meteor.Collection('wiki');

Wiki.before.insert(function (userId, doc) {
    doc.createdAt = new Date();
});

Wiki.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = new Date();
});
