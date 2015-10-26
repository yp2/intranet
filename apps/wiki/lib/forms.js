/**
 * Created by daniel on 06.10.15.
 */

"use strict";

//let lengthValidator = (function (length) {
//    return function (value) {
//        if (value.length >= length){
//            return value
//        }
//        throw new Meteor.Error('validation', "To short");
//    }
//
//})(20);


let articleFormFields = {
    title: new yfInputField( {
        validators : [yfValidators.required],
        type: String
    }),
    content: new yfTextAreaField({
        validators: [yfValidators.required],
        type: String
    })
};

MyApp.articleForm = new yfForm(articleFormFields, "WikiArticle");

if (Meteor.isClient){
    Template.registerHelper("articleForm", function () {
        return MyApp.articleForm
    })
}
