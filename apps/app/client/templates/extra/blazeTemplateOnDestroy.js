/**
 * Created by daniel on 21.09.15.
 */

for (var property in Template){
    if (Blaze.isTemplate(Template[property])){
        var template = Template[property];
        template.onDestroyed(function () {
            // set dialog hide. Dialgo on mainDash which is not destroyed - so setting all template session set on onDestroyed Callback
            Session.set('inviteUserDialog', false)
        })
    }
}
