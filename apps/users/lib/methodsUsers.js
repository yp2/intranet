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

        this.unblock();

        if (Meteor.isServer){
            console.log(this.connection.httpHeaders.host);
            Email.send({
                from: 'admin@intranet.pl',
                to: 'daniel.derezinski@gmail.com',
                subject: 'test',
                text: 'adsasd'
            })
        }

        return true;

    }
})
