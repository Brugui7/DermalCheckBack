/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DermalCheck.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.layout.container.Card'
    ],
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
            //xtype: 'materialRestrictionsGrid',
            id: 'bulkDownloadPanel',
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
                                '<b>Descarga Buld</b>: Permite descargar las imágenes en formato apropiado para extender el Dataset HAM 10000 ' +
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
                    handler: function (button, event) {
                    }
                }
            ]
        },
    ]


});
