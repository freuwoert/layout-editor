import { EventBus } from '../../assets/js/event-bus'
import TabStruct from '../../classes/TabStruct'

const state = new TabStruct().getStruct()



const getters = {

    // FLUSH give back the entire state
    __FLUSH_DOCUMENT__: (state) => state,

    
    
}



const actions = {
    
}

const mutations = {

    
}

export default {
    state,
    getters,
    actions,
    mutations,
}