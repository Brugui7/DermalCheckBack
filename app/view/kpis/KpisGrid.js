Ext.define('DermalCheck.view.kpis.KpisGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kpisGrid',
    xtype: 'kpisGrid',
    id: 'kpisGrid',
    //controllers
    store: {
        type: 'Kpis',
        data: [{
            'id': 0,
            'indicator': 'Consultas creadas',
            "total": 10,
            "mean": null,
            "std": null
        }, {
            'id': 1,
            'indicator': 'Consultas diagnosticadas',
            "total": 9,
            "mean": null,
            "std": null
        }, {
            'id': 2,
            'indicator': 'Tiempo por consulta (h)',
            "total": null,
            "mean": "54",
            "std": 1.698
        }]
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
        //drop: 'listenerSortChangeGrid'
    },
});
