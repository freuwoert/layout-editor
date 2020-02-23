const state = {
    viewHandles: [
        'VIEW:HOME',
        'VIEW:LAYOUT_CREATOR',
        'VIEW:LAYOUT_EDITOR',
        'VIEW:ASSET_STORE',
        'VIEW:PROJECT_MANAGER',
    ]
}

const getters = {
    allViewHandles: (state) => state.viewHandles
}

const actions = {}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations,
}