<template>
    <div id="app">
        <header class="titlebar">
            <div class="drag-area">
                <div class="window-title">
                    <div class="tab-container">
                        <div class="tab" :key="i" v-for="(tab, i) in allTabHandles" :class="{'active' : tab.UUID === activeTabID}">
                            <div class="change-dot" :class="{'active' : tab.changed}"></div>
                            <span class="title" @click="selectTab(tab.UUID)">{{tab.name}}</span>
                            <div class="close"  @click="deleteTab(tab.UUID)">&#61782;</div>
                        </div>
                        <div class="create" @click="addTab({selectOnCreation: true})">&#62485;</div>
                    </div>
                </div>
                <div class="window-controls">
                    <div class="tb-button" id="min-button">
                        <div class="icon">&#62324;</div>
                    </div>
                    <div class="tb-button" id="max-button">
                        <div class="icon">&#61745;</div>
                    </div>
                    <div class="tb-button" id="restore-button">
                        <div class="icon">&#61751;</div>
                    </div>
                    <div class="tb-button" id="close-button">
                        <div class="icon">&#61782;</div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Preloader -->
        <div id="preloader">
            <div class="logo"></div>
            <spinner class="spinner" color="white" stroke="4"></spinner>
        </div>

        <span>{{view + ':VIEW'}}</span>

        <!-- Views -->
        <view-landing v-if="view === 'LANDING'"></view-landing>
        <view-asset-store v-if="view === 'ASSET_STORE'"></view-asset-store>
        <view-layout-creator v-if="view === 'LAYOUT_CREATOR'"></view-layout-creator>
        <view-project-manager v-if="view === 'PROJECT_MANAGER'"></view-project-manager>

        <!-- Overlays / Popups -->
        <settings v-show="settingsUI"></settings>
    </div>
</template>

<style lang="sass">
    @import '@/assets/sass/app.sass'
</style>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Settings from './views/settings/Settings.vue'
    import ReleaseNotes from './views/dialogs/ReleaseNotes.vue'
    import Spinner from './views/components/Spinner.vue'

    import ViewLanding from './views/landing/Landing.vue'
    import ViewAssetStore from './views/asset-store/AssetStore.vue'
    import ViewLayoutCreator from './views/layout-creator/LayoutCreator.vue'
    import ViewProjectManager from './views/project-manager/ProjectManager.vue'

    export default {
        computed: {
            ...mapGetters([
                'allTabHandles',
                'settingsUI',
                'view',
                'activeTabID',
            ]),
        },
        methods: {
            ...mapActions([
                'addTab',
                'selectTab',
                'deleteTab',
            ]),
        },
        components: {
            Settings,
            ReleaseNotes,
            Spinner,

            // Views
            ViewLanding,
            ViewAssetStore,
            ViewLayoutCreator,
            ViewProjectManager,
        }
    }
</script>
