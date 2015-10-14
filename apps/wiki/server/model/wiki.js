/**
 * Created by daniel on 16.08.15.
 */
Meteor.publish('scopeWiki', function(scopeSelectedId) {
    var sel,
        opt;

    sel = {'secure.scope.id': scopeSelectedId};
    opt = {fields: {secure: 0}};

    console.log("pub scopeWiki", sel, opt, Wiki.find(sel, opt).count());
    return Wiki.find(sel, opt)

})
