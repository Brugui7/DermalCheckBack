Ext.define('DermalCheck.view.bulkDownload.BulkMainPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bulkMainPanelController',
    aux: false,
    filter: async function (button, event, values) {
        let view = this.getView();
        view.mask('Obteniendo consultas...');


        let db = firebase.firestore();
        let storage = firebase.storage();
        let imagesData = [];
        view.mask('Obteniendo consultas...');
        db.collection('requests')
            //.where('diagnosticDate', '>=', '2020-01-01')
            .where('diagnosticDate', '<=', new Date())
            .get()
            .then((querySnapshots) => {
                view.mask('Descargando imágenes...');
                querySnapshots.forEach(doc => {
                    //console.log(doc.data());
                    let storageRef = storage.ref();
                    storageRef.child(`images/${doc.id}`).listAll()
                        .then((res) => {

                            res.items.forEach(async (itemRef) => {
                                imagesData.push({
                                    'url': await itemRef.getDownloadURL(),
                                    'name': 'prueba.jpg' // TODO set name
                                });
                                this.downloadImages(imagesData);
                            });
                        });

                });
                view.up().unmask();
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    },
    /**
     * https://github.com/Touffy/client-zip
     */
    downloadImages: async function (images) {
        if (this.aux) return;
        this.aux = true;

        let scriptTag = document.createElement('script');
        scriptTag.src = 'resources/client-zip.js';
        document.body.appendChild(scriptTag);

        console.log(images[0].url);
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = async function (event) {
            var img = xhr.response;
            var zip = new JSZip();
            zip.folder("nested").file("hello.jpg", img);
            zip.generateAsync({type:"base64"}).then(function (base64) {
                location.href="data:application/zip;base64," + base64;
            });
        };
        xhr.open('GET', images[0].url);
        xhr.send();
    }
});