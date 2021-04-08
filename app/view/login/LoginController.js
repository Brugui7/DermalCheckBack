Ext.define('DermalCheck.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginController',

    onLoginClick: function () {
        // TODO firebase
        console.log('patata');
        // Set the localStorage value to true
        localStorage.setItem("loggedIn", true);
        // Remove Login Window
        this.getView().destroy();
        // Add the main view to the viewport
        Ext.create({
            xtype: 'app-main'
        });

    }
});