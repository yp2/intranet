/**
 * Created by daniel on 16.08.15.
 */

Meteor.methods({
    'userLogout': function () {
        Meteor.users.upsert({_id: this.userId}, {
            $set: {
                "profile.login.status": 'offline',
                "profile.login.lastLogout": new Date()
            }
        })
    }
});
