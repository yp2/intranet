// App

MyApp = {};

MyApp.mainDashRegions = {
    header: "mainDashHeader",
    sideBar: "mainDashSideBar",
    footer: "mainDashFooter",
    controlSideBar: "mainDashControlSideBar"
};

MyApp.validateEmail = function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};
