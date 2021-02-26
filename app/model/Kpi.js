Ext.define('DermalCheck.model.Kpi', {
    extend: 'Ext.data.Model',
    alias: 'model.Kpi',
    idProperty: 'id',
    fields: [
        {
            name: 'id',
            type: 'integer'
        },
        {
            name: 'indicator',
            type: 'string'
        },
        {
            name: 'total',
            type: 'number'
        },
        {
            name: 'mean',
            type: 'number'
        },
        {
            name: 'std',
            type: 'number'
        }
            
    ]
});