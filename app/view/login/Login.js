Ext.define('DermalCheck.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',
    controller: 'loginController',
    bodyPadding: 10,
    title: 'Acceso',
    closable: false,
    autoShow: true,
    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Contraseña',
            allowBlank: false
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'Enter any non-blank password'
        }],
        buttons: [{
            text: 'Acceder',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});