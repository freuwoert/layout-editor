const state = {
    versionName: 'Founders Update',
    version: require('electron').remote.app.getVersion(),
    apiVersion: '0.1.0',
    electronVersion: process.versions.electron,
    nodeVersion: process.versions.node,
}

const getters = {}

const actions = {}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations,
}