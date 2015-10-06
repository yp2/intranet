
// TODO: add type to EJSON
yfForm = class yfForm {
    constructor (fields, collection) {
        "use strict";
        this.fields = fields;
        this.collection = collection

    }

    valType (field, value) {
        if (typeof field.type !== "undefined") {
            if (typeof field.type() !== typeof value){
                let type = typeof field.type();
                throw new Meteor.Error(406, "Value must be ${type}");
            }
        }
        return true;
    }

    valValidators (field, value) {
        let cleanedValue = value;
        if (typeof field.validators !== "undefined") {
            field.validators.forEach(function (validator) {
                cleanedValue = validator(cleanedValue)
            })
        }
        return cleanedValue
    }

    validateField (fieldName, value) {
        let formField = this.fields[fieldName],
            validatedValue = value;
        if (typeof formField === "undefined") {
            throw new Meteor.Error(404, "No field definition");
        }
        this.valType(formField, value);
        validatedValue = this.valValidators(formField, validatedValue);
        return validatedValue;
    }
};
