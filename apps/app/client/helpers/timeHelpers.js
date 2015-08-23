/**
 * Created by daniel on 23.08.15.
 */
Template.registerHelper('timeFromNow', function (date) {
    return moment(date).fromNow();
});
