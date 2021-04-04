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
        const formValues = view.down('bulkFilterForm').getForm().getValues();
        const dateFrom = formValues.dateFrom.trim();
        const dateTo = formValues.dateTo.trim();
        if (!!!dateFrom || !!!dateTo) {
            Ext.toast('Los campos de fecha son obligatorios.', 'Error');
            return;
        }

        try {
            this.doBulkDownload(Ext.Date.parse(dateFrom, 'd/m/Y'), Ext.Date.parse(dateTo, 'd/m/Y'));
        } catch (error) {
            console.error(error);
            Ext.toast('Ocurrió un error inesperado, inténtelo de nuevo más tarde', 'Error');
        }


    },
    /**
     * 
     * @param {Date} dateFrom 
     * @param {Date} dateTo 
     */
    doBulkDownload: async function (dateFrom, dateTo) {
        const view = this.getView();
        const self = this;
        view.mask('Obteniendo consultas...');
        this.createZip();
        let maxImages = 0;
        let imagesProccesed = 0;

        const db = firebase.firestore();
        const storage = firebase.storage();
        view.mask('Obteniendo consultas...');
        db.collection('requests')
            .where('diagnosticDate', '>=', dateFrom)
            .where('diagnosticDate', '<=', dateTo)
            .get()
            .then((querySnapshots) => {
                if (querySnapshots.size == 0) {
                    Ext.toast('No se encontraron datos para las fechas introducidas', 'Sin resultados');
                    view.unmask();
                    return;
                }
                // This method will work as long as there is 1 and only 1 image per request.
                maxImages = querySnapshots.size;

                view.mask('Descargando imágenes...');

                querySnapshots.forEach(async doc => {
                    let storageRef = storage.ref();
                    const docData = doc.data();
                    let diagnosticLabelIndex = docData.diagnosedLabelIndex;
                    if (!!docData.pathologistDiagnosticLabelIndex && docData.pathologistDiagnosticLabelIndex != - 1) {
                        diagnosticLabelIndex = docData.pathologistDiagnosticLabelIndex;
                    }

                    const diagnosticParsed = DermalCheck.Constants.DIAGNOSTICS_FILE_TAGS[diagnosticLabelIndex];
                    // Lists all images of the request
                    const folder = await storageRef.child(`images/${doc.id}`).listAll();

                    folder.items.forEach(async itemRef => {
                        const url = await itemRef.getDownloadURL();
                        this.addImageToZipAndCheckDownload(url, `UCAM_${diagnosticParsed}_${doc.id}.jpg`, ++imagesProccesed, maxImages);
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