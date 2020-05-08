const state = {
    loadDelay: 0,
    releaseNote: false,
    settings: false,
    activeSetting: 'INFO',
    dragElement: { type: '', element: '' },
}

const getters = {
    GENERAL_UI: (state) => state,
    settingsUI: (state) => state.settings,
    loadDelay: (state) => state.loadDelay,
    dragElement: (state) => state.dragElement,
}

const actions = {
    setDraggedElement({ commit }, payload) {
        if( !payload.type ) return
        if( !payload.element ) return
        commit('setDraggedElement_', { type: payload.type, element: payload.element })
    },

    setSettingsUI({ commit }, payload) {
        if( payload === false || payload === true)
        {
            commit('setSettingsUI_', payload)
        }
    },
}

const mutations = {
    setDraggedElement_: (state, param) => {
        state.dragElement.type = param.type
        state.dragElement.element = param.element
    },
    setSettingsUI_: (state, param) => {
        state.settings = param
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}