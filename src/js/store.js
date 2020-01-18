store = new Vuex.Store({
    state: {
        INFO: {
            versionName: 'Founders Update',
            version: require('electron').remote.app.getVersion(),
            apiVersion: '0.1.0',
            electronVersion: process.versions.electron,
            nodeVersion: process.versions.node,
        }
    },
    mutations: {

    },
    actions: {

    },
    getters: {

    }
})