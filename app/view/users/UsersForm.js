Ext.define('DermalCheck.view.users.UsersForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.usersForm',
    xtype: 'usersForm',
    controller: 'usersFormController',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    user: null,
    defaults: {
        margin: 4,
        labelAlign: 'top'
    },
    items: [
        {
            xtype: 'textfield',
            name: 'displayName',
            fieldLabel: 'Nombre',
            allowBlank: false,
        },
        {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
            allowBlank: false,
            itemId: 'email'
        },
        {
            xtype: 'textfield',
            name: 'role',
            fieldLabel: 'Rol',
            allowBlank: true
        },
        {
            xtype: 'toolbar',
            ui: 'footer',
            items: [
                '->',
                {
                    text: 'Guardar',
                    iconCls: 'x-fa fa-save',
                    handler: 'listenerSaveUser'
                }
            ]
        }
    ],

    listeners: {
        afterrender: 'listenerAfterRender',
        initComponent: 'initComponent'
    }
});