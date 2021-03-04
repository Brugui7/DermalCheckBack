Ext.define('DermalCheck.view.kpis.KpisGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.kpisGridController',
    loadData: function (view, layout, options) {
        view.up().mask('Cargando...');

        let db = firebase.firestore();
        db.collection('statistics')
            .doc('0')
            .get()
            .then((documentSnapshot) => {
                let data = documentSnapshot.data();
                view.store.add([
                    {
                        'id': Math.random(),
                        'indicator': 'Consultas creadas',
                        "total": data.requestsCreated,
                        "mean": null,
                        "std": null
                    },
                    {
                        'id': Math.random(),
                        'indicator': 'Consultas Diagnosticadas',
                        "total": data.requestDiagnosed,
                        "mean": null,
                        "std": null
                    },
                    {
                        'id': Math.random(),
                        'indicator': 'Tiempo medio de diagnóstico (h)',
                        "total": null,
                        "mean": data.averageDiagnoseHours,
                        "std": data.stdDiagnoseHours
                    },
                    {
                        'id': Math.random(),
                        'indicator': 'Diagnósticos coincidentes',
                        "total": data.matchingDiagnostics,
                        "mean": data.matchingDiagnostics / data.requestDiagnosed,
                        "std": null
                    },
                ]);
                view.up().unmask();
            });
    }

});
