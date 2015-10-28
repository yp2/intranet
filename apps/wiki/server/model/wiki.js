/**
 * Created by daniel on 16.08.15.
 */
Meteor.publish('scopeWiki', function(scopeSelectedId) {
    var sel,
        opt;

    if (this.userId) {
        var user = Meteor.users.findOne(this.userId);

        if (user.profile.scopeSelected.id === scopeSelectedId) {
            sel = {'secure.scope.id': scopeSelectedId};
            opt = {fields: {secure: 0}};

            console.log("pub scopeWiki", sel, opt, Wiki.find(sel, opt).count());
            //Meteor._sleepForMs(4000);
            return Wiki.find(sel, opt)
        }
    }

})
