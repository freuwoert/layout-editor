const state = {
    loadDelay: 0,
    settings: false,
    releaseNote: false,
    activeSetting: 'INFO',
    dragElement: {type: 'structure', element: 'div'}
}

const getters = {
    GENERAL_UI: (state) => state,
    loadDelay: (state) => state.loadDelay,
    dragElement: (state) => state.dragElement,
}

const actions = {
    setDraggedElement({ commit }, payload) {
        if( !payload.type ) return
        if( !payload.element ) return
        commit('setDraggedElement_', { type: payload.type, element: payload.element })
    },
}

const mutations = {
    setDraggedElement_: (state, param) => {
        state.dragElement.type = param.type
        state.dragElement.element = param.element
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}