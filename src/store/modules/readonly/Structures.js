const state = {
    availableStructures: {
        'W3:DEFAULT:A:0': { children: [], classes: null, id: null, tag: 'a' },
        'W3:DEFAULT:P:0': { children: [], classes: 'test', id: null, tag: 'p' },
        'W3:DEFAULT:H1:0': { children: [], classes: null, id: null, tag: 'h1' },
        'W3:DEFAULT:H2:0': { children: [], classes: null, id: null, tag: 'h2' },
        'W3:DEFAULT:H3:0': { children: [], classes: null, id: null, tag: 'h3' },
        'W3:DEFAULT:H4:0': { children: [], classes: null, id: null, tag: 'h4' },
        'W3:DEFAULT:H5:0': { children: [], classes: null, id: null, tag: 'h5' },
        'W3:DEFAULT:H6:0': { children: [], classes: null, id: null, tag: 'h6' },
        'W3:DEFAULT:DIV:0': { children: [], classes: null, id: null, tag: 'div' },
        'W3:DEFAULT:SPAN:0': { children: [], classes: null, id: null, tag: 'span' },
        'W3:DEFAULT:IMAGE:0': { children: [], classes: null, id: null, tag: 'img' },
        'W3:DEFAULT:VIDEO:0': { children: [], classes: null, id: null, tag: 'video' },

        'VU:DEFAULT:TEXT:0': { children: [], tag: '', text: '' },
        'VU:DEFAULT:ICON:0': { children: [], tag: 'icon' },
    }
}

const getters = {
    availableStructures: (state) => {
        return state.availableStructures
    }
}

const actions = {}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations,
}