import Vue from 'vue'
import Vuex from 'vuex'
import app_info from './modules/app-info'
import user_info from './modules/user-info'
import ui from './modules/ui'
import styles from './modules/styles'
import structures from './modules/structures'
import tabs from './modules/tabs'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        app_info,
        user_info,
        ui,
        styles,
        structures,
        tabs,
    }
})
