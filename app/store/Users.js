Ext.define('DermalCheck.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.Users',
    model: 'DermalCheck.model.User',
    autoLoad: false,
    limit: 0,
    pageSize: 0,
    proxy: {
        //dynamic url
        noCache: false,
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data'
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
