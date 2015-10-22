/**
 * Created by daniel on 17.08.15.
 */

Meteor.publish('testColl', function () {
    return TestColl.find();
});

Meteor.publish('articlesForWikiCategory', function(category){
    var sel,
        opt,
        user,
        wiki;
    //"scopeSelected" : { "type" : "org" , "id" : "PuWMyGkFrTyh7wmXT" , "name" : "c.pl"}
    user = Meteor.users.findOne(this.userId);
    wiki = Wiki.findOne({'secure.scope.id': user.profile.scopeSelected.id});

    sel = {
        'secure.category': category,
        'secure.wiki.id': wiki._id,
        'secure.scope.id': user.profile.scopeSelected.id
    };
    opt = {fields: {secure: 0}};

    console.log('pub articleForWikiCategory',sel, opt,  WikiArticle.find(sel, opt).count());
    //Meteor._sleepForMs(3000);
    return WikiArticle.find(sel,opt);
});
