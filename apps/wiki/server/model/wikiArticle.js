/**
 * Created by daniel on 17.08.15.
 */

Meteor.publish('articlesForWikiCategory', function(category){
    var sel,
        opt,
        user,
        wiki;

    user = Meteor.users.findOne(this.userId);
    wiki = Wiki.findOne({'secure.scope.id': user.profile.scopeSelected.id});

    sel = {
        'secure.category': category,
        'secure.wiki.id': wiki.id,
        'secure.scope.id': user.profile.scopeSelected.id
    };
    opt = {fields: {secure: 0}};

    console.log('pub articleForWikiCategory', WikiArticle.find(sel, opt).count());
    return WikiArticle.find(sel,opt);
});
