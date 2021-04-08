/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('DermalCheck.Application', {
    extend: 'Ext.app.Application',

    name: 'DermalCheck',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Actualización de la aplicación', 'Acabamos de actualizar a la última versión de DermalCheck ¿Recargar?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    launch: function () {
        firebase.auth().onAuthStateChanged((user) => {
            Ext.create({
                xtype: !!user ? 'app-main' : 'login'
            });
        });
    }
});
