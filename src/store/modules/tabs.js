const state = {
    ACTIVE_TAB: 0,
    TAB: {},
    TABS: [],
    TAB_TEMPLATE: {
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
    },
}

const getters = {}

const actions = {}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations,
}