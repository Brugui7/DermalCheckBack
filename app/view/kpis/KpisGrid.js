Ext.define('DermalCheck.view.kpis.KpisGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kpisGrid',
    xtype: 'kpisGrid',
    id: 'kpisGrid',
    controller: 'kpisGridController',
    store: {
        type: 'Kpis'
    },
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop'
        }
    },
    columns: [
        {
            text: 'Indicador',
            dataIndex: 'indicator',
            sortable: false,
            flex: 1,
            minWidth: 180,
            locked: true
        },
        {
            text: 'Valor Total',
            dataIndex: 'total',
            flex: 1
        },
        {
            text: 'Media',
            dataIndex: 'mean',
            xtype: 'numbercolumn',
            format: '0.00',
            flex: 1
        },
        {
            xtype: 'numbercolumn',
            text: 'Desviación típica',
            flex: 1,
            format: '0.00',
            dataIndex: 'std',
        },
    ],
    listeners: {
        afterrender: 'loadData'
    },
});
