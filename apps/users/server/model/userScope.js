/**
 * Created by daniel on 16.08.15.
 */
Meteor.publish('userScopes', function () {
    var sel = {},
        opt = {};

    sel.allowedUsers= this.userId;
    opt.fields = {_id: 1, name: 1, type: 1};

    console.log('pub userScopes:', UserScope.find(sel, opt).count());
    return UserScope.find(sel, opt)
});
