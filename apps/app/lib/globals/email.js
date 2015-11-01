/**
 * Created by daniel on 23.09.15.
 */

if (typeof MyApp === 'undefined') {
    MyApp = {}
}

MyApp.email = {};

if (Meteor.isServer) {
    MyApp.email.invitation = {
        contentText (type, url) {
            "use strict";
            return `You have been invited to participate in ${type}. Click in this link ${url} to join`
        },
        subject (type) {
            "use strict";
            return `Invitation from ${type}`
        }
    }
}

