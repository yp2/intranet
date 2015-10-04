/**
 * Created by daniel on 04.10.15.
 */

yfUtils = {
    procParams (params) {
        "use strict";

        if (typeof params.obj === "undefined") {
            params.obj = Template.parentData()
        }
        console.log('utils', params, Template.instance());
    },
    fieldParams (params) {
        "use strict";

        Match.test(params.field, String);

        let stdClasses = ' form-control yfForms';
        this.procParams(params);

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
}

}
