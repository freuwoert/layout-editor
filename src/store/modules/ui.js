import { EventBus } from '../../assets/js/event-bus'


const state = {
    loadDelay: 0,
    settings: false,
    releaseNote: false,
    activeSetting: 'INFO',
    dragElement: { type: 'structure', element: 'div' },
    selectedStructures: [],
    focusedStructure: '',
}

const getters = {
    GENERAL_UI: (state) => state,
    settings_ui: (state) => state.settings,
    loadDelay: (state) => state.loadDelay,
    dragElement: (state) => state.dragElement,
    selectedStructures: (state) => state.selectedStructures,
}

const actions = {
    setDraggedElement({ commit }, payload) {
        if( !payload.type ) return
        if( !payload.element ) return
        commit('setDraggedElement_', { type: payload.type, element: payload.element })
    },

    setSelectedStructures({ commit }, payload) {
        if( !payload.trace.toString() ) return

        EventBus.$emit('structure-selected', [payload.trace])

        commit('setSelectedStructures_', { trace: payload.trace })
    },

    setSettingsUI({ commit }, payload) {
        if( payload === false || payload === true) {
            commit('setSettingsUI_', payload)
        }
    },
}

const mutations = {
    setDraggedElement_: (state, param) => {
        state.dragElement.type = param.type
        state.dragElement.element = param.element
    },
    setSelectedStructures_: (state, param) => {
        state.selectedStructures = [param.trace.toString()]
    },
    setSettingsUI_: (state, param) => {
        state.settings = param
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}