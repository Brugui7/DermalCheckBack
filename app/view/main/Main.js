Ext.define('DermalCheck.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    controller: 'main',
    requires: [
        'Ext.layout.container.Card'
    ],
    plugins: 'viewport',
    title: 'DermalCheck',
    items: [
        {
            title: 'Cuadro de Mando',
            iconCls: 'x-fa fa-chart-bar',
            xtype: 'kpisGrid',
        },
        {
            title: 'Descarga Bulk',
            iconCls: 'x-fa fa-download',
            xtype: 'bulkMainPanel',
            id: 'bulkDownloadPanel',
            listeners: {}
        },
        {
            title: 'Usuarios',
            iconCls: 'x-fa fa-user',
            xtype: 'usersGrid',
            id: 'usersGrid',
            listeners: {}
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            width: 90,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                iconAlign: 'left'
            },
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Ayuda',
                    tooltip: 'Información sobre el uso',
                    iconCls: 'x-fa fa-info',
                    handler: function (button, event) {
                        let window = Ext.create('Ext.window.Window', {
                            animateTarget: button,
                            title: 'Ayuda para el uso',
                            iconCls: 'x-fa fa-info',
                            padding: 10,
                            scrollable: true,
                            html:
                                '<h2>Pestañas</h2><hr/>' +
                                '<ul>' +
                                '<li><b>Cuadro de mando</b>: Permite visualizar las estadísticas actualizadas de la aplicación.</li>' +
                                '<li>' +
                                '<b>Descarga Bulk</b>: Permite descargar las imágenes en formato apropiado para extender el Dataset HAM 10000 ' +
                                '</li>' +
                                '<li>' +
                                '<b>Usuarios</b>: Permite gestionar usuarios existentes y crear otros nuevos' +
                                '</li>' +
                                '</ul>',
                            height: 400,
                            width: 800,
                            maximizable: true,
                            maximized: false,
                        });
                        window.show();
                    }
                },
                {
                    xtype: 'button',
                    text: 'Cerrar sesión',
                    tooltip: 'Cerrar sesión',
                    iconCls: 'x-fa fa-sign-out-alt',
                    handler: 'listenerBtnLogout'
                }
            ]
        },
    ]


});
