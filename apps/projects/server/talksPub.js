/**
 * Created by daniel on 07.11.15.
 */

"use strict";

Meteor.publish('talks', function (selector, options) {
    let sel = selector || {},
        opt = options || {};
    console.log('aa', this.userId, sel);

    if (this.userId && sel['project.id']) {
        let draft = Talks.findOne({
            'secure.status': "draft",
            'secure.author.id': this.userId,
            'secure.project.id': sel['project.id']
        });
        _.assign(opt, {sort: {createdAt: -1}, fields: {secure: 0}});
        
        //console.log(draft, selector );
        
        if (!draft) {
            let user = Meteor.users.findOne(this.userId);
            let insObj = {
                title: "",
                content: "",
                status: "draft",
                author: {
                    id: this.userId,
                    username: user.username
                },
                project: {
                    id:  sel['project.id']
                }
            };

            let taskSecure = {secure: {}};

            _.assign(taskSecure.secure, insObj);

            insObj['secure'] = taskSecure.secure;

            Talks.insert(insObj);
        }

        let result = Talks.find(sel, opt);

        console.log('pub talks', result.count(), sel, opt);
        return result
    }
});
