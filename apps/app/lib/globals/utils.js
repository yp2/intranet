/**
 * Created by daniel on 21.09.15.
 */
if (typeof MyApp === 'undefined' ) {
    MyApp = {}
}

MyApp.forms = {
    serialize: function (form) {
        // id, class or e.currentTarget
        var formParams = {};
        $(form).serializeArray().forEach(function(item) {
            if (formParams[item.name]) {
                formParams[item.name] = [formParams[item.name]];
                formParams[item.name].push(item.value)
            } else {
                formParams[item.name] = item.value
            }
        });
        return formParams;
    }
};
