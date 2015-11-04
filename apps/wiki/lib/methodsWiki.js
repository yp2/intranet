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
            throw new Meteor.Error(403, 'Not allowed to add/edit category')
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
    checkProjectWiki: function (user, projectId) {
        var project, wiki;

        if (Meteor.isServer) {
            project = Project.findOne({
                _id: projectId,
                $or: [{'secure.allowedUsers': user._id}, {"secure.admin.id": user._id}]
            });
        } else {
            project = Project.findOne({_id: projectId, $or: [{'allowedUsers': user._id}, {"admin.id": user._id}]});
        }

        if (!project) {
            throw new Meteor.Error(403, "Not allowed to add/edit category");
        }

        if (Meteor.isServer) {
            wiki = Wiki.findOne({'secure.project.id': project._id});
        } else {
            wiki = Wiki.findOne({'project.id': project._id});
        }

        if (!wiki) {
            throw new Meteor.Error(404, "Wiki doesn't exists");
        }

        return {wiki: wiki, project: project}
    },
    wikiCategoryCheck: function (data) {
        var category = data.category;
        var wiki = data.wiki;

        if (!category || !category.length) {
            throw new Meteor.Error(400, "You must supply category name");
        }

        if (Meteor.isServer && !lodash.find(wiki.secure.categories, lodash.matches({title: category}))) {
            throw  new Meteor.Error(303, "Category doesn't exists")
        } else if (Meteor.isClient && !_.find(wiki.categories, _.matches({title: category}))) {
            throw  new Meteor.Error(303, "Category doesn't exists")
        }
        return true

    },
    wikiCategoryExistCheck: function (data) {
        var categoryTitle = data.title,
            wiki = data.wiki;
        if (Meteor.isServer && lodash.find(wiki.secure.categories, lodash.matches({title: categoryTitle}))) {
            throw  new Meteor.Error(303, "Category exists")
        } else if (Meteor.isClient && _.find(wiki.categories, _.matches({title: categoryTitle}))) {
            throw  new Meteor.Error(303, "Category exists")
        }
        return true
    },
    wikiArticleCheck: function (data) {
        var articleId = data.articleId,
            wikiId = data.wikiId,
            scopeId = data.scopeId,
            projectId = data.projectId,
            article;
        if (Meteor.isServer) {

            if (projectId) {
                article = WikiArticle.findOne({
                    _id: articleId,
                    "secure.wiki.id": wikiId,
                    'secure.project.id': projectId
                })
            } else {
                article = WikiArticle.findOne({_id: articleId, "secure.wiki.id": wikiId, 'secure.scope.id': scopeId})
            }
            if (!article) {
                throw new Meteor.Error(404, "Article not found")
            }
        } else {
            if (projectId) {
                article = WikiArticle.findOne({_id: articleId, "wiki.id": wikiId, 'project.id': projectId})
            } else {
                article = WikiArticle.findOne({_id: articleId, "wiki.id": wikiId, 'scope.id': scopeId})
            }

            if (!article) {
                console.log('404, "Article not found"');
                throw new Meteor.Error(404, "Article not found");
            }
        }
        return article
    }
};

