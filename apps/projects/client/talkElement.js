"use strict";

Template.talkElement.helpers({
    canAddComment () {
        let result = Template.instance().canAddComment.get();
        return  result ? "" : "disabled";
    },
    talkComment () {
        return _.sortByOrder(this.comments, ['createdAt'], ['desc'])
    }

});

Template.talkElement.events({
    "submit .form-comment" (e, t) {
        e.preventDefault();
        let projectId = this.project.id;
        let talkId = this._id;
        let comment = t.$("textarea.comment").val();

        Meteor.call("addComment", {talkId: talkId, comment: comment, projectId: projectId}, function (error, result) {
            if (error) {
                sAlert.addError(error.reason, "Add comment error");
            }
            if (result) {
                sAlert.addSuccess("Comment added");
                t.$("textarea.comment").val("");
            }
        });

    },
    "keyup textarea.comment" (e, t) {
        e.preventDefault();
        if (e.currentTarget.value.length > 0) {
            t.canAddComment.set(true);
        } else {
            t.canAddComment.set(false);
        }
    }

});

Template.talkElement.onCreated(function () {
    this.canAddComment = new ReactiveVar(false)
});

Template.talkElement.onRendered(function () {
    //add your statement here
});

Template.talkElement.onDestroyed(function () {
    //add your statement here
});

