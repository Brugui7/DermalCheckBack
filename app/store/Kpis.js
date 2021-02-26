Ext.define('DermalCheck.store.Kpis', {
    extend: 'Ext.data.Store',
    alias: 'store.Kpis',
    model: 'DermalCheck.model.Kpi',
    autoLoad: false,
    limit: 0,
    pageSize: 0,
    proxy: {
        //dynamic url
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
