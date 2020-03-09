import router from './../../router'
import Tab from './../../classes/Tab'

const state = {
    ACTIVE_TAB: 0,
    TABS: [ new Tab() ],
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
    activeTab: (state) => state.TABS[state.ACTIVE_TAB],
    activeTabID: (state) => state.ACTIVE_TAB,
    prototypeTab: (state) => state.TAB_PROTOTYPE,
    tab: (state) => state.TAB
}

const actions = {
    addTab({ commit }, callback) {
        commit( 'addTabs_', {
            tabs: [new Tab()],
            callback: (ID) => {
                callback(ID)
            }
        })
    },
    selectTab({ commit, getters}, ID) {
        if(ID < getters.allTabHandles.length)
        {
            let tab = getters.tabs[ID]
            commit('setActiveTab_', { ID })

            if( router.currentRoute.name !== tab.VIEW )
            {
                if( getters.allViewHandles.includes(tab.VIEW) )
                {
                    router.push({name: tab.VIEW})
                }
            }
        }
    },
    setTabView({ commit, getters}, payload) {
        commit('setTabView_', { VIEW: payload.view, ID: payload.ID })

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
    addTabs_: (state, param) => {
        state.TABS.push( ...param.tabs )
        param.callback( state.TABS.length-1 )
    },
    setActiveTab_: (state, param) => {
        state.ACTIVE_TAB = param.ID
    },
    setTabView_: (state, param) => {
        state.TABS[param.ID].VIEW = param.VIEW
    },
    setViewport_: (state, param) => {
        if(param.X)         state.TABS[param.ID].VIEWPORT.X = param.X
        if(param.Y)         state.TABS[param.ID].VIEWPORT.Y = param.Y
        if(param.SCALE)     state.TABS[param.ID].VIEWPORT.SCALE = param.SCALE
        if(param.CONTENT)   state.TABS[param.ID].VIEWPORT.CONTENT = param.CONTENT
        if(param.DECOUPLED) state.TABS[param.ID].VIEWPORT.DECOUPLED = param.DECOUPLED
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}