Meteor.methods({
    addWikiCategory: function (categoryData) {
        check(categoryData, {
            title: String,
            projectId: Match.Optional(String)
        });

        var user,
            wiki,
            checkResult;

        user = Meteor.users.findOne(this.userId);

        if (categoryData.title.length === 0) {
            throw new Meteor.Error(500, 'Empty category name');
        }

        if (categoryData.hasOwnProperty('projectId')) {
            wiki = MyApp.wikiAction.checkProjectWiki(user, categoryData.projectId).wiki
        } else {
            checkResult = MyApp.wikiAction.checkUserWiki(user);
            wiki = checkResult.wiki;
        }


        MyApp.wikiAction.wikiCategoryExistCheck({title: categoryData.title, wiki: wiki});
        //if (Meteor.isServer && lodash.find(wiki.secure.categories, lodash.matches({title: categoryData.title}))) {
        //    throw  new Meteor.Error(303, "Category exists")
        //} else if (Meteor.isClient && _.find(wiki.categories, _.matches({title: categoryData.title}))) {
        //    throw  new Meteor.Error(303, "Category exists")
        //}

        var newCategory = {
            title: categoryData.title,
            titleSlug: s.slugify(categoryData.title)
        };

        Wiki.upsert({_id: wiki._id}, {
            $addToSet: {categories: newCategory, 'secure.categories': newCategory}
        });

        return true
    },
    editWikiCategory: function (data) {
        check(data, {
            title: String,
            wikiId: String,
            newTitle: String,
            projectId: Match.Optional(String)
        });

        var user,
            wiki,
            checkResult;

        user = Meteor.users.findOne(this.userId);

        if (!data.newTitle.length) {
            throw new Meteor.Error(500, "You must supply category name");
        }

        if (data.hasOwnProperty('projectId')) {
            wiki = MyApp.wikiAction.checkProjectWiki(user, data.projectId).wiki
        } else {
            checkResult = MyApp.wikiAction.checkUserWiki(user);
            wiki = checkResult.wiki;
        }


        MyApp.wikiAction.wikiCategoryCheck({category: data.title, wiki: wiki});
        MyApp.wikiAction.wikiCategoryExistCheck({title: data.newTitle, wiki: wiki});


        Wiki.update({
                _id: wiki._id,
                "secure.categories.title": data.title,
                'categories.title': data.title
            },
            {
                $set: {
                    "secure.categories.$.title": data.newTitle,
                    'secure.categories.$.titleSlug': s.slugify(data.newTitle),
                    'categories.$.title': data.newTitle,
                    'categories.$.titleSlug': s.slugify(data.newTitle)
                }
            });

        if (Meteor.isServer) {
            WikiArticle.update({
                'secure.wiki.id': wiki._id,
                "secure.category": data.title
            },{
                $set: {
                    'secure.category': data.newTitle,
                    'category': data.newTitle
                }
            })
        }

        return true
    },

    deleteCategory: function (data, category) {
        console.log(data, category);
        if (category !== 'main') {
            throw new Meteor.Error(400, "Can't delete category not in main category")
        }
        if (data.category === "main") {
            throw new Meteor.Error(500, "Can't dalete main category");
        }
        //if (!data.category || !data.category.length) {
        //    throw new Meteor.Error(400, "You must supply category name");
        //}
        var user,
            wiki,
            checkResult;

        user = Meteor.users.findOne(this.userId);

        if (data.hasOwnProperty('projectId')) {
            wiki = MyApp.wikiAction.checkProjectWiki(user, data.projectId).wiki
        } else {
            checkResult = MyApp.wikiAction.checkUserWiki(user);
            wiki = checkResult.wiki;
        }

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
            $pull: {categories: {title: data.category}, "secure.categories": {title: data.category}}

        });

        return true
    },
    addArticle: function (data) {
        check(data, {
            category: String,
            projectId: Match.Optional(String)
        });

        var category = data.category,
            user = Meteor.users.findOne(this.userId),
            checkResult,
            wiki,
            scope,
            project;


        var artFields = {
            title: "New Title",
            content: "New Article",
            status: 'draft',
            author: {
                id: user._id,
                username: user.username
            },
            tags: [],
            category: category
        };

        if (data.hasOwnProperty('projectId')) {
            checkResult = MyApp.wikiAction.checkProjectWiki(user, data.projectId);
            console.log('aaaa', wiki);
            wiki = checkResult.wiki;
            project = checkResult.project;
            _.extend(artFields, {
                wiki: {
                    id: wiki._id,
                    type: wiki.type
                },
                project: {
                    id: project._id,
                    title: project.title
                }
            })
        } else {
            checkResult = MyApp.wikiAction.checkUserWiki(user);
            wiki = checkResult.wiki;
            scope = checkResult.scopeSelected;
            _.extend(artFields, {
                wiki: {
                    id: wiki._id,
                    type: wiki.type
                },
                scope: {
                    id: scope._id,
                    name: scope.name
                }
            })
        }

        MyApp.wikiAction.wikiCategoryCheck({category: data.category, wiki: wiki});

        var artSecure = {secure: {}};
        _.extend(artSecure.secure, artFields);

        artFields.secure = artSecure.secure;

        return WikiArticle.insert(artFields);
    },
    saveArticleContent: function (data) {
        check(data, {
            id: String,
            content: String,
            projectId: Match.Optional(String)

        });

        var user = Meteor.users.findOne(this.userId),
            checkResult,
            wiki,
            dataCheck,
            scope;

        if (data.hasOwnProperty('projectId')) {
            wiki = MyApp.wikiAction.checkProjectWiki(user, data.projectId).wiki;
            dataCheck = {articleId: data.id, wikiId: wiki._id, projectId: data.projectId};
        } else {
            checkResult = MyApp.wikiAction.checkUserWiki(user);
            wiki = checkResult.wiki;
            scope = checkResult.scopeSelected;
            dataCheck = {articleId: data.id, wikiId: wiki._id, scopeId: scope._id};
        }

        MyApp.wikiAction.wikiArticleCheck(dataCheck);

        WikiArticle.update({_id: data.id}, {$set: {content: data.content, 'secure.content': data.content}})

        return true
    },
    saveArticleTitle: function (obj, value) {

        var user = Meteor.users.findOne(this.userId),
            checkResult,
            wiki,
            scope,
            title = value,
            dataCheck,
            titleSlug = s.slugify(title);

        if (obj.hasOwnProperty('project')) {
            var project = Project.findOne({_id: obj.project.id});
            if (Meteor.isServer) {
                if (!project || (project && _.includes(project.secure.allowedUsers))) {
                    throw new Meteor.Error(403, "You can't edit article");
                }
            } else {
                if (!project || (project && _.includes(project.allowedUsers))) {
                    throw new Meteor.Error(403, "You can't edit article");
                }
            }
        }

        if (obj.hasOwnProperty('project')) {
            wiki = MyApp.wikiAction.checkProjectWiki(user, obj.project.id).wiki;
            dataCheck = {articleId: obj._id, wikiId: wiki._id, projectId: obj.project.id};
        } else {
            checkResult = MyApp.wikiAction.checkUserWiki(user);
            wiki = checkResult.wiki;
            scope = checkResult.scopeSelected;
            dataCheck = {articleId: obj._id, wikiId: wiki._id, scopeId: scope._id};
        }

        MyApp.wikiAction.wikiArticleCheck(dataCheck);

        if (Meteor.isServer) {
            WikiArticle.update({_id: obj._id}, {
                $set: {
                    title: title,
                    titleSlug: titleSlug,
                    'secure.title': title,
                    'secure.titleSlug': titleSlug
                }
            });
        } else {
            WikiArticle.update({_id: obj._id}, {$set: {title: title, titleSlug: titleSlug}});
        }

        return true;
    },

    saveObjFormMethod: function (dataForMethod) {
        "use strict";

        if (Meteor.isServer) {
            throw new Meteor.Error('save', {field: 'content', reason: 'to Long'});
            global[dataForMethod.collection].insert(dataForMethod.fieldsValues);
        } else {
            window[dataForMethod.collection].insert(dataForMethod.fieldsValues);

        }
        return true

    },

    saveArticleFormMethod: function (dataForMethod) {
        console.log('in save method a');

        //todo server side validation;

        var title = dataForMethod.fieldsValues.title,
            titleSlug = s.slugify(title),
            content = dataForMethod.fieldsValues.content,
            obj = dataForMethod.obj;

        //throw new Meteor.Error('save', {field: 'title', reason: "exist"});

        if (Meteor.isServer) {
            WikiArticle.update({_id: obj._id}, {
                $set: {
                    title: title,
                    titleSlug: titleSlug,
                    content: content,
                    'secure.title': title,
                    'secure.titleSlug': titleSlug,
                    'secure.content': content
                }
            });
        } else {
            WikiArticle.update({_id: obj._id}, {$set: {title: title, titleSlug: titleSlug, content: content}});
        }
        return true;
    },

    saveArticleTitleNew: function (obj, value) {
        //check(data, {
        //    id: String,
        //    title: String
        //});

        var user = Meteor.users.findOne(this.userId),
            checkResult,
            wiki,
            scope,
            title = value,
            titleSlug = s.slugify(title);

        checkResult = MyApp.wikiAction.checkUserWiki(user);
        wiki = checkResult.wiki;
        scope = checkResult.scopeSelected;

        MyApp.wikiAction.wikiArticleCheck({articleId: obj._id, wikiId: wiki._id, scopeId: scope._id});

        if (Meteor.isServer) {
            WikiArticle.update({_id: obj._id}, {
                $set: {
                    title: title,
                    titleSlug: titleSlug,
                    'secure.title': title,
                    'secure.titleSlug': titleSlug
                }
            });
        } else {
            WikiArticle.update({_id: obj._id}, {$set: {title: title, titleSlug: titleSlug}});
        }

        return true
    },
    publishArticle: function (data) {
        check(data, {
            id: String,
            projectId: Match.Optional(String)
        });

        var user = Meteor.users.findOne(this.userId),
            checkResult,
            wiki,
            scope,
            modifier,
            dataCheck,
            article;

        if (data.hasOwnProperty('projectId')) {
            wiki = MyApp.wikiAction.checkProjectWiki(user, data.projectId).wiki;
            dataCheck = {articleId: data.id, wikiId: wiki._id, projectId: data.projectId};
        } else {
            checkResult = MyApp.wikiAction.checkUserWiki(user);
            wiki = checkResult.wiki;
            scope = checkResult.scopeSelected;
            dataCheck = {articleId: data.id, wikiId: wiki._id, scopeId: scope._id};
        }

        //checkResult = MyApp.wikiAction.checkUserWiki(user);
        //wiki = checkResult.wiki;

        article = MyApp.wikiAction.wikiArticleCheck(dataCheck);

        if (article.status === "published") {
            modifier = {status: 'draft', 'secure.status': 'draft'}
        } else {
            modifier = {status: 'published', 'secure.status': 'published'}
        }

        WikiArticle.update({_id: data.id}, {$set: modifier});

        return modifier.status;
    },
    deleteArticle: function (data) {
        //article can delete: owner and admin of wiki or scope
        check(data, {
            id: String,
            projectId: Match.Optional(String)
        });

        var user = Meteor.users.findOne(this.userId),
            wiki,
            article,
            checkResult,
            dataCheck,
            scope;

        if (data.hasOwnProperty('projectId')) {
            wiki = MyApp.wikiAction.checkProjectWiki(user, data.projectId).wiki;
            dataCheck = {articleId: data.id, wikiId: wiki._id, projectId: data.projectId};
        } else {
            checkResult = MyApp.wikiAction.checkUserWiki(user);
            wiki = checkResult.wiki;
            scope = checkResult.scopeSelected;
            dataCheck = {articleId: data.id, wikiId: wiki._id, scopeId: scope._id};
        }

        article = MyApp.wikiAction.wikiArticleCheck(dataCheck);

        if (Meteor.isServer) {
            if (article.secure.author.id === user._id ||
                MyApp.user.isScopeAdmin(user, scope) ||
                MyApp.user.isWikiAdmin(user, wiki)) {
                WikiArticle.remove({_id: article._id});
            } else {
                throw new Meteor.Error(500, "You can't delete this article");
            }
        } else if (Meteor.isClient) {
            if (article.author.id === user._id ||
                MyApp.user.isScopeAdmin(user, scope) ||
                MyApp.user.isWikiAdmin(user, wiki)) {
                WikiArticle.remove({_id: article._id});
            } else {
                throw new Meteor.Error(500, "You can't delete this article");
            }
        }
        return true
    }
});

