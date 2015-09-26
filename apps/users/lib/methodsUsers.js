/**
 * Created by daniel on 21.09.15.
 */
Meteor.methods({
    inviteUser: function (data) {
        check(data, {
            invitedUserEmail: String
        });

        var email = data.invitedUserEmail;

        if (!MyApp.validateEmail(email)) {
            throw new Meteor.Error(406, "Incorrect email address");
        }


        if (Meteor.isServer){
            console.log(this.connection.httpHeaders.host);
            console.log(HijackEmail({
                from: 'admin@intranet.pl',
                to: email,
                subject: 'test',
                text: 'adsasd'
            }));

            this.unblock();
            Email.send(HijackEmail({
                from: 'admin@intranet.pl',
                to: email,
                subject: 'test',
                text: 'adsasd'
            }))
        }

        return true;

    }
})
