Ext.define('DermalCheck.view.kpis.KpisGrid', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.kpisGrid',
    xtype: 'kpisGrid',
    controller: 'kpisGridController',
    layout: 'vbox',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    width: 500,
    height: 400,
    defaults: {
        frame: true,
        bodyPadding: 10,
        flex: 1
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
                flex: 1,
                width: '100%',
                height: '100%',
            },
            flex: 2,
            items: [
                {
                    id: 'totalDataChart',
                    xtype: 'cartesian',
                    reference: 'chart',

                    captions: {
                        title: {
                            text: 'Datos Totales',
                            align: 'left'
                        }
                    },
                    store: {
                        type: 'Kpis'
                    },
                    axes: [{
                        type: 'numeric',
                        position: 'left',
                        minimum: 0,
                        titleMargin: 20,
                        title: {
                            text: 'Valor'
                        },
                    }, {
                        type: 'category',
                        position: 'bottom'
                    }],
                    animation: Ext.isIE8 ? false : true,
                    series: {
                        type: 'bar',
                        xField: 'indicator',
                        yField: 'total',
                        style: {
                            minGapWidth: 20
                        },
                        highlight: {
                            strokeStyle: 'black',
                            fillStyle: 'gold'
                        },
                        label: {
                            field: 'indicator',
                            display: 'indicator',
                        }
                    },
                },
                {
                    id: 'requestsByDiagnosticChart',
                    xtype: 'polar',
                    reference: 'chart2',

                    captions: {
                        title: {
                            text: 'Consultas por diagnóstico',
                            align: 'left'
                        }
                    },
                    store: {
                        type: 'RequestsByDiagnostics'
                    },
                    interactions: ['rotate'],
                    animation: Ext.isIE8 ? false : true,
                    series: {
                        type: 'pie',
                        angleField: 'requestsNumber',
                        style: {
                            minGapWidth: 20
                        },
                        highlight: {
                            strokeStyle: 'black',
                            fillStyle: 'gold'
                        },
                        label: {
                            field: 'diagnosticLabel',
                            display: 'diagnosticLabel',
                        },
                        highlight: true,
                    },
                },
            ]
        },
        {
            xtype: 'grid',
            id: 'kpisGrid',
            title: 'Datos totales',
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

        },
    ],
    listeners: {
        afterrender: 'loadData'
    },



});
