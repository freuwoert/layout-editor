import { EventBus } from '../../assets/js/event-bus'
import Dialog from '../../assets/js/dialog'
import TabStruct from '../../classes/TabStruct'
import { promises as fs } from 'fs'

const state = {
    activeUUID: null,
    tabs: [],
    document: new TabStruct().getStruct()
}

const getters = {

    //////////
    // Tabs //
    //////////

    tabHandles: (state) => {
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

    activeIndex: (state) => {

        let index = false
        // get active index
        for (let i = 0; i < state.tabs.length; i++)
        {
            if(state.tabs[i].UUID === state.activeUUID)
            {
                index = i
                break
            }
        }

        return index
    },



    //////////////
    // Document //
    //////////////

    getProperty: (state) => (trace) => {

        let getFromTrace = (trace) => {

            trace = trace.toString()
            trace = trace.split('-')

            for (let i = 0; i < trace.length; i++)
            {
                trace[i] = parseInt(trace[i])
            }

            let path = 'state.document.structures'
            let location = null

            for (const i of trace) {
                path += '.children['+i+']'
            }

            location = eval(path)

            return location ? location : false
        }

        return getFromTrace(trace)
    },

    activeUUID: (state) => state.document.UUID,
    selectedStructures: (state) => state.document.ui.selectedStructures,
    docStructures: (state) => state.document.structures,
    viewport: (state) => state.document.viewport,
    savePath: (state) => state.document.meta.savePath,
    view: (state) => state.document.ui.view,
}

const actions = {

    //////////
    // Tabs //
    //////////

    addTab({ commit, dispatch }, payload) {
        const uuid = require('uuid').v4()
        let tab = new TabStruct(uuid).getStruct()

        commit('addTabs_', [tab])

        if( payload.selectOnCreation )
        {
            dispatch('selectTab', uuid)
        }
    },

    deleteTab({ commit, state, dispatch }, payload) {
        let index = false

        for (let i = 0; i < state.tabs.length; i++)
        {
            if( state.tabs[i].UUID === payload)
            {
                index = i
                break
            }
        }

        if( state.activeUUID === payload && state.tabs.length <= 1 )
        {
            console.log('Close App')
            commit('deleteTab_', index)
        }
        else
        {
            commit('deleteTab_', index)

            if( state.activeUUID === payload )
            {
                let newIndex = index > 0 ? index - 1 : 0
                dispatch('selectTab', state.tabs[newIndex].UUID)
            }
        }
    },

    selectTab({ commit, state }, payload) {

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
                data: state.document,
            })
        }

        if( newIndex !== false )
        {
            // Loads all data of a chosen tab in the tabs array into the document
            // ref: Document module
            commit('documentToForeground_', {
                data: state.tabs[newIndex],
            })
        }
    },



    //////////////
    // Document //
    //////////////

    insertStructure({ commit, state, getters }, payload) {

        let path = state.document.structures
        let isValid = true

        if( !payload.trace ) return

        payload.trace = payload.trace.split('-')

        // convert strings to integers
        for (let i = 0; i < payload.trace.length; i++)
        {
            payload.trace[i] = parseInt(payload.trace[i])
        }

        // check if trace is traverable
        for (const i of payload.trace)
        {
            if( path.children && path.children[i] )
            {
                path = path.children[i]
            }
            else
            {
                isValid = false
                break
            }
        }

        if( isValid )
        {
            commit('setChanged_', true)
            commit('setBackgroundChanged_', {index: getters.activeIndex , changed: true})
            commit('insertStructure_', { trace: payload.trace, position: payload.position, element: payload.element })
        }
    },

    setProperty({ commit, getters }, payload) {

        let reformTrace = (trace) => {

            trace = trace.toString()
            trace = trace.split('-')

            for (let i = 0; i < trace.length; i++)
            {
                trace[i] = parseInt(trace[i])
            }

            return trace
        }

        

        if( payload.hasOwnProperty('text') )
        {
            for (const trace of payload.selectedStructures)
            {
                commit('setPropertyText_', { trace: reformTrace(trace), text: payload.text })
            }

            commit('setChanged_', true)
            commit('setBackgroundChanged_', {index: getters.activeIndex , changed: true})
        }

        
    },

    setSelectedStructures({ commit }, payload) {
        if( !payload.trace.toString() ) return

        EventBus.$emit('structure-selected', [payload.trace])

        commit('setSelectedStructures_', { trace: payload.trace })
    },

    setView({ commit }, payload) {
        commit('setView_', payload)
    },

    setViewportSize({ commit }, payload) {
        commit('setViewportSize_', {x: payload.x, y: payload.y})
    },

    rotateCoupledViewport({ commit }) {
        commit('rotateCoupledViewport_')
    },

    toggleDecoupleViewport({ commit }) {
        commit('toggleDecoupleViewport_')
    },



    ///////////
    // Mixes //
    ///////////

    async saveFile({ commit, state, getters }, payload) {

        if( !payload ) payload = { uuid: false, savePath: false, force: false }

        let index = getters.activeIndex
        let uuid = payload.uuid ? payload.uuid : state.activeUUID
        let isActive = state.activeUUID === uuid ? true : false

        let savePath = payload.savePath ? payload.savePath : state.tabs[index].meta.savePath

        // Execute only when no savePath is chosen or forced reselection
        if( !savePath || payload.force )
        {
            savePath = await Dialog.saveDialog()

            commit('setBackgroundSavePath_', {index, savePath})
            if( isActive ) commit('setSavePath_', savePath)
        }

        try {
            await fs.writeFile(savePath, JSON.stringify(state.document))

            commit('setBackgroundChanged_', {index, changed: false})
            if( isActive ) commit('setChanged_', false)
        }
        catch(error) {
            console.error(error)
        }
    },

    async chooseSavePath({ commit, getters }) {
        let index = getters.activeIndex
        let savePath = await Dialog.saveDialog()

        commit('setBackgroundSavePath_', {index, savePath})
        commit('setSavePath_', savePath)
    },
}

