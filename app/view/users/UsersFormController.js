Ext.define('DermalCheck.view.users.UsersFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersFormController',
    listenerAfterRender: function () {
        let view = this.getView();
        let user = view.user;
        if (user) {
            this.view.getComponent('email').setDisabled(true);
            view.getForm()
                .setValues({
                    displayName: user.get('displayName'),
                    email: user.get('email'),
                    rol: user.get('role')
                });
        }
    },
    listenerSaveUser: function () {
        let form = this.getView();
        let user = form.user;

        if (!form.isValid()) {
            return;
        }
        form.setLoading('Guardando...');
        let db = firebase.firestore();

        let task;
        if (user) {
            task = db.collection('users').doc(user.get('uid')).update(form.getValues());
        } else {
            task = db.collection('users').add(form.getValues());
        }

        task.then((ref) => form.up().close())
            .catch((error) => {
                console.log(error);
                showErrorMsg(form);
            });
    },
    showErrorMsg(view) {
        Ext.Msg.show({
            title: 'Error',
            message: response && response.msg
                ? response.msg
                : 'Ocurrió un error al guardar',
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR,
            animateTarget: view
        });
    }


});