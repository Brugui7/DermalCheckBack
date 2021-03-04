Ext.define('DermalCheck.view.bulkDownload.BulkMainPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bulkMainPanel',
    xtype:' bulkMainPanel',
    id: 'bulkMainPanel',
    // TODO cocntroller
    align: 'stretch',
    layout: 'border',
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 10
    },
    items: [
        {
            title: 'Filtros',
            region:'north ',
            floatable: false,
            xtype: 'bulkFilterForm'
        },
        {
            title: 'Main Content',
            collapsible: false,
            region: 'center',
            margin: '5 0 0 0',
            html: '<h2>Main Page</h2><p>This is where the main content would go</p>'
        }

    ],
});