/**
 * Created by daniel on 16.08.15.
 */
Meteor.publish('scopeWiki', function() {
    var sel,
        opt,
        user = Meteor.users.findOne({_id: this.userId});

    sel = {'secure.scope.id': user.profile.scopeSelected.id};
    opt = {fields: {secure: 0}};

    console.log("pub scopeWiki", sel, opt, Wiki.find(sel, opt).count());
    return Wiki.find(sel, opt)

})
