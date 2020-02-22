const state = {
    ACTIVE_TAB: 0,
    TAB: {},
    TABS: [],
    TAB_PROTOTYPE: {
        IS_GHOST: false,
        UI: {
            generatedCode: false,
            structureAdd: false,
            styleAdd: false,
            stylePropAdd: false,
        },
        UI_DATA: {
            structureAdd: {
                trace: '',
                direction: '',
                search: '',
                searchSelected: 0,
                searchItems: [],
            },
            styleAdd: {
                trace: '',
                direction: '',
                addInput: '',
            },
            styleAddProp: {
                trace: '',
                focus: 0,
                name: '',
                value: '',
            },
            generatedCode: {
                html: '',
                css: '',
            },
        },
        VIEW: 'VIEW:HOME', // PROD
        NAME: 'New Tab',
        DOCUMENT: {
            HTML: { children: [] },
            CSS: { children: [] },
        },
        VIEWPORT: {
            X: 300,
            Y: 600,
            SCALE: 1,
            DECOUPLED: false,
            CONTENT: '',
        },
        FOCUSED_PANEL: 'STRUCTURE',
        FOCUSED_HTML: '0',
        FOCUSED_CSS: '0',
        HTML_OL: [],
        CSS_OL: [],
        SAVE_PATH: null,
        CHANGED: false,
    },
}

const getters = {
    allTabHandles: (state) => {
        let handles = []

        for ( const tab of state.TABS ) {
            handles.push({
                NAME: tab.NAME,
                CHANGED: tab.CHANGED,
            })
        }

        return handles
    },
    tabFromID: (state) => state.TABS,
    activeTab: (state) => state.ACTIVE_TAB,
    prototypeTab: (state) => state.TAB_PROTOTYPE,
}

const actions = {
    initializeTab({ commit, getters }) {
        commit( 'addTabs', [getters.prototypeTab])
    },
    addTab({ commit, getters }) {
        commit( 'addTabs', [getters.prototypeTab])
    },
    selectTab({ commit, getters}, ID) {
        if(ID < getters.allTabHandles.length)
        {
            let newTab = getters.tabFromID[ID]
            let currentTab = getters.tabFromID[getters.activeTab]
            commit('setTab', { TAB: currentTab, ID })
            commit('setActiveTab', { TAB: newTab, ID })
        }
    }
}

const mutations = {
    addTabs: (state, tabs) => {
        state.TABS.push(...tabs)
    },
    setTab: (state, param) => {
        state.TABS[param.ID] = param.TAB
    },
    setActiveTab: (state, param) => {
        state.ACTIVE_TAB = param.ID
        state.TAB = param.TAB
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}