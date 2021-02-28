Ext.define('DermalCheck.view.users.UsersGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usersGrid',
    id: 'usersGrid',
    controller: 'usersGridController',
    store: {
        type: 'Users'
    },
    columns: [
        {
            xtype: 'actioncolumn',
            width: 30,
            locked: true,
            editable: false,
            draggable: false,
            resizable: true,
            lockable: false,
            items: [
                {
                    iconCls: 'x-fa fa-user-edit',
                    tooltip: 'Editar usuario',
                    handler: 'listenerEditUser'
                }
            ]
        },
        {
            text: 'Nombre',
            dataIndex: 'displayName',
            sortable: false,
            flex: 1,
            minWidth: 180
        },
        {
            text: 'Email',
            dataIndex: 'email',
            sortable: true,
            flex: 1
        },
        {
            text: 'Rol', //TODO render y mostrar el nombre en el índice
            sortable: false,
            dataIndex: 'role',
            flex: 1
        }
    ],
    listeners: {
        afterrender: 'loadUsers'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'right',
            ui: 'footer',
            width: 90,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                iconAlign: 'top'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Nuevo',
                    tooltip: 'Crear un nuevo usuario',
                    iconCls: 'x-fa fa-user-plus',
                    handler: 'listenerNewUser'
                },
                {

                    xtype: 'button',
                    text: 'Eliminar',
                    tooltip: 'Eliminar usuarios seleccionados',
                    iconCls: 'x-fa fa-trash',
                    //handler: 'listenerDeleteRestriction'
                }
            ]
        }
    ],

});