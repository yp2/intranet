/**
 * Created by daniel on 16.08.15.
 */
Meteor.publish('scopeWiki', function(category) {
    var sel,
        opt,
        user = Meteor.users.findOne({_id: this.userId});

    sel = {'secure.scope.id': user.profile.scopeSelected.id};
    opt = {fields: {secure: 0}};

    if (category !== 'main'){
        console.log('too');
        _.extend(sel, {'secure.categories': category})
    }

    console.log("pub scopeWiki", sel, opt, Wiki.find(sel, opt).count());
    return Wiki.find(sel, opt)

})
