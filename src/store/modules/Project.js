import { EventBus } from '../../assets/js/event-bus'
import Dialog from '../../assets/js/dialog'
import TabStruct from '../../classes/TabStruct'
import { promises as fs } from 'fs'

const cloneDeep = require('lodash.clonedeep')

const state = {
    activeUUID: null,
    history: [],
    tabs: [], // TODO: rename to editors
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

    getProperty: (state) => (uuids) => {

        let getStructures = (query, uuids) => {

            let structures = []
            
            for (let child of query)
            {

                if( uuids.includes(child.uuid) )
                {
                    // Removing nested children / flatten the return
                    let modifiedChild = cloneDeep(child)

                    if( modifiedChild.hasOwnProperty('children') )
                    {
                        delete modifiedChild.children
                    }

                    structures.push(modifiedChild)
                }

                // ToDo: Optimize
                // remove found uuid from uuids and check if uuids empty
                // -> prevents unnecessary recursive calls

                if( child.hasOwnProperty('children') )
                {
                    structures.push(...getStructures(child.children, uuids))
                }
            }

            return structures
        }

        let selections = getStructures(state.document.structures.children, uuids)
        let properties = {}

        for (const selection of selections)
        {
            for (const prop in selection)
            {
                if( !properties.hasOwnProperty(prop) )
                {
                    if( !['uuid', 'id'].includes(prop) )
                    {
                        properties[prop] = selection[prop]
                    }
                }
                else
                {

                }
            }
        }

        console.log(properties)

        return properties
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

        if( payload.view )
        {
            tab.ui.view = payload.view
        }

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
        
        let uuidGen = require('uuid')
        let path = state.document.structures
        let isValid = true



        // Checks for trace but still continous because of inserion methods start / end
        if( !payload.trace )
        {
            isValid = false
            payload.trace = ''
        }



        // String to array
        payload.trace = payload.trace.split('-')

        // Cleans up Trace
        if( ['start','end'].includes(payload.position) )
        {
            payload.trace = []
        }



        // check if trace is traverable
        for (const i of payload.trace)
        {
            if( path.children && path.children[parseInt(i)] )
            {
                path = path.children[parseInt(i)]
            }
            else
            {
                isValid = false
                break
            }
        }



        // Recursively assign uuid if not already in place
        let assignUUID = (element) => {

            // Am I stupid or is there just no
            // other way to remove the observer
            element = cloneDeep(element)

            if( !element.uuid )
            {
                element.uuid = uuidGen.v4()
            }

            for (let i = 0; i < element.children.length; i++)
            {
                element.children[i] = assignUUID(element.children[i])
            }

            return element
        }
        
        payload.element = assignUUID(payload.element)

        

        // isValod or insertion method start / end
        if( isValid || ['start','end'].includes(payload.position) )
        {
            commit('setChanged_', true)
            commit('setBackgroundChanged_', {index: getters.activeIndex , changed: true})
            commit('insertStructure_', { trace: payload.trace, position: payload.position, element: payload.element })
        }
    },

    deleteStructures({ commit, state, getters }, payload) {
        for (let trace of payload.traces)
        {
            let path = state.document.structures
            let isValid = true

            // String to array
            trace = trace.split('-')

            // check if trace is traverable
            for (const i of trace)
            {
                if( path.children && path.children[parseInt(i)] )
                {
                    path = path.children[parseInt(i)]
                }
                else
                {
                    isValid = false
                    break
                }
            }
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

    setSelectedStructures({ commit, state }, payload) {
        
        if( !payload.uuids )
        {
            return
        }

        commit('selectStructures_', { uuids: [...payload.uuids], clearPrevious: true })
    },

    addSelectedStructures({ commit, state }, payload) {
        
        if( !payload.uuids )
        {
            return
        }

        commit('selectStructures_', { uuids: [...payload.uuids], clearPrevious: false })
    },

    deselectStructures({ commit, state }, payload) {
        
        if( !payload.uuids || payload.uuids.length === 0 )
        {
            commit('deselectStructures_', { deselectAll: true })
        }
        else
        {
            commit('deselectStructures_', { uuids: [...payload.uuids] })
        }
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

        // Inject routine if inserted at start of document
        else if(param.position === 'start')
        {
            location.children.unshift(JSON.parse(JSON.stringify(param.element)))
        }

        // Inject routine if inserted at end of document
        else if(param.position === 'end')
        {
            location.children.push(JSON.parse(JSON.stringify(param.element)))
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

    selectStructures_: (state, param) => {
        if( param.clearPrevious )
        {
            state.document.ui.selectedStructures = []
        }

        state.document.ui.selectedStructures.push(...param.uuids)

        EventBus.$emit('structure-selected', state.document.ui.selectedStructures)
    },

    deselectStructures_: (state, param) => {

        if( param.deselectAll === true )
        {
            state.document.ui.selectedStructures = []
        }
        else
        {
            for (const uuid of param.uuids) {
                let i = state.document.ui.selectedStructures.indexOf(uuid)
    
                if( i >= 0 )
                {
                    state.document.ui.selectedStructures.splice(i, 1)
                }
            }
        }

        EventBus.$emit('structure-selected', state.document.ui.selectedStructures)
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