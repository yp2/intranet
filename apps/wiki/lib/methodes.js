/**
 * Created by daniel on 17.08.15.
 */

var wikiAction = {
    checkUserWiki: function (user) {
        var scopeSelected,
            wiki;
        if (Meteor.isServer) {
            scopeSelected = UserScope.findOne({_id: user.profile.scopeSelected.id, 'secure.allowedUsers': user._id});
        } else {
            scopeSelected = UserScope.findOne({_id: user.profile.scopeSelected.id, 'allowedUsers': user._id});
        }
        if (!scopeSelected) {
            throw new Meteor.Error(403, 'Not allowed to add category')
        }

        if (Meteor.isServer) {
            wiki = Wiki.findOne({_id: scopeSelected.wiki.id, 'secure.scope.id': scopeSelected._id});
        } else {
            wiki = Wiki.findOne({_id: scopeSelected.wiki.id, 'scope.id': scopeSelected._id});
        }

        if (!wiki){
            throw new Meteor.Error(404, "Wiki doesn't exists")
        }
        return {scopeSelected: scopeSelected, wiki:wiki}
    }
}

Meteor.methods({
    addWikiCategory: function (categoryData) {
        check(categoryData, {
            name: String
        });

        var user,
            wiki,
            checkResult;

        user = Meteor.users.findOne(this.userId);

        if (categoryData.name.length === 0) {
            throw new Meteor.Error(500, 'Empty category name');
        }

        checkResult = wikiAction.checkUserWiki(user);
        wiki = checkResult.wiki;

        if(Meteor.isServer && _.contains(wiki.secure.categories, categoryData.name)) {
            throw  new Meteor.Error(303, "Category exists")
        } else if (Meteor.isClient && _.contains(wiki.categories, categoryData.name)) {
            throw  new Meteor.Error(303, "Category exists")
        }

        Wiki.upsert({_id: wiki._id}, {
            $push:{categories: categoryData.name, 'secure.categories': categoryData.name}
        });
        
        return true
    },
    deleteCategory: function(data, category) {
        console.log(data, category);
        if (category !== 'main') {
            throw new Meteor.Error(400, "Can't delete category not in main category")
        }
        if (!data.category || !data.category.length) {
            throw new Meteor.Error(400, "You must supply category name");
        }
        var user,
            wiki,
            checkResult;

        user = Meteor.users.findOne(this.userId);

        checkResult = wikiAction.checkUserWiki(user);

        wiki = checkResult.wiki;

        //TODO: can't delete categories with articles


        if(Meteor.isServer && !_.contains(wiki.secure.categories, data.category)) {
            throw  new Meteor.Error(303, "Category doesn't exists")
        } else if (Meteor.isClient && !_.contains(wiki.categories, data.category)) {
            throw  new Meteor.Error(303, "Category doesn't exists")
        }

        Wiki.update({_id: wiki._id}, {
            $pull:{categories: data.category, 'secure.categories': data.category}
        });

        return true
    }
});
