<template>
    <div id="app">
        <header class="titlebar">
            <div class="drag-area">
                <div class="window-title">
                    <div class="tab-container">
                        <div class="tab" :key="id" v-for="(tab, id) in TABS" :class="{'active' : id == ACTIVE_TAB}">
                            <div class="change-dot" :class="{'active' : tab.CHANGED}"></div>
                            <span class="title" :onclick="'selectTab('+id+')'">{{tab.NAME}}</span>
                            <div class="close" :onclick="'closeTab('+id+')'">&#61782;</div>
                        </div>
                        <div class="create" onclick="newTab()">&#62485;</div>
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
            <svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
            </svg>
        </div>

        <router-view/>
    </div>
</template>

<style lang="sass">
    @import '@/assets/sass/app.sass'
</style>

<script>
export default {
    data: () => {
        return {
            ACTIVE_TAB: 0,
            TABS: [
                {
                    IS_DUMMY: false,
                    UI: {
                        code: false,
                        structureAdd: false,
                        styleAdd: false,
                        stylePropAdd: false,
                    },
                    UI_DATA: {
                        // STRUCTURE ADD
                        structureAddTrace: '',
                        structureAddDirection: '',
                        structureAddSearch: '',
                        structureAddSearchSelected: 0,
                        structureAddSearchItems: [],

                        // STYLE ADD
                        styleAddTrace: '',
                        styleAddDirection: '',
                        styleAddInput: '',

                        // STYLE PROP ADD
                        styleAddPropTrace: '',
                        styleAddPropFocus: 0,
                        styleAddPropName: '',
                        styleAddPropValue: '',

                        // GENERATED CODE
                        html: '',
                        css: '',
                    },
                    VIEW: 'VIEW:HOME', // PROD
                    NAME: 'New Tab',
                    DOCUMENT: {
                        HTML: { children: [] },
                        CSS: { children: [] },
                    },
                    VIEWPORT: {
                        X: 300,
                        Y: 600,
                        SCALE: 1,
                        DECOUPLED: false,
                        CONTENT: '',
                    },
                    FOCUSED_PANEL: 'STRUCTURE',
                    FOCUSED_HTML: '0',
                    FOCUSED_CSS: '0',
                    HTML_OL: [],
                    CSS_OL: [],
                    SAVE_PATH: null,
                    CHANGED: false,
                }
            ]
        }
    }
}
</script>
