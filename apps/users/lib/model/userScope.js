/**
 * Created by daniel on 16.08.15.
 */
UserScope = new Meteor.Collection('userScope');

UserScope.before.insert(function (userId, doc) {
    var createDate = new Date();
    doc.createdAt = createDate;
    doc.secure.createdAt = createDate;
});

UserScope.before.update(function (userId, doc, fieldNames, modifier, options) {
    var modDate = new Date();
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = modDate;
    modifier.$set.secure.modifiedAt = modDate;
});
