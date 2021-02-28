Ext.define('DermalCheck.model.User', {
    extend: 'Ext.data.Model',
    alias: 'model.User',
    idProperty: 'uid',
    fields: [
        {
            name: 'uid',
            type: 'string'
        },
        {
            name: 'displayName',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'role',
            type: 'string'
        }            
    ]
});