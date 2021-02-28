Ext.define('DermalCheck.view.users.UsersFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersFormController',
    listenerAfterRender: function () {
        let view = this.getView();
        let user = view.user;
        if (user) {
            view.getForm()
            .setValues({
                displayName: user.get('displayName'),
                email: user.get('email'),
                rol: user.get('rol')
            });
        }
    }
});