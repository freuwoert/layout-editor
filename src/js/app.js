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
            login: false,
            settings: false,
            releaseNote: false,
            activeSetting: 'INFO',
        },
        AVAILABLE_STRUCTURES: [],
        AVAILABLE_STYLES: [],
        ACTIVE_TAB: 0,
        TAB: {
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
            VIEW: 'EDIT',
            NAME: 'Unnamed Layout',
            DOCUMENT: {
                HTML: [
                    {
                        label: 'html',
                        attributes: [],
                        children: [
                            {
                                label: 'head',
                                attributes: [],
                                children: []
                            },
                            {
                                label: 'body',
                                attributes: [],
                                children: [
                                    {
                                        label: 'div',
                                        attributes: [
                                            {
                                                label: 'class',
                                                value: ['container']
                                            }
                                        ],
                                        children: [
                                            {
                                                label: 'div',
                                                attributes: [
                                                    {
                                                        label: 'class',
                                                        value: ['headline']
                                                    }
                                                ],
                                                children: []
                                            }
                                        ]
                                    },
                                    {
                                        label: 'div',
                                        attributes: [
                                            {
                                                label: 'class',
                                                value: ['divider']
                                            }
                                        ],
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ],
                CSS: [
                    {
                        label: '.container',
                        properties: [],
                        children: [
                            {
                                label: '.headline',
                                properties: [
                                    {
                                        label: 'font-size',
                                        value: '16px'
                                    },
                                    {
                                        label: 'color',
                                        value: '#676767'
                                    }
                                ],
                                children: []
                            }
                        ]
                    },
                    {
                        label: '.divider',
                        properties: [],
                        children: []
                    }
                ],
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
        TABS: [
            {
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
                VIEW: 'EDIT',
                NAME: 'Unnamed Layout',
                DOCUMENT: {
                    HTML: [
                        {
                            label: 'html',
                            attributes: [],
                            children: []
                        }
                    ],
                    CSS: [
                        {
                            label: '.test-class-1',
                            properties: [],
                            children: []
                        }
                    ],
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
        ],
    },
    methods: {
    },
    created(){
    },
    watch: {
    },
    mounted() {
        this.TAB.HTML_OL = flattenObject(this.TAB.DOCUMENT.HTML)
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