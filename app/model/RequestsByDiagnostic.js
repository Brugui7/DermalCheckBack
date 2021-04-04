Ext.define('DermalCheck.model.RequestsByDiagnostic', {
    extend: 'Ext.data.Model',
    alias: 'model.requestsByDiagnostic',
    idProperty: 'id',
    fields: [
        {
            name: 'id',
            type: 'number'
        },
        {
            name: 'diagnosticLabel',
            type: 'string'
        },
        {
            name: 'requestsNumber',
            type: 'number'
        }
    ]
})