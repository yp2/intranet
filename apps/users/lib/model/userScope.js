/**
 * Created by daniel on 16.08.15.
 */
UserScope = new Meteor.Collection('userScope');

UserScope.before.insert(function (userId, doc) {
    doc.createdAt = new Date();
});

UserScope.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = new Date();
});
