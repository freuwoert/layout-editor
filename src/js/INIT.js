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
        GENERAL_UI: {
            login: false,
            settings: false,
            releaseNote: false,
            activeSetting: 'INFO',
        },
        AVAILABLE_STRUCTURES: [
            {name: 'button', type: 'tag', structure: [], origin: 'ROOT'},
            {name: 'strong', type: 'tag', structure: [], origin: 'ROOT'},
            {name: 'input', type: 'tag', structure: [], origin: 'ROOT'},
            {name: 'form', type: 'tag', structure: [], origin: 'ROOT'},
            {name: 'html', type: 'tag', structure: [], origin: 'ROOT'},
            {name: 'body', type: 'tag', structure: [], origin: 'ROOT'},
            {name: 'span', type: 'tag', structure: [], origin: 'ROOT'},
            {name: 'img', type: 'tag', structure: [], origin: 'ROOT'},
            {name: 'br', type: 'tag', structure: [], origin: 'ROOT'},
            {name: 'a', type: 'tag', structure: [], origin: 'ROOT'},
            {name: 'b', type: 'tag', structure: [], origin: 'ROOT'},
            {name: 'i', type: 'tag', structure: [], origin: 'ROOT'},
        ],
        A: 0,
        TAB: [
            {
                UI: {
                    structureAdd: false,
                },
                UI_DATA: {
                    structureAddTrace: '',
                    structureAddSearch: '',
                    structureAddTags: []
                },
                VIEW: 'EDIT',
                NAME: 'Unnamed Layout',
                DOCUMENT: {
                    HTML: [
                        {type: 'doctype', attributes: {}, children: []},
                        {
                            type: 'html',
                            attributes: {},
                            children: [
                                {
                                    type: 'BODY',
                                    attributes: {},
                                    children: [
                                        {type: 'span', attributes: {}, children: []},
                                        {type: 'div', attributes: {}, children: [
                                            {type: 'div', attributes: {id: ['TEST']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                        ]},
                                        {type: 'b', attributes: {}, children: []},
                                        {type: 'span', attributes: {}, children: []},
                                        {type: 'div', attributes: {}, children: [
                                            {type: 'div', attributes: {id: ['TEST']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                        ]},
                                        {type: 'b', attributes: {}, children: []},
                                        {type: 'span', attributes: {}, children: []},
                                        {type: 'div', attributes: {}, children: [
                                            {type: 'div', attributes: {id: ['TEST']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                        ]},
                                        {type: 'b', attributes: {}, children: []},
                                        {type: 'span', attributes: {}, children: []},
                                        {type: 'div', attributes: {}, children: [
                                            {type: 'div', attributes: {id: ['TEST']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                        ]},
                                        {type: 'b', attributes: {}, children: []},
                                        {type: 'span', attributes: {}, children: []},
                                        {type: 'div', attributes: {}, children: [
                                            {type: 'div', attributes: {id: ['TEST']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                        ]},
                                        {type: 'b', attributes: {}, children: []},
                                    ]
                                },
                                {type: 'script', attributes: {}, children: []},
                            ]
                        }
                    ],
                    CSS: {},
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
        this.TAB[this.A].HTML_OL = flattenObject(this.TAB[this.A].DOCUMENT.HTML)
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