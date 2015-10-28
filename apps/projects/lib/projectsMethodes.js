/**
 * Created by daniel on 26.10.15.
 */
"use strict";

Meteor.methods({
    addNewProject (data) {
        let fields = data.fieldsValues;



        MyApp.projectForm.serverValidateForm(fields);

        check(fields, {
            title: String,
            description: String
        })


        let user = Meteor.users.findOne(this.userId),
            scope = UserScope.findOne({_id: user.profile.scopeSelected.id});

        // TODO: permissions to add project
        let projectId;

        if (Meteor.isServer) {
            let objData = {
                title: fields['title'],
                description: fields['description'],
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

            _.extend({secure: objData}, objData);
            projectId = Project.insert(_.extend({secure: objData}, objData))

        }

        return projectId

    }
})
