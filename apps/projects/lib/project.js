/**
 * Created by daniel on 26.10.15.
 */

Project = new Meteor.Collection('project');

Project.before.insert(function (userId, doc) {
    "use strict";

    let createDate = new Date();
    doc.createdAt = createDate;
});

Project.before.update(function (userId, doc, fieldNames, modifier, options) {
    "use strict";

    let modDate = new Date();
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = modDate;
    modifier.$set.modifiedBy = userId
});
