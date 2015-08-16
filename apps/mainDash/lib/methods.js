/**
 * Created by daniel on 16.08.15.
 */

Meteor.methods({
    'userLogout': function () {
        console.log('userlogiut method:', this.userId);
        Meteor.users.upsert({_id: this.userId}, {
            $set: {
                "profile.login.status": 'offline',
                "profile.login.lastLogout": new Date()
            }
        })
    }
});
