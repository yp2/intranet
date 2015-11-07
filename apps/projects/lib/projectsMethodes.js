/**
 * Created by daniel on 26.10.15.
 */
"use strict";

MyApp.project = {
    allowedUsers (userId, projectId) {
        let user = Meteor.users.findOne(userId);
        let project = Project.findOne(projectId);


        if (Meteor.isServer && (!user || !project || (!_.includes(project.secure.allowedUsers, user._id)) || project.secure.admin.id !== user._id)) {
            throw new Meteor.Error(403, "You're not allowed");
        }
        if (Meteor.isClient && (!user || !project || (!_.includes(project.allowedUsers, user._id)) || project.admin.id !== user._id)) {
            throw new Meteor.Error(403, "You're not allowed");
        }
        return {user: user, project: project}
    }
}

Meteor.methods({
    removeUserFromProject (data) {
        check(data, {
            userId: String,
            projectId: String
        });
        
        let project = Project.findOne(data.projectId);
        if (Meteor.isServer) {
            
            if (!project || (!_.includes(project.secure.allowedUsers, this.userId) && project.secure.admin.id !== this.userId) ) {
                console.log('cant delete');
                throw new Meteor.Error(403, "Can't remove user from project");
            }
            Project.update({_id: project._id}, {$pull :{"secure.allowedUsers": data.userId, allowedUsers: data.userId}})
            return true;
        }


    },
    addNewProject (data) {
        let fields = data.fieldsValues;

        MyApp.projectForm.serverValidateForm(fields);

        check(fields, {
            title: String,
            description: String
        });


        let user = Meteor.users.findOne(this.userId),
            scope = UserScope.findOne({_id: user.profile.scopeSelected.id});

        // TODO: permissions to add project
        let projectId;

        if (Meteor.isServer) {
            let objData = {
                title: fields['title'],
                description: fields['description'],
                titleSlug: s.slugify(fields['title']),
                scope: {
                    name: scope.name,
                    id: scope._id,
                    type: scope.secure.type
                },
                allowedUsers: [user._id],
                admin: {
                    username: scope.secure.admin.name,
                    id: scope.secure.admin.id
                }
            };

            projectId = Project.insert(_.extend({secure: objData}, objData));

            let wikiData = {
                type: 'pro',
                admin: {
                    username: scope.secure.admin.name,
                    id: scope.secure.admin.id
                },
                project: {
                    title: fields['title'],
                    id: projectId
                },
                categories: [{title: "main", titleSlug: "main"}]
            };

            Wiki.insert(_.extend({secure: wikiData}, wikiData));

        }
        return projectId
    },
    editProject(obj, value, fieldName) {
        console.log(obj, value, fieldName);

        let checkAllow = MyApp.project.allowedUsers(this.userId, obj._id),
            user, project, setObj = {};

        user = checkAllow.user;
        project = checkAllow.project;

        setObj[fieldName] = value;
        setObj[`secure.${fieldName}`] = value;

        Project.update({_id: project._id}, {$set: setObj})

        return true;
    },
    deleteProject(data) {
        check(data, {
            projectId: String
        })

        let checkAllow = MyApp.project.allowedUsers(this.userId, data.projectId);
        let project = checkAllow.project;

        let wikiForProject = Wiki.findOne({"project.id": project._id});
        let articlesCount = WikiArticle.find({"wiki.id": wikiForProject._id}).count();

        if (articlesCount) {
            throw new Meteor.Error(403, "There are articles in wiki, can't delete project")
        }

        let result = Project.remove({_id: project._id});
        Wiki.remove({_id: wikiForProject._id});

        return true;
    },
    addTalk(dataFromForm) {
        console.log('addTalk', dataFromForm);
    }
})

