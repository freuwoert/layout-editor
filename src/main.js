import Vue from 'vue'
import App from './App.vue'
import store from '@/store/store'
import { EventBus } from '@/assets/js/event-bus'

import { mapGetters, mapActions } from 'vuex'

// GLOBAL REQUIREMENTS
const $ = require('jquery')
const emmet = require('emmet')
const Fuse = require('fuse.js')
const anime = require('animejs')
const pretty = require('pretty')
const Prism = require('prismjs')
const Toast = require('@/assets/js/modules/toast.js')
const settings = require('electron-settings')
const Mousetrap = require('mousetrap')
const remote = require('electron').remote






Vue.config.productionTip = false

const app = new Vue({
    el: '#app',
    store,
    computed: {
        ...mapGetters([
            'vAppInfo',
            'GENERAL_UI',
        ]),
    },
    methods: {
        ...mapActions([
            'saveFile',
        ])
    },
    mounted() {
        EventBus.$on('save', () => {
            this.saveFile()
        })
        EventBus.$on('force-save', () => {
            this.saveFile({force: true})
        })
    },
    render: h => h(App)
})

/////////////////////
// keyboard events //
/////////////////////

Mousetrap.bind(['ctrl+s','command+s'],                  function(){ EventBus.$emit('save') })
Mousetrap.bind(['ctrl+shift+s','command+shift+s'],      function(){ EventBus.$emit('force-save') })
Mousetrap.bind(['del','backspace'],                     function(){ EventBus.$emit('delete') })


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