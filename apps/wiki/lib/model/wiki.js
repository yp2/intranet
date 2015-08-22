/**
 * Created by daniel on 16.08.15.
 */
Wiki = new Meteor.Collection('wiki');

Wiki.before.insert(function (userId, doc) {
    var createDate = new Date();
    doc.createdAt = createDate;
    doc.secure.createdAt = createDate;
});

Wiki.before.update(function (userId, doc, fieldNames, modifier, options) {
    var modDate = new Date();
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = modDate;
    modifier.$set.secure.modifiedAt = modDate;
});
