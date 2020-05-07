import { EventBus } from '../../assets/js/event-bus'
import TabStruct from '../../classes/TabPrototype'

const state = new TabStruct().getStruct()

const getters = {

    // FLUSH give back the entire state
    __FLUSH_DOCUMENT__: (state) => state,

    docStructures: (state) => {
        return state.structures
    },

    viewport: (state) => {
        return state.viewport
    },

    getProperty: (state) => (trace) => {

        let getFromTrace = (trace) => {

            trace = trace.toString()
            trace = trace.split('-')

            for (let i = 0; i < trace.length; i++)
            {
                trace[i] = parseInt(trace[i])
            }

            let path = 'state.structures'
            let location = null

            for (const i of trace) {
                path += '.children['+i+']'
            }

            location = eval(path)

            return location ? location : false
        }

        return getFromTrace(trace)
    },
    selectedStructures: (state) => state.ui.selectedStructures,
    view: (state) => state.ui.view,
}

const actions = {
    insertStructure({ commit, state }, payload) {

        let path = state.structures
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
            commit('insertStructure_', { trace: payload.trace, position: payload.position, element: payload.element })
        }
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

    setProperty({ commit }, payload) {

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
        }
    },

    setSelectedStructures({ commit }, payload) {
        if( !payload.trace.toString() ) return

        EventBus.$emit('structure-selected', [payload.trace])

        commit('setSelectedStructures_', { trace: payload.trace })
    },

    setView({ commit }, payload) {
        commit('setView_', payload)
    }
}

const mutations = {

    documentToForeground_: (state, param) => {
        let cloneDeep = require('lodash.clonedeep')
        for (const prop of Object.keys(param.data))
        {
            state[prop] = cloneDeep(param.data[prop])
        }
    },

    insertStructure_: (state, param) => {

        let path = 'state.structures'
        let location = null

        for (const i of param.trace) 
        {
            path += '.children['+i+']'
        }

        location = eval(path)

        if(param.position === 'insert')
        {
            location.children.unshift(JSON.parse(JSON.stringify(param.element)))
        }
    },

    setViewportSize_: (state, param) => {
        if(param.x) state.viewport.x = parseInt(param.x)
        if(param.y) state.viewport.y = parseInt(param.y)
    },

    rotateCoupledViewport_: (state) => {
        let x = JSON.parse(JSON.stringify(state.viewport.x))
        state.viewport.x = JSON.parse(JSON.stringify(state.viewport.y))
        state.viewport.y = x
    },

    toggleDecoupleViewport_: (state) => {
        state.viewport.decoupled = !state.viewport.decoupled
    },

    setPropertyText_: (state, param) => {

        let path = 'state.structures'
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
        state.ui.selectedStructures = [param.trace.toString()]
    },

    setView_: (state, params) => {
        state.ui.view = params.view
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}