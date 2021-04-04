Ext.define('DermalCheck.store.RequestsByDiagnostics', {
    extend: 'Ext.data.Store',
    alias: 'store.RequestsByDiagnostics',
    model: 'DermalCheck.model.RequestsByDiagnostic',
    autoLoad: false,
    limit: 0,
    pageSize: 0,
    proxy: {
        noCache: false,
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data.lines'
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'PATCH',
            destroy: 'DELETE'
        },
        extraParams: {
        }
    },
    proxyExtraParams: {
    }
});
