<template>
    <div id="app">
        <header class="titlebar">
            <div class="drag-area">
                <div class="window-title">
                    <div class="tab-container">
                        <div class="tab active">
                            <div class="change-dot"></div>
                            <div class="title">Untitled Project</div>
                        </div>
                        <div class="tab" :key="i" v-for="(tab, i) in tabHandles" :class="{'active' : tab.UUID === activeUUID}">
                            <div class="change-dot" :class="{'active' : tab.changed}"></div>
                            <div class="title" @click="selectTab(tab.UUID)">{{tab.name}}</div>
                            <div class="close" @click="deleteTab(tab.UUID)">&#983382;</div>
                        </div>
                    </div>
                </div>
                <div class="window-controls">
                    <div class="tb-button" id="min-button">
                        <div class="icon">&#983924;</div>
                    </div>
                    <div class="tb-button" id="max-button">
                        <div class="icon">&#983345;</div>
                    </div>
                    <div class="tb-button" id="restore-button">
                        <div class="icon">&#983351;</div>
                    </div>
                    <div class="tb-button" id="close-button">
                        <div class="icon">&#983382;</div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Preloader -->
        <div id="preloader">
            <div class="logo"></div>
            <spinner class="spinner" color="white" stroke="4"></spinner>
        </div>

        <!-- Views -->
        <view-landing v-if="!activeUUID"></view-landing>

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
                'tabHandles',
                'settingsUI',
                'view',
                'activeUUID',
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
        },
        mounted() {
        },
    }
</script>
