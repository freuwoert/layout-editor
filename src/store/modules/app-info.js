const state = {
    versionName: 'Founders Update',
    version: require('electron').remote.app.getVersion(),
    apiVersion: '0.1.0',
    electronVersion: process.versions.electron,
    nodeVersion: process.versions.node,
}

const getters = {
    allAppInfo: (state) => state,
    vAppInfo: (state) => state.version,
    vNameAppInfo: (state) => state.versionName,
    vApiAppInfo: (state) => state.apiVersion,
    vElectronAppInfo: (state) => state.electronVersion,
    vNodeAppInfo: (state) => state.nodeVersion,
}

const actions = {}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations,
}