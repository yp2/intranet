/**
 * Created by daniel on 16.08.15.
 */
Meteor.publish('userScopes', function () {
    var sel = {},
        opt = {};

    if (this.userId) {
        sel.allowedUsers= this.userId;
        opt.fields = {secure:0};

        console.log('pub userScopes:', UserScope.find(sel, opt).count());
        return UserScope.find(sel, opt)
    }
});
