Ext.define('DermalCheck.view.bulkDownload.BulkMainPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bulkMainPanel',
    xtype:' bulkMainPanel',
    id: 'bulkMainPanel',
    controller: 'bulkMainPanelController',
    align: 'stretch',
    layout: 'border',
    defaults: {
        collapsible: true,
        bodyPadding: 10
    },
    items: [
        {
            title: 'Filtros',
            region:'north',
            floatable: false,
            xtype: 'bulkFilterForm',
        },
        {
            collapsible: false,
            region: 'center',
            margin: '5 0 0 0',
            html: ''
        }

    ],
});