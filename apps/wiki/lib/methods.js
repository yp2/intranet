/**
 * Created by daniel on 17.08.15.
 */

MyApp.wikiAction = {
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

        if (!wiki) {
            throw new Meteor.Error(404, "Wiki doesn't exists")
        }
        return {scopeSelected: scopeSelected, wiki: wiki}
    },
    wikiCategoryCheck: function (data) {
        var category = data.category;
        var wiki = data.wiki;

        if (!category || !category.length) {
            throw new Meteor.Error(400, "You must supply category name");
        }

        if (Meteor.isServer && !_.contains(wiki.secure.categories, category)) {
            throw  new Meteor.Error(303, "Category doesn't exists")
        } else if (Meteor.isClient && !_.contains(wiki.categories, category)) {
            throw  new Meteor.Error(303, "Category doesn't exists")
        }

    },
    wikiArticleCheck: function (data) {
        var articleId = data.articleId,
            wikiId = data.wikiId,
            scopeId = data.scopeId,
            article;

        if (Meteor.isServer){
            article = WikiArticle.findOne({_id: articleId, "secure.wiki.id": wikiId, 'secure.scope.id': scopeId})
        } else {
            article = WikiArticle.findOne({_id: articleId, "wiki.id": wikiId, 'scope.id': scopeId})
        }
        if(!article) {
            throw new Meteor.Error(404, "Article not found")
        }
        return article
    }
};

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

        checkResult = MyApp.wikiAction.checkUserWiki(user);
        wiki = checkResult.wiki;

        if (Meteor.isServer && _.contains(wiki.secure.categories, categoryData.name)) {
            throw  new Meteor.Error(303, "Category exists")
        } else if (Meteor.isClient && _.contains(wiki.categories, categoryData.name)) {
            throw  new Meteor.Error(303, "Category exists")
        }

        Wiki.upsert({_id: wiki._id}, {
            $push: {categories: categoryData.name, 'secure.categories': categoryData.name}
        });

        return true
    },
    deleteCategory: function (data, category) {
        console.log(data, category);
        if (category !== 'main') {
            throw new Meteor.Error(400, "Can't delete category not in main category")
        }
        //if (!data.category || !data.category.length) {
        //    throw new Meteor.Error(400, "You must supply category name");
        //}
        var user,
            wiki,
            checkResult;

        user = Meteor.users.findOne(this.userId);

        checkResult = MyApp.wikiAction.checkUserWiki(user);

        wiki = checkResult.wiki;

        //TODO: can't delete categories with articles

        MyApp.wikiAction.wikiCategoryCheck({category: data.category, wiki: wiki});

        var artCount;
        if (Meteor.isServer) {
            artCount = WikiArticle.find({
                'secure.wiki.id': wiki._id,
                'secure.category': data.category
            }).count()
        } else {
            artCount = WikiArticle.find({
                'wiki.id': wiki._id,
                category: data.category
            }).count()
        }

        if (artCount) {
            throw new Meteor.Error(200, "Can't delete category. Articles exist for category.");
        }

        Wiki.update({_id: wiki._id}, {
            $pull: {categories: data.category, 'secure.categories': data.category}
        });

        return true
    },
    addArticle: function (data) {
        check(data, {
            category: String
        });

        var category = data.category,
            user = Meteor.users.findOne(this.userId),
            checkResult,
            wiki,
            scope;

        //if (!category || !category.length) {
        //    throw new Meteor.Error(400, "You must supply category name");
        //}


        checkResult = MyApp.wikiAction.checkUserWiki(user);
        wiki = checkResult.wiki;
        scope = checkResult.scopeSelected;

        if (category === 'main') {
            if (Meteor.isServer) {
                wiki.secure.categories.push('main')
            } else {
                wiki.categories.push('main')
            }
        }

        if (Meteor.isServer && !_.contains(wiki.secure.categories, category)) {
            throw  new Meteor.Error(303, "Category doesn't exists")
        } else if (Meteor.isClient && !_.contains(wiki.categories, category)) {
            throw  new Meteor.Error(303, "Category doesn't exists")
        }

        var artFields = {
            title: "New Title",
            content: "New Article",
            status: 'draft',
            author: {
                id: user._id,
                username: user.username
            },
            wiki: {
                id: wiki._id,
                type: wiki.type
            },
            scope: {
                id: scope._id,
                name: scope.name
            },
            tags: [],
            category: category
        };
        var artSecure = {secure: {}};
        _.extend(artSecure.secure , artFields);

        artFields.secure = artSecure.secure;
        
        console.log(artFields);
        return WikiArticle.insert(artFields);
    },
    saveArticleContent: function (data) {
        check(data, {
            id: String,
            content: String
        });

        var user = Meteor.users.findOne(this.userId),
            checkResult,
            wiki,
            scope;

        checkResult = MyApp.wikiAction.checkUserWiki(user);
        wiki = checkResult.wiki;
        scope = checkResult.scopeSelected;

        MyApp.wikiAction.wikiArticleCheck({articleId: data.id, wikiId: wiki._id, scopeId: scope._id});

        WikiArticle.update({_id: data.id}, {$set: {content: data.content, 'secure.content': data.content}})

        return true
    },
    saveArticleTitle: function (data) {
        check(data, {
            id: String,
            title: String
        });

        var user = Meteor.users.findOne(this.userId),
            checkResult,
            wiki,
            scope;

        checkResult = MyApp.wikiAction.checkUserWiki(user);
        wiki = checkResult.wiki;
        scope = checkResult.scopeSelected;

        MyApp.wikiAction.wikiArticleCheck({articleId: data.id, wikiId: wiki._id, scopeId: scope._id});

        WikiArticle.update({_id: data.id}, {$set: {title: data.title, 'secure.title': data.title}});

        return true
    },
    publishArticle: function(data){
        check(data, {
            id: String
        });

        var user = Meteor.users.findOne(this.userId),
            checkResult,
            wiki,
            scope,
            modifier,
            article;

        checkResult = MyApp.wikiAction.checkUserWiki(user);
        wiki = checkResult.wiki;
        scope = checkResult.scopeSelected;
        

        article = MyApp.wikiAction.wikiArticleCheck({articleId: data.id, wikiId: wiki._id, scopeId: scope._id});

        if (article.status === "published") {
            modifier = {status: 'draft', 'secure.status': 'draft'}
        } else {
            modifier = {status: 'published', 'secure.status': 'published'}
        }

        WikiArticle.update({_id:data.id}, {$set: modifier});

        return modifier.status;
    }
});
