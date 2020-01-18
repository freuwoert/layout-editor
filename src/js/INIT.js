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
            {id: 'ROOT:00001', type: 'tag', origin: 'ROOT', name: 'button', layout: []},
            {id: 'ROOT:00002', type: 'tag', origin: 'ROOT', name: 'strong', layout: []},
            {id: 'ROOT:00003', type: 'tag', origin: 'ROOT', name: 'input', layout: []},
            {id: 'ROOT:00004', type: 'tag', origin: 'ROOT', name: 'form', layout: []},
            {id: 'ROOT:00005', type: 'tag', origin: 'ROOT', name: 'html', layout: []},
            {id: 'ROOT:00006', type: 'tag', origin: 'ROOT', name: 'head', layout: []},
            {id: 'ROOT:00007', type: 'tag', origin: 'ROOT', name: 'body', layout: []},
            {id: 'ROOT:00008', type: 'tag', origin: 'ROOT', name: 'span', layout: []},
            {id: 'ROOT:00009', type: 'tag', origin: 'ROOT', name: 'img', layout: []},
            {id: 'ROOT:00010', type: 'tag', origin: 'ROOT', name: 'br', layout: []},
            {id: 'ROOT:00011', type: 'tag', origin: 'ROOT', name: 'a', layout: []},
            {id: 'ROOT:00012', type: 'tag', origin: 'ROOT', name: 'b', layout: []},
            {id: 'ROOT:00013', type: 'tag', origin: 'ROOT', name: 'i', layout: []},
            {id: 'ROOT:00014', type: 'tag', origin: 'ROOT', name: 'div', layout: [{type: 'div', attributes: {class: ['numero-uno']}, children: []}, {type: 'div', attributes: {class: ['numero-dos']}, children: []}]},
        ],
        AVAILABLE_STYLES: [],
        A: 0,
        TAB: [
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
                            type: 'html',
                            attributes: {},
                            children: [
                                {
                                    type: 'BODY',
                                    attributes: {},
                                    children: [
                                        {type: 'span', attributes: {}, children: []},
                                        {type: 'span', attributes: {}, children: []},
                                        {type: 'span', attributes: {}, children: []},
                                        {type: 'span', attributes: {}, children: []},
                                        {type: 'span', attributes: {}, children: []},
                                        {type: 'div', attributes: {}, children: []},
                                        {type: 'div', attributes: {}, children: [
                                            {type: 'div', attributes: {id: ['TEST']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                        ]},
                                        {type: 'div', attributes: {}, children: [
                                            {type: 'div', attributes: {id: ['TEST']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                        ]},
                                        {type: 'div', attributes: {}, children: [
                                            {type: 'div', attributes: {id: ['TEST']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                        ]},
                                        {type: 'div', attributes: {}, children: [
                                            {type: 'div', attributes: {id: ['TEST']}, children: []},
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2']}, children: []},
                                        ]},
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
                                            {type: 'div', attributes: {class: ['test0', 'test1', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2']}, children: []},
                                        ]},
                                    ]
                                },
                            ]
                        }
                    ],
                    CSS: {},
                },
                VIEWPORT: {
                    X: 300,
                    Y: 600,
                    SCALE: 1,
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