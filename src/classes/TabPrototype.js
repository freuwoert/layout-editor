export default class TabPrototype {

    constructor(uuid = '') {
        this.UUID = uuid
        this.meta = {
            ghost: false,
            changed: false,
            name: 'New Tab',
            savePath: '',
        }
        this.ui = {
            view: 'LANDING',
            selectedStructures: [],
            focusedStructure: '',
        }
        this.structures = {
            children: [{tag: 'div', classes: ['container'], id: null, children: []}]
        }
        this.viewport = {
            x: 300,
            y: 600,
            scale: 1,
            decoupled: false,
            content: '',
        }
    }
}