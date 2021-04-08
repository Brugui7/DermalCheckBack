/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('DermalCheck.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listenerBtnLogout: function () {
        // Remove Main View
        this.getView().destroy();

        // Add the Login Window
        Ext.create({
            xtype: 'login'
        });
    }

});
