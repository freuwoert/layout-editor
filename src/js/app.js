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
            online: true,
            JWT: null,
        },
        GENERAL_UI: {
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
                styleAdd: false, // PROD
            },
            UI_DATA: {
                structureAddTrace: '',
                structureAddDirection: '',
                structureAddSearch: '',
                structureAddSearchSelected: 0,
                structureAddSearchItems: [],
                styleAddTrace: '',
                styleAddDirection: '',
                styleAddObject: {
                    label: 'Test',
                    properties: [
                        {label: 'font-size', value: '16px'}
                    ]
                },
            },
            VIEW: 'START', // PROD
            NAME: 'New Tab',
            DOCUMENT: {
                HTML: { children: []},
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
            SAVE_PATH: null,
            CHANGED: false,
        },
    },
    methods: {
    },
    computed: {
        savePathName: function (){
            return (this.TAB.SAVE_PATH != null) ? path.parse(this.TAB.SAVE_PATH).base : null
        }
    },
    created(){
        if( this.TABS.length == 0 )
        {
            let blank = JSON.parse(JSON.stringify(this.TAB_TEMPLATE))

            blank.NAME = 'Layout Editor'

            this.TABS.push( blank )
        }

        if( Object.keys(this.TAB).length == 0 )
        {
            this.TAB = JSON.parse(JSON.stringify(this.TABS[this.ACTIVE_TAB]))
        }
    },
    watch: {
        'TAB': {
            deep: true,
            handler(){
                if(this.ACTIVE_TAB < this.TABS.length)
                {
                    if(this.TAB.VIEW == 'EDIT')
                    {
                        this.TAB.NAME = (this.TAB.SAVE_PATH != null) ? path.parse(this.TAB.SAVE_PATH).name : 'Untitled Layout'
                    }

                    this.TABS[this.ACTIVE_TAB] = JSON.parse(JSON.stringify(this.TAB))
                }
            }
        },
        'TAB.DOCUMENT': {
            deep: true,
            handler(){
                this.TAB.HTML_OL = flattenObject(this.TAB.DOCUMENT.HTML.children)
                this.TAB.CSS_OL = flattenObject(this.TAB.DOCUMENT.CSS.children)
                //console.log('CHANGED')
            }
        },
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

    }
}

function handleWindowControls() {

    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        WINDOW().minimize()
    })

    document.getElementById('max-button').addEventListener("click", event => {
        WINDOW().maximize()
    })

    document.getElementById('restore-button').addEventListener("click", event => {
        WINDOW().unmaximize()
    })

    document.getElementById('close-button').addEventListener("click", event => {
        WINDOW().close()
    })

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    if (WINDOW().isMaximized())
    {
        document.body.classList.add('maximized')
    }
    else
    {
        document.body.classList.remove('maximized')
    }

    WINDOW().on('maximize', function() {
        if (WINDOW().isMaximized())
        {
            document.body.classList.add('maximized')
        }
        else
        {
            document.body.classList.remove('maximized')
        }
    })

    WINDOW().on('unmaximize', function() {
        if (WINDOW().isMaximized())
        {
            document.body.classList.add('maximized')
        }
        else
        {
            document.body.classList.remove('maximized')
        }
    })

}