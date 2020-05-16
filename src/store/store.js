// Defaults
import Vue from 'vue'
import Vuex from 'vuex'

// Read / Write
//import Document from './modules/Document'
import Tabs from './modules/Tabs'
import User from './modules/User'
import UI from './modules/UI'

// Read only
import Structures from './modules/readonly/Structures'
import IconsMDI from './modules/readonly/IconsMDI'
import Styles from './modules/readonly/Styles'
import Swatches from './modules/readonly/Swatches'
import Software from './modules/readonly/Software'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        // Read / Write
        //Document,
        Tabs,
        User,
        UI,

        // Read only
        IconsMDI,
        Software,
        Structures,
        Styles,
        Swatches,
    }
})
