const state = {
    loadDelay: 0,
    settings: false,
    releaseNote: false,
    activeSetting: 'INFO',
}

const getters = {
    GENERAL_UI: (state) => state,
    loadDelay: (state) => state.loadDelay
}

const actions = {}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations,
}