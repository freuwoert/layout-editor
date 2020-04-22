export default class Tab {

    constructor() {
        this.IS_GHOST = false
        this.UI = {
            generatedCode: false,
            structureAdd: false,
            styleAdd: false,
            stylePropAdd: false,
        }
        this.UI_DATA = {
            structureAdd: {
                trace: '',
                direction: '',
                search: '',
                searchSelected: 0,
                searchItems: [],
            },
            styleAdd: {
                trace: '',
                direction: '',
                addInput: '',
            },
            styleAddProp: {
                trace: '',
                focus: 0,
                name: '',
                value: '',
            },
            generatedCode: {
                html: '',
                css: '',
            },
        }
        this.VIEW = 'VIEW:LANDING' // PROD
        this.NAME = 'New Tab'
        this.DOCUMENT = {
            HTML: { children: [] },
            CSS: { children: [] },
        }
        this.VIEWPORT = {
            X: 300,
            Y: 600,
            SCALE: 1,
            DECOUPLED: false,
            CONTENT: '',
        }
        this.FOCUSED_PANEL = 'STRUCTURE'
        this.FOCUSED_HTML = '0'
        this.FOCUSED_CSS = '0'
        this.HTML_OL = []
        this.CSS_OL = []
        this.SAVE_PATH = null
        this.CHANGED = false
    }
}