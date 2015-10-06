/**
 * Created by daniel on 04.10.15.
 */

yfUtils = {
    fieldParams (params) {
        "use strict";
        
        if (!params.field || !Match.test(params.field, String)) {
            throw new Meteor.Error(404, "Field name not set");
        }

        if (typeof params.obj === "undefined") {
            if (! Template.parentData().data ) {
                throw new Meteor.Error(404, "No object defined");
            }
            params.obj = Template.parentData().data.obj;
        }

        if (typeof params.obj === "undefined") {
            throw new Meteor.Error(404, "No object defined");
        }

        let stdClasses = ' form-control yfForms';

        let flParams = {
            "class": params.class ? params.class + stdClasses: stdClasses,
            "placeholder": params.placeholder || null,
            "id": params.id || null,
            "type": params.type || "text",
            "readonly": params.readonly ? (params.readonly ? "" : null) : null,
            "disabled": params.disabled ? (params.disabled ? "" : null) : null
        };

        flParams['value'] = this.getFieldValue(params.field, params.obj );

        if (params.fieldData) {
            for (var key in fieldData) {
                params['data-' + key] = params.fieldData[key];
            }
        }

        return flParams
    },
    getFieldValue (field, obj) {
        "use strict";
        let spField = field.split(".");
        while(spField.length && (obj = obj[spField.shift()]));
        return obj;
    },
    saveField (t,value) {
        "use strict";

        let field = null;

        if (typeof t.data.form !== 'undefined') {
            field = t.data.form.fields[t.data.field];
        }

        if (typeof t.data.method !== "undefined") {
            Meteor.call(t.data.method, t.data.obj, value, function(error, result) {
                if (error) {
                    // error save callback
                    if (field) {
                        yfUtils.runFieldCallbacks(t, field.saveErrorCallbacks)
                    }

                    t.fieldError.set(error);
                }
                if (result) {
                    // save success callback
                    if (field) {
                        yfUtils.runFieldCallbacks(t, field.saveSuccessCallbacks)
                    }
                }
            })
        } else {
            console.log("No save method defined for field ",t.data.field);
        }
    },
    runFieldCallbacks (t, callbacks) {
        "use strict";
        callbacks.forEach(function (callback) {
            callback(t);
        })
    },
    procField (e,t) {
        "use strict";
        t.fieldError.set(null);

        // value from field
        let val = t.$(e.currentTarget).val();

        if (typeof t.data.form !== "undefined") {
            let field = t.data.form.fields[t.data.field];
            try {
                val = t.data.form.validateField(t.data.field, val);

                yfUtils.saveField(t, val);
                // validate success callbacks
                yfUtils.runFieldCallbacks(t, field.successCallbacks);

            } catch (error) {
                // validate error callback
                yfUtils.runFieldCallbacks(t, field.errorCallbacks);

                t.fieldError.set(error)
            }
        } else {
            // no form class no field validation and callbacks
            yfUtils.saveField(t, val);
        }

    }

}
