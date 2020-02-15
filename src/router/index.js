import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import AssetStore from '../views/Asset_Store.vue'
import LayoutCreator from '../views/Layout_Creator.vue'
import LayoutEditor from '../views/Layout_Editor.vue'
import ProjectManager from '../views/Project_Manager.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },{
        path: '/asset_store',
        name: 'AssetStore',
        component: AssetStore
    },{
        path: '/layout_creator',
        name: 'LayoutCreator',
        component: LayoutCreator
    },{
        path: '/layout_editor',
        name: 'LayoutEditor',
        component: LayoutEditor
    },{
        path: '/project_manager',
        name: 'ProjectManager',
        component: ProjectManager
    }
]

const router = new VueRouter({
    routes
})

export default router
