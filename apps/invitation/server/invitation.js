/**
 * Created by daniel on 27.09.15.
 */
'use strict';
Meteor.publish('invitation', function (id) {
    return Invitation.find({_id: id})
});
