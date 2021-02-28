Ext.define('DermalCheck.view.users.UsersGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersGridController',
    loadUsers: function (view, layout, options) {
        view.up().mask('Cargando...');
        view.store.removeAll();

        let db = firebase.firestore();
        db.collection('users')
            .get()
            .then((documentSnapshots) => {
                documentSnapshots.forEach(doc => {
                    view.store.add(doc.data());
                });
                view.up().unmask();
            });
    },

    listenerEditUser: function (view, rowIndex, colIndex, item, e, record) {
        let grid = this.getView();
        let window = Ext.create('Ext.window.Window', {
            animateTarget: view,
            width: 400,
            modal: true,
            title: 'Editar Usuario',
            iconCls: 'fa fa-user-edit',
            listeners: {
                close: () => { grid.getController().loadUsers(grid); }
            },
            items: [{ xtype: 'usersForm', user: record, }]
        }).show();
    },

    listenerNewUser: function (button, event) {
        let grid = this.getView();
        Ext.create('Ext.window.Window', {
            animateTarget: button,
            width: 400,
            modal: true,
            title: 'Nuevo Usuario',
            iconCls: 'fa fa-user-plus',
            listeners: {
                close: () => { grid.getController().loadUsers(grid); }
            },
            items: [{ xtype: 'usersForm' }]
        }).show();
    },
});