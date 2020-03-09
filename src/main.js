import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { mapGetters, mapActions } from 'vuex'

// GLOBAL REQUIREMENTS
const $ = require('jquery')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const emmet = require('emmet')
const Fuse = require('fuse.js')
const anime = require('animejs')
const pretty = require('pretty')
const Prism = require('prismjs')
const Toast = require('@/assets/js/modules/toast.js')
const settings = require('electron-settings')
const Mousetrap = require('mousetrap')
const colorConvert = require('color-convert')
const remote = require('electron').remote
const { dialog } = require('electron').remote
const { ipcRenderer } = require('electron')





Vue.config.productionTip = false

const app = new Vue({
    el: '#app',
    router,
    store,
    methods: {
        ...mapActions([])
    },
    computed: {
        ...mapGetters([
            'vAppInfo',
            'GENERAL_UI'
        ]),
    },
    created(){
    },
    // watch: {
    //     'TAB': {
    //         deep: true,
    //         handler(){
    //             if(this.ACTIVE_TAB < this.TABS.length)
    //             {
    //                 if(this.TAB.VIEW == 'EDIT')
    //                 {
    //                     this.TAB.NAME = (this.TAB.SAVE_PATH != null) ? path.parse(this.TAB.SAVE_PATH).name : 'Untitled Layout'
    //                 }

    //                 this.TABS[this.ACTIVE_TAB] = unlink(this.TAB)
    //             }
    //         }
    //     },
    //     'TAB.DOCUMENT': {
    //         deep: true,
    //         handler(){
    //             this.TAB.HTML_OL = flattenObject(this.TAB.DOCUMENT.HTML.children)
    //             this.TAB.CSS_OL = flattenObject(this.TAB.DOCUMENT.CSS.children)
    //             updateCoupledViewport()
    //             //console.log('CHANGED')
    //         }
    //     },
    // },
    // mounted() {
    //     this.TAB.HTML_OL = flattenObject(this.TAB.DOCUMENT.HTML.children)
    //     this.TAB.CSS_OL = flattenObject(this.TAB.DOCUMENT.CSS.children)

    //     this.AVAILABLE_STRUCTURES.push(...HTML_ROOT_STRUCTURES)
    // },
    render: h => h(App)
})



// When document has loaded, initialise
document.onreadystatechange = () => {
    if (document.readyState === 'complete')
    {
        handleWindowControls()

        // Show release notes after update
        if (settings.get('currentVersion') !== app.vAppInfo)
        {
            app.GENERAL_UI.releaseNote = true
            settings.set('currentVersion', app.vAppInfo)
        }

        setTimeout(() => {
            document.getElementById('preloader').classList.add('loaded')
        }, app.GENERAL_UI.loadDelay)
    }
}

function handleWindowControls ()
{
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener('click', event => {
        remote.getCurrentWindow().minimize()
    })

    document.getElementById('max-button').addEventListener('click', event => {
        remote.getCurrentWindow().maximize()
    })

    document.getElementById('restore-button').addEventListener('click', event => {
        remote.getCurrentWindow().unmaximize()
    })

    document.getElementById('close-button').addEventListener('click', event => {
        remote.getCurrentWindow().close()
    })

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    if (remote.getCurrentWindow().isMaximized())
    {
        document.body.classList.add('maximized')
    }
    else
    {
        document.body.classList.remove('maximized')
    }

    remote.getCurrentWindow().on('maximize', function () {
        if (remote.getCurrentWindow().isMaximized())
        {
            document.body.classList.add('maximized')
        }
        else
        {
            document.body.classList.remove('maximized')
        }
    })

    remote.getCurrentWindow().on('unmaximize', function () {
        if (remote.getCurrentWindow().isMaximized())
        {
            document.body.classList.add('maximized')
        }
        else
        {
            document.body.classList.remove('maximized')
        }
    })
}