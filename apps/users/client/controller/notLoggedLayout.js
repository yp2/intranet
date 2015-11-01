Template.notLoggedLayout.helpers({
    //add you helpers here
});

Template.notLoggedLayout.events({
    //add your events here
});

Template.notLoggedLayout.onCreated(function () {
    //add your statement here
});

Template.notLoggedLayout.onRendered(function () {
    var self = this;

    if(self.view.isRendered) {
        // AdminLTE init

        $(function () {
            //MeteorAdminLTE.run()
        });
        // end AdminLTE init

        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });
    }
});

Template.notLoggedLayout.onDestroyed(function () {
    //add your statement here
});

