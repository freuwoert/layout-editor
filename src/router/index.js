import Vue from 'vue'
import VueRouter from 'vue-router'

import Landing from '../views/landing/Landing.vue'
import AssetStore from '../views/asset-store/AssetStore.vue'
import LayoutCreator from '../views/layout-creator/LayoutCreator.vue'
import ProjectManager from '../views/project-manager/ProjectManager.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'VIEW:LANDING',
        component: Landing
    },{
        path: '/asset_store',
        name: 'VIEW:ASSET_STORE',
        component: AssetStore
    },{
        path: '/layout_creator',
        name: 'VIEW:LAYOUT_CREATOR',
        component: LayoutCreator
    },{
        path: '/project_manager',
        name: 'VIEW:PROJECT_MANAGER',
        component: ProjectManager
    }
]

const router = new VueRouter({
    routes
})

export default router
