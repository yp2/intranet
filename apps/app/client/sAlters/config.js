Meteor.startup(function () {

    sAlert.config({
        effect: 'flip',
        position: 'top-right',
        timeout: 5000,
        html: true,
        onRouteClose: true,
        stack: true,
        offset: 91
    });

    sAlert._add = function(type, msg, title, config ) {

        var msgMsg,
            msgTitle,
            msgTitleType = {
                success: '<h4><i class="icon fa fa-check"></i> ',
                error: '<h4><i class="icon fa fa-ban"></i> '
            },
            parTitle = title || "";

        if (parTitle.length) {
            msgTitle = msgTitleType[type] + parTitle + '</h4>';
            msgMsg = msgTitle + msg
        } else {
            msgTitle = msgTitleType[type] + msg + '<h4>';
            msgMsg = msgTitle
        }

        this[type](msgMsg, config)
    };

    sAlert.addSuccess = function (msg, title, config) {
        this._add('success', msg, title, config)
    };
    sAlert.addError = function (msg, title, config) {
        this._add('error', msg, title, config)
    };

});
