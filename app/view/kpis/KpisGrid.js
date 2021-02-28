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
            sortable: true,
            flex: 1
        },
        {
            text: 'Media',
            sortable: false,
            dataIndex: 'mean',
            flex: 1
        },
        {
            text: 'Desviación típica',
            flex: 1,
            dataIndex: 'std',
        },
    ],
    listeners: {
        afterrender: 'loadData'
    },
});
