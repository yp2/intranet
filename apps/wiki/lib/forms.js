/**
 * Created by daniel on 06.10.15.
 */

"use strict";
let articleFormFields = {
    title: {
        validators : [yfValidators.required],
        type: String
    }
};

MyApp.articleForm = new yfForm(articleFormFields, WikiArticle);

if (Meteor.isClient){
    Template.registerHelper("articleForm", function () {
        return MyApp.articleForm
    })
}
