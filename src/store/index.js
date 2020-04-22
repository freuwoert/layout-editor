import Vue from 'vue'
import Vuex from 'vuex'
import AppInfo from './modules/AppInfo'
import Document from './modules/Document'
import Structures from './modules/Structures'
import Styles from './modules/Styles'
import Tabs from './modules/Tabs'
import UI from './modules/UI'
import UserInfo from './modules/UserInfo'
import Views from './modules/Views'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        AppInfo,
        Document,
        UserInfo,
        UI,
        Styles,
        Structures,
        Tabs,
        Views,
    }
})
