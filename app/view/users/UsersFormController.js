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
                    role: user.get('role')
                });
            return;
        }


        // Only available for user creation
        view.add({
            xtype: 'textfield',
            inputType: 'password',
            name: 'password',
            fieldLabel: 'Contraseña',
            allowBlank: false,
            itemId: 'password',
            minLength: 6
        });
    },

    listenerSaveUser: function () {
        let form = this.getView();
        let user = form.user;

        if (!form.isValid()) {
            return;
        }
        form.setLoading('Guardando...');
        let db = firebase.firestore();

        if (user) {
            db.collection('users').doc(user.get('uid')).update(form.getValues())
                .then((ref) => form.up().close())
                .catch((error) => {
                    console.log(error);
                    this.showErrorMsg();
                    form.setLoading(false);
                });
            return;
        }
        this.createUserWithEmailAndPassword(form.getValues());
    },

    showErrorMsg() {
        Ext.Msg.show({
            title: 'Error',
            message: 'Ocurrió un error al guardar',
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR,
            animateTarget: this.getView()
        });
    },

    createUserWithEmailAndPassword(values) {
        let form = this.getView();
        let db = firebase.firestore();

        let secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");

        secondaryApp.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then((user) => {
                values.uid = secondaryApp.auth().currentUser.uid;
                console.log(values.uid);
                db.collection('users')
                    .doc(values.uid)
                    .set(values)
                    .then((ref) => {
                        form.up().close();
                        secondaryApp.auth().signOut();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.showErrorMsg();
                        form.setLoading(false);
                    });
            })
            .catch((error) => {
                console.log(error);
                this.showErrorMsg();
            });
    }


});