/**
 * Created by daniel on 07.11.15.
 */

Talks = new Meteor.Collection('talks');

Talks.before.insert(function (userId, doc) {
    var createDate = new Date();
    doc.createdAt = createDate;
});

Talks.before.update(function (userId, doc, fieldNames, modifier, options) {
    var modDate = new Date();
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = modDate;
    modifier.$set.modifiedBy = userId
});