const mutations = {

    //////////
    // Tabs //
    //////////

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

    setBackgroundSavePath_: (state, param) => {
        state.tabs[param.index].meta.savePath = param.savePath
    },

    setBackgroundChanged_: (state, param) => {
        state.tabs[param.index].meta.changed = param.changed
    },



    //////////////
    // Document //
    //////////////

    documentToForeground_: (state, param) => {
        let cloneDeep = require('lodash.clonedeep')
        state.document = cloneDeep(param.data)
        if( typeof param.data.UUID === 'string' ) state.activeUUID = param.data.UUID
    },

    insertStructure_: (state, param) => {

        let path = 'state.document.structures'
        let location = null
        let injectPosition = 0

        // Get inject position if element shall be inserted below
        if( param.position === 'below' )
        {
            injectPosition = param.trace.pop()
        }

        // Build JS path
        for (const i of param.trace) 
        {
            path += '.children['+i+']'
        }

        // Evaluate it
        location = eval(path)

        // Inject routine if inserted in element
        // TODO: needs check for closed tags
        if(param.position === 'insert')
        {
            location.children.unshift(JSON.parse(JSON.stringify(param.element)))
        }
        // Inject routine if inserted below element
        else if(param.position === 'below')
        {
            location.children.splice(injectPosition+1, 0, JSON.parse(JSON.stringify(param.element)))
        }
    },

    setPropertyText_: (state, param) => {

        let path = 'state.document.structures'
        let structure = null

        for (const i of param.trace) {
            path += '.children['+i+']'
        }

        structure = eval(path)

        if( structure && structure.hasOwnProperty('text') )
        {
            structure.text = param.text
        }
    },

    setSelectedStructures_: (state, param) => {
        state.document.ui.selectedStructures = [param.trace.toString()]
    },

    setView_: (state, params) => {
        state.document.ui.view = params.view
    },

    setSavePath_: (state, param) => {
        state.document.meta.savePath = param
    },

    setViewportSize_: (state, param) => {
        if(param.x) state.document.viewport.x = parseInt(param.x)
        if(param.y) state.document.viewport.y = parseInt(param.y)
    },

    rotateCoupledViewport_: (state) => {
        let x = JSON.parse(JSON.stringify(state.document.viewport.x))
        state.document.viewport.x = JSON.parse(JSON.stringify(state.document.viewport.y))
        state.document.viewport.y = x
    },

    toggleDecoupleViewport_: (state) => {
        state.document.viewport.decoupled = !state.document.viewport.decoupled
    },

    setChanged_: (state, param) => {
        state.document.meta.changed = param
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}