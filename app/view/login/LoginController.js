Ext.define('DermalCheck.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginController',

    onLoginClick: function () {
        const view = this.getView();
        const formValues = view.down('form').getValues();
        view.mask('Cargando...');
        
        firebase.auth().signInWithEmailAndPassword(formValues.email, formValues.password)
            .then((userCredential) => {
                view.unmask();
                view.destroy();
                Ext.create({
                    xtype: 'app-main'
                });
            })
            .catch((error) => {
                view.unmask();
                if (error.code === 'auth/user-not-found') {
                    Ext.toast('El email introducido no está registrado', 'Error');
                    return;
                }

                Ext.toast('Usuario y/o contraseña incorrecto', 'Error');
                return;

            });
    }
});