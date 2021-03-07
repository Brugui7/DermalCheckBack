Ext.define('DermalCheck.view.bulkDownload.BulkFilterForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bulkFilterForm',
    xtype: 'bulkFilterForm',
    id: 'bulkFilterForm',
    layout: 'hbox',
    align: 'stretch',
    defaults: {
        margin: '4'
    },
    items: [
        {
            xtype: "container",
            layout: {
                type: "hbox",
                align: "bottom",
            },
            defaults: {
                labelAlign: "top",
            },
            items: [
                {
                    itemId: "dateFrom",
                    xtype: "datefield",
                    format: "d/m/Y",
                    name: "dateFrom",
                    align: "right",
                    fieldLabel: "Fecha Desde",
                    flex: 1
                },
                {
                    xtype: "button",
                    iconCls: "x-fa fa-times",
                    handler: function (button, event) {
                        let field = this.up().down('#dateFrom');
                        if (field) {
                            field.reset();
                        }
                    }
                }
            ]
        },
        {
            xtype: "container",
            layout: {
                type: "hbox",
                align: "bottom"
            },
            defaults: {
                labelAlign: "top"
            },
            items: [
                {
                    itemId: "dateTo",
                    xtype: "datefield",
                    format: "d/m/Y",
                    name: "dateTo",
                    align: "right",
                    fieldLabel: "Fecha Hasta",
                    flex: 1
                },
                {
                    xtype: "button",
                    iconCls: "x-fa fa-times",
                    handler: function (button, event) {
                        var field = this.up().down("#dateTo");
                        if (field) {
                            field.reset();
                        }
                    }
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: "toolbar",
            dock: "bottom",
            ui: "footer",
            layout: {
                type: "hbox"
            },
            items: [
                "->",
                {
                    text: "Filtrar",
                    iconCls: "x-fa fa-search",
                    handler: 'filter'
                }
            ]
        }
    ]
});