Ext.define('DermalCheck.view.bulkDownload.BulkMainPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bulkMainPanelController',
    zip = null,
    createZip: function () {
        let scriptTag = document.createElement('script');
        scriptTag.src = 'resources/client-zip.js';
        document.body.appendChild(scriptTag);
        this.zip = new JSZip();
    },
    filter: async function (button, event, values) {
        let view = this.getView();
        view.mask('Obteniendo consultas...');
        createZip();


        let db = firebase.firestore();
        let storage = firebase.storage();
        view.mask('Obteniendo consultas...');
        db.collection('requests')
            //.where('diagnosticDate', '>=', '2020-01-01') // TODO
            .where('diagnosticDate', '<=', new Date()) // TODO
            .get()
            .then((querySnapshots) => {
                view.mask('Descargando imágenes...');
                querySnapshots.forEach(doc => {
                    let storageRef = storage.ref();
                    storageRef.child(`images/${doc.id}`).listAll()
                        .then((res) => {
                            res.items.forEach(async (itemRef) => {
                                itemRef.getDownloadURL().then((url) => {
                                    this.addImageToZip(url, `${doc.id}.jpg`); // TODO name
                                });
                            });
                        });
                });
                view.up().unmask();
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    },
    addImageToZip: async function (imageUrl, imageName) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function (event) {
            this.zip.folder('images').file(imageName, img);
        };
        xhr.open('GET', await imageUrl);
        xhr.send();
    },
    /**
     * https://github.com/Touffy/client-zip
     */
    downloadImages: async function () {
        this.zip.generateAsync({ type: "base64" }).then(function (base64) {
            location.href = "data:application/zip;base64," + base64;
        });

    }
});