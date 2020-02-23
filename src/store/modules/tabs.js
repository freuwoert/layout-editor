import router from './../../router'

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
    tabs: (state) => state.TABS,
    activeTab: (state) => state.ACTIVE_TAB,
    prototypeTab: (state) => state.TAB_PROTOTYPE,
}

const actions = {
    initializeTab({ commit, getters }, callback) {
        commit( 'addTabs', {
            tabs: [getters.prototypeTab],
            callback: (ID) => {
                callback(ID)
            }
        })
    },
    addTab({ commit, getters }, callback) {
        commit( 'addTabs', {
            tabs: [getters.prototypeTab],
            callback: (ID) => {
                callback(ID)
            }
        })
    },
    selectTab({ commit, getters}, ID) {
        if(ID < getters.allTabHandles.length)
        {
            let newTab = getters.tabs[ID]
            let currentTab = getters.tabs[getters.activeTab]

            commit('setTab', { TAB: currentTab, ID })
            commit('setActiveTab', { TAB: newTab, ID })

            if( router.currentRoute.name !== newTab.VIEW )
            {
                if( getters.allViewHandles.includes(newTab.VIEW) )
                {
                    router.push({name: newTab.VIEW})
                }
            }
        }
    },
    setViewOfTab({ commit, getters}, payload) {
        commit('setView', { VIEW: payload.view, ID: payload.ID})

        if( router.currentRoute.name !== payload.view )
        {
            if( getters.allViewHandles.includes(payload.view) )
            {
                router.push({name: payload.view})
            }
        }
    },
}

const mutations = {
    addTabs: (state, param) => {
        state.TABS.push(...param.tabs)
        param.callback(state.TABS.length-1)
    },
    setTab: (state, param) => {
        state.TABS[param.ID] = param.TAB
    },
    setActiveTab: (state, param) => {
        state.ACTIVE_TAB = param.ID
        state.TAB = param.TAB
    },
    setView: (state, param) => {
        state.TABS[param.ID].VIEW = param.VIEW

        if(state.ACTIVE_TAB == param.ID)
        {
            state.TAB.VIEW = param.VIEW
        }
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}