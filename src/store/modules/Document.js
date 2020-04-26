const state = {
    structures: {
        children: [
            {tag: 'div', classes: ['teet'], id: 'test_1', children: []},
            {tag: 'div', classes: ['container'], id: 'test_2', children: []},
            {tag: 'div', classes: ['bridge','timer'], id: 'test_3', children: [
                {tag: 'div', classes: [], id: 'test_3_1', children: []},
                {tag: 'div', classes: [], id: 'test_3_2', children: []},
                {tag: 'div', classes: [], id: 'test_3_3', children: []},
            ]},
        ]
    }
}

const getters = {
    docStructures: (state) => {
        return state.structures
    }
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
}

const mutations = {
    insertStructure_: (state, param) => {

        let path = 'state.structures'
        let location = null

        for (const i of param.trace) {
            path += '.children['+i+']'
        }

        location = eval(path)

        if(param.position === 'insert')
        {
            location.children.unshift(JSON.parse(JSON.stringify(param.element)))
        }
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}