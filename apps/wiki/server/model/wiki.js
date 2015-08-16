/**
 * Created by daniel on 16.08.15.
 */
Meteor.publish('scopeWiki', function() {
    var sel,
        opt,
        user = Meteor.users.findOne({_id: this.userId});

})
