/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'DermalCheck.Application',

    name: 'DermalCheck',

    requires: [
        // This will automatically load all classes in the DermalCheck namespace
        // so that application classes do not need to require each other.
        'DermalCheck.*',
        'Ext.chart.*'
    ],
});
