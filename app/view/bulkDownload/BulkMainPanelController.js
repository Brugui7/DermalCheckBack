Ext.define('DermalCheck.view.bulkDownload.BulkMainPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bulkMainPanelController',
    zip: null,
    createZip: function () {
        let scriptTag = document.createElement('script');
        scriptTag.src = 'resources/client-zip.js';
        document.body.appendChild(scriptTag);
        this.zip = new JSZip();
    },
    /**
     * 
     * @param {*} button 
     * @param {*} event 
     * @param {*} values 
     */
    filter: async function (button, event, values) {
        const view = this.getView();
        view.mask('Obteniendo consultas...');
        this.createZip();
        let maxImages = 0;
        let imagesProccesed = 0;

        const db = firebase.firestore();
        const storage = firebase.storage();
        view.mask('Obteniendo consultas...');
        db.collection('requests')
            //.where('diagnosticDate', '>=', '2020-01-01') // TODO
            .where('diagnosticDate', '<=', new Date()) // TODO
            .get()
            .then((querySnapshots) => {

                // This method will work as long as there is 1 and only 1 image per request.
                maxImages = querySnapshots.size;

                view.mask('Descargando imágenes...');

                querySnapshots.forEach(async doc => {
                    let storageRef = storage.ref();

                    // Lists all images of the request
                    const folder = await storageRef.child(`images/${doc.id}`).listAll();

                    folder.items.forEach(async itemRef => {
                        const url = await itemRef.getDownloadURL();
                        this.addImageToZipAndCheckDownload(url, `${doc.id}.jpg`, ++imagesProccesed, maxImages);
                    });
                });
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    },
    /**
     * Downloads an image from firebase, adds it to the zip and calls the download file if needed
     * @param {*} imageUrl 
     * @param {*} imageName 
     * @param {*} imagesProccesed 
     * @param {*} maxImages 
     */
    addImageToZipAndCheckDownload: function (imageUrl, imageName, imagesProccesed, maxImages) {
        const self = this;
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function (event) {
            const img = xhr.response;
            self.zip.folder('images').file(imageName, img);

            if (imagesProccesed == maxImages) {
                self.downloadImages();
            }
        };
        xhr.open('GET', imageUrl);
        xhr.send();
    },
    /**
     * Downloads the zip and unmasks the view
     */
    downloadImages: async function () {
        const view = this.getView();
        view.mask('Descargando archivo...');
        this.zip.generateAsync({ type: "base64" }).then(function (base64) {
            location.href = "data:application/zip;base64," + base64;
            view.unmask();
        });
    }
});