/**
 * Created by daniel on 26.10.15.
 */

"use strict";

let projectFormFields = {
    title: new yfInputField({
        validators : [yfValidators.required],
        type: String,
    }),
    description: new yfTextAreaField({
        validators: [yfValidators.required],
        type: String,
    })
}

MyApp.projectForm = new yfForm(projectFormFields, 'Project');

if (Meteor.isClient) {
    Template.registerHelper('projectForm', function () {
        return MyApp.projectForm;
    })
}
