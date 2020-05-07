const uuid = require('uuid')

import Tab from '../../classes/TabPrototype'

const state = {
    activeUUID: null,
    tabs: [],
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
    addTab({ commit, dispatch }, payload) {
        const uuid = require('uuid').v4()
        let tab = new Tab(uuid).getStruct()

        commit('addTabs_', [tab])

        if( payload.selectOnCreation )
        {
            dispatch('selectTab', uuid)
        }
    },

    deleteTab({ commit, dispatch }, payload) {
        let index = false

        for (let i = 0; i < state.tabs.length; i++)
        {
            if( state.tabs[i].UUID === payload)
            {
                index = i
                break
            }
        }

        if(state.activeUUID === payload && state.tabs.length <= 1)
        {
            console.log('Close App')
            commit('deleteTab_', index)
        }
        else
        {
            commit('deleteTab_', index)

            if(state.activeUUID === payload)
            {
                let newIndex = index > 0 ? index - 1 : 0
                dispatch('selectTab', state.tabs[newIndex].UUID)
            }
        }
    },

    selectTab({ commit, state, getters }, payload) {

        let oldIndex = false
        let newIndex = false

        for (let i = 0; i < state.tabs.length; i++)
        {
            if( !oldIndex && state.tabs[i].UUID === state.activeUUID) oldIndex = i
            if( !newIndex && state.tabs[i].UUID === payload) newIndex = i
        }

        if( oldIndex !== false )
        {
            // Saves all progress of the document module to it's counterpart in the tabs array
            commit('documentToBackground_', {
                index: oldIndex,
                data: getters.__FLUSH_DOCUMENT__,
            })
        }

        if( newIndex !== false )
        {
            // Loads all data of a chosen tab in the tabs array into the document
            // ref: Document module
            commit('documentToForeground_', {
                data: state.tabs[newIndex],
            })
            
            // Vuex does not allow me to make this private so here's a note:
            // DO NOT USE setActiveUUID__ ANYWHERE ELSE!!!
            commit('setActiveUUID__', state.tabs[newIndex].UUID)
        }
    },
}

const mutations = {
    addTabs_: (state, param) => {
        state.tabs.push( ...param )
    },
    deleteTab_: (state, param) => {
        state.tabs.splice(param, 1)
    },
    documentToBackground_: (state, param) => {
        let cloneDeep = require('lodash.clonedeep')
        if( param.data.meta.isGhost === false )
        {
            state.tabs[param.index] = cloneDeep(param.data)
        }
    },
    setActiveUUID__: (state, param) => {
        if( typeof param === 'string' ) state.activeUUID = param
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}