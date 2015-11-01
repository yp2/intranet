Template.mainDashSideBar.helpers({
    currentWiki: function () {
        return Template.instance().wiki()
    },
    wikiCategories: function () {
        var wiki = Template.instance().wiki();
        return wiki.categories
    },
    modalData: function () {
        return {

            id: 'addProject',
            actionBtnLabel: 'Add',
            cancelBtnLabel: 'Cancel',
            template: Template.mainDashSideBar,
            modalTitle: "Add New Project",
            modalBody: "addProjectForm",
            modalBodyIsTemplate: true,
            hideOnSuccess: false,
            onShow: function (event, template) {
                console.log('on show callback');
            },
            onHide: function (event, template) {
                console.log('on hide callback');
            },
            confirmAction: function (event, template) {
                event.preventDefault();
                console.log('confirm action');
                $("#addProjectForm").submit();
            },
            cancelAction: function (event, template) {
                console.log('cancel action');
                $("#addProjectForm")[0].reset();
            }
        }
    },
    projectAddUser: function () {
        return {
            id: 'projectAddUser',
            actionBtnLabel: 'Add',
            cancelBtnLabel: 'Cancel',
            template: Template.mainDashSideBar,
            modalTitle: "Invite user",
            modalBody: "projectAddUserForm",
            modalBodyIsTemplate: true,
            hideOnSuccess: false,
            onShow: function (e, t) {
                //Session.set("projectId", t.elementData.projectId);
                console.log('on show callback' );

            },
            onShown: function (e, t) {
                t.$("#projectAddUserForm").data('projectId', t.elementData.projectId);

                console.log('on shown callback', t.$("#projectAddUserForm").data());
            },
            onHide: function (event, template) {
                console.log('on hide callback');
            },
            confirmAction: function (event, template) {
                event.preventDefault();
                console.log('confirm action');
                //console.log(template);
                $("#projectAddUserForm").submit();
                //$("#addProjectForm").submit();
            },
            cancelAction: function (event, template) {
                console.log('cancel action');
                $("#projectAddUserForm")[0].reset();
                //$("#addProjectForm")[0].reset();
            }
        }
    }
});

Template.mainDashSideBar.events({
    //add your events here
});

Template.mainDashSideBar.onCreated(function () {
    var self = this;

    self.autorun(function () {
        self.wiki = function () {
            return Wiki.findOne();
        }
    })
});

Template.mainDashSideBar.onRendered(function () {
    var self = this;

    if (self.view.isRendered) {
        MyApp.informLayout()

    }
});

Template.mainDashSideBar.onDestroyed(function () {
    //add your statement here
});

