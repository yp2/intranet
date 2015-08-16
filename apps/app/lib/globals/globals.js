// App

MyApp = {};

MyApp._mainDashRegions = {
    header: "mainDashHeader",
    sideBar: "mainDashSideBar",
    footer: "mainDashFooter",
    controlSideBar: "mainDashControlSideBar"
};

MyApp.validateEmail = function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

MyApp.mainDashRegions = function (contentTemplate) {
    var regions;
    if (contentTemplate) {
        check(contentTemplate, String);
        regions = _.extend({content: contentTemplate}, this._mainDashRegions)
    } else {
        regions = _.clone(this._mainDashRegions)
    }
    return regions
};
