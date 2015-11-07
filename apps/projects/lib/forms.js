/**
 * Created by daniel on 26.10.15.
 */

"use strict";


let projectFormFields = {
    title: new yfInputField({
        validators : [yfValidators.required],
        saveSuccess: function () {console.log('save success');},
        type: String
    }),
    description: new yfTextAreaField({
        validators: [yfValidators.required],
        type: String
    })
}

let formSuccessSave = [
    function (t) {
        //t.$("form")[0].reset();
        $("#confirmModaladdProject").modal('hide');
        sAlert.addSuccess("Project added")
    }
]

MyApp.projectForm = new yfForm(projectFormFields, 'Project',[],[], formSuccessSave);

if (Meteor.isClient) {
    Template.registerHelper('projectForm', function () {
        return MyApp.projectForm;
    })
}

let projectAddUserFields = {
    email: new yfInputField({
        validators: [yfValidators.required, yfValidators.email],
        type: String
    })

}

let addUserSuccessSave = [
    function (t) {
        console.log('in callback');
        t.$("form")[0].reset();
        $("#confirmModalprojectAddUser").modal('hide');
    }
];

MyApp.projectAddUserForm = new yfForm(projectAddUserFields, 'Project',[],[], addUserSuccessSave);

if (Meteor.isClient) {
    Template.registerHelper('projectAddUserForm', function () {
        return MyApp.projectAddUserForm;
    })
}

let talksField = {
    title: new yfInputField({
        validators: [yfValidators.required],
        successCallbacks: [],
        errorCallbacks: [],
        successSaveCallbacks: [],
        errorSaveCallbacks: []
    }),
    content: new yfTextAreaField({
        validators: [yfValidators.required],
        successCallbacks: [],
        errorCallbacks: [],
        successSaveCallbacks: [],
        errorSaveCallbacks: []
    })
};

MyApp.projectAddTalk = new yfForm(talksField, "Talks");

if (Meteor.isClient) {
    Template.registerHelper('addTalkForm', function () {
        return MyApp.projectAddTalk;
    })
}
