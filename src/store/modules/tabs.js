const uuid = require('uuid')
const startUUID = uuid.v4()

import TabPrototype from '../../classes/TabPrototype'

const state = {
    activeUUID: startUUID,
    tabs: [new TabPrototype(startUUID)],
}

const getters = {
    allTabHandles: (state) => {
        let handles = []

        for (const tab of state.tabs)
        {
            handles.push({
                name: tab.meta.name,
                changed: tab.meta.changed,
                UUID: tab.UUID
            })
        }

        return handles
    },
    activeTab: () => {
        return false
    },
    activeTabID: (state) => state.activeUUID,
}

const actions = {
    addTab({ commit }, payload) {
        let uuid = require('uuid').v4()
        let tab = new TabPrototype(uuid)

        commit('addTabs_', [tab])

        if( payload.selectOnCreation )
        {
            commit('setActiveTab_', uuid)
        }
    },

    selectTab({ commit, state, getters }, payload) {

        commit('loadTab_', getters.__FLUSH_DOCUMENT__)

        for (let i = 0; i < state.tabs.length; i++)
        {
            if( state.tabs[i].UUID === payload)
            {
                commit('FLOOD_DOCUMENT', JSON.parse(JSON.stringify(state.tabs[i])))
                return
            }
        }
    },
}

const mutations = {
    addTabs_: (state, params) => {
        state.tabs.push( ...params )
    },
    loadTab_: (state, params) => {
        for (let i = 0; i < state.tabs.length; i++)
        {
            if( state.tabs[i].UUID === state.activeUUID)
            {
                state.tabs[i] = JSON.parse(JSON.stringify(params))
                console.log(params)
                return
            }
        }
    },
    setActiveTab_: (state, params) => {
        state.activeUUID = params
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}