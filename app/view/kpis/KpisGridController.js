Ext.define('DermalCheck.view.kpis.KpisGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.kpisGridController',
    loadData: function (view, layout, options) {
        const grid = view.down('#kpisGrid');
        const totalDataChart = view.down('#totalDataChart');
        const requestsByDiagnosticChart = view.down('#requestsByDiagnosticChart');
        view.mask("Cargando...");

        let db = firebase.firestore();
        let a = db.collection('statistics')
            .doc('0')
            .get()
            .then((documentSnapshot) => {
                const dataParsed = this.parseTotalIndicators(documentSnapshot.data());
                grid.store.add(dataParsed);
                totalDataChart.store.add(dataParsed);
            });

        let b = db.collection('statistics')
            .doc('requestsByLabelIndex')
            .get()
            .then((documentSnapshot) => {
                const dataParsed = this.parseRequestsByDiagnostic(documentSnapshot.data());
                requestsByDiagnosticChart.store.add(dataParsed);
            });

        Promise.all([a, b]).then(values => view.unmask());
    },
    parseTotalIndicators: function (data) {
        return [
            {
                'id': Math.random(),
                'indicator': 'Consultas creadas',
                "total": data.requestsCreated,
                "mean": null,
                "std": null
            },
            {
                'id': Math.random(),
                'indicator': 'Diagnósticos totales',
                "total": data.requestsDiagnosed,
                "mean": null,
                "std": null
            },
            {
                'id': Math.random(),
                'indicator': 'Diagnósticos estimados coincidentes',
                "total": data.matchingDiagnostics,
                "mean": data.matchingDiagnostics / data.requestsCreated,
                "std": null
            },
        ];
    },
    parseRequestsByDiagnostic: function (data) {
        let dataParsed = [];
        DermalCheck.Constants.SPANISH_LABELS.forEach((label, index) => {
            dataParsed.push({
                id: Math.random(),
                requestsNumber: data[index],
                diagnosticLabel: label
            });
        });
        return dataParsed;
    }




});
