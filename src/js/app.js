app = new Vue({
    el:'#app',
    data: {
        info: {
            versionName: 'Founders Update',
            version: require('electron').remote.app.getVersion(),
            apiVersion: '0.1.0',
            electronVersion: process.versions.electron,
            nodeVersion: process.versions.node,
        },
        USER: {
            displayImage: 'src/images/icon/layout_editor_logo.png',
            displayName: 'Maurice Freuwört',
            username: 'freuwoert',
            online: false,
            JWT: null,
        },
        GENERAL_UI: {
            login: false,
            settings: false,
            releaseNote: false,
            activeSetting: 'INFO',
        },
        AVAILABLE_STRUCTURES: [],
        AVAILABLE_STYLES: [],
        ACTIVE_TAB: 0,
        TAB: {},
        TABS: [],
        TAB_TEMPLATE: {
            IS_DUMMY: false,
            UI: {
                structureAdd: false,
                styleAdd: false,
            },
            UI_DATA: {
                structureAddTrace: '',
                structureAddDirection: '',
                structureAddSearch: '',
                structureAddSearchSelected: 0,
                structureAddSearchItems: []
            },
            VIEW: 'START',
            NAME: 'New Layout Editor',
            DOCUMENT: {
                HTML: { children: [
                    {
                        label: 'head',
                        attributes: [],
                        children: []
                    }
                ]},
                CSS: { children: []},
            },
            VIEWPORT: {
                X: 300,
                Y: 600,
                SCALE: 1,
                DECOUPLED: false,
            },
            FOCUSED_PANEL: 'STRUCTURE',
            FOCUSED_HTML: '0',
            FOCUSED_CSS: '0',
            HTML_OL: [],
            CSS_OL: [],
            SAVE_PATH: '',
            CHANGED: false,
        },
    },
    methods: {
    },
    created(){
        if( this.TABS.length == 0 ) this.TABS.push( JSON.parse(JSON.stringify(this.TAB_TEMPLATE)) )
        if( Object.keys(this.TAB).length == 0 ) this.TAB = this.TABS[this.ACTIVE_TAB]
    },
    watch: {
    },
    mounted() {
        this.TAB.HTML_OL = flattenObject(this.TAB.DOCUMENT.HTML.children)
        this.TAB.CSS_OL = flattenObject(this.TAB.DOCUMENT.CSS.children)

        this.AVAILABLE_STRUCTURES.push(...HTML_ROOT_STRUCTURES)
    }
})













/////////////////////////////////////////////////
//               INITIALIZATION                //
/////////////////////////////////////////////////

// When document has loaded, initialise
document.onreadystatechange = () => {
    if (document.readyState == "complete")
    {
        handleWindowControls()

        // Show release notes after update
        if(settings.get('currentVersion') != app.info.version)
        {
            app.GENERAL_UI.releaseNote = true
            settings.set('currentVersion', app.info.version)
        }

        setTimeout(() => {
            document.getElementById('preloader').classList.add('loaded')
        }, 0)



        updateCoupledViewport(`<br><h1 style="color: #0057ff; text-align: center; font-family: 'product sans'">Hello World!</h1>`)

    }
}

function handleWindowControls() {

    let win = remote.getCurrentWindow()

    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize()
    })

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize()
    })

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize()
    })

    document.getElementById('close-button').addEventListener("click", event => {
        win.close()
    })

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    if (win.isMaximized())
    {
        document.body.classList.add('maximized')
    }
    else
    {
        document.body.classList.remove('maximized')
    }

    win.on('maximize', function() {
        if (win.isMaximized())
        {
            document.body.classList.add('maximized')
        }
        else
        {
            document.body.classList.remove('maximized')
        }
    })
    win.on('unmaximize', function() {
        if (win.isMaximized())
        {
            document.body.classList.add('maximized')
        }
        else
        {
            document.body.classList.remove('maximized')
        }
    })

}