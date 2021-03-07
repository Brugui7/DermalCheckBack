Ext.define('DermalCheck.view.bulkDownload.BulkMainPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bulkMainPanelController',
    filter: function(button, event, values){
        console.log('quiero filtrar');
    }
});