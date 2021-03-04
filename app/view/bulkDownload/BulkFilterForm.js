Ext.define('DermalCheck.view.bulkDownload.BulkFilterForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bulkFilterForm',
    layout: 'vbox',
    align: 'stretch',
    defaults: {
        layout: 'hbox'
    },
    items: [
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
                    iconCls: "x-fa fa-close",
                    handler: function (button, event) {
                        let field = self.down('#dateFrom');
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
                    iconCls: "x-fa fa-close",
                    handler: function (button, event) {
                        var field = self.down("#dateTo");
                        if (field) {
                            field.reset();
                        }
                    }
                }
            ]
        }
    ]
});