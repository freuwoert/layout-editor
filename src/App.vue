<template>
    <div id="app">
        <header class="titlebar">
            <div class="drag-area">
                <div class="window-title">
                    <div class="tab-container">
                        <div class="tab" :key="id" v-for="(tab, id) in allTabHandles" :class="{'active' : id == activeTabID}">
                            <div class="change-dot" :class="{'active' : tab.CHANGED}"></div>
                            <span class="title" @click="selectTab(id)">{{tab.NAME}}</span>
                            <div class="close" :onclick="'closeTab('+id+')'">&#61782;</div>
                        </div>
                        <div class="create" @click="addTab((ID)=>{selectTab(ID)})">&#62485;</div>
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

        <div id="preloader">
            <div class="logo"></div>
            <spinner class="spinner" color="white" stroke="4"></spinner>
        </div>

        <router-view/>

        <settings v-show="settings_ui"></settings>
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

    export default {
        computed: {
            ...mapGetters([
                'allTabHandles',
                'settings_ui',
                'activeTabID',
            ]),
        },
        methods: {
            ...mapActions([
                'addTab',
                'selectTab',
            ]),
        },
        components: {
            Settings,
            ReleaseNotes,
            Spinner,
        }
    }
</script>
