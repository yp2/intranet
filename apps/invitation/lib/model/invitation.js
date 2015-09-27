/**
 * Created by daniel on 27.09.15.
 */
Invitation = new Meteor.Collection('invitation');

Invitation.before.insert(function (userId, doc) {
    var createDate = new Date();
    doc.createdAt = createDate;
});

Invitation.before.update(function (userId, doc, fieldNames, modifier, options) {
    var modDate = new Date();
    modifier.$set = modifier.$set || {};
    modifier.$set.modifiedAt = modDate;
});


Invitation.addInvitation = function (options) {
    return Invitation.insert({
        user:{email: options.invitedUserEmail},
        inviting:{id: options.invitingId},
        type: {
            type: options.type,
            id: options.typeId
        },
        valid: true
    });
};
