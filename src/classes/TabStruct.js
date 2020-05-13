export default class TabStruct {

    constructor(uuid = '') {
        this.UUID = uuid
        this.meta = {
            isGhost: true,
            changed: false,
            name: null,
            savePath: null,
        }
        this.ui = {
            view: null,
            selectedStructures: [],
            focusedStructure: '',
        }
        this.structures = {
            children: [{tag: 'div', classes: ['feuchter-lappen-moritz'], id: 'Test', children: []}]
        }
        this.style = {
            children: [{selector: '.container', children: []}]
        }
        this.viewport = {
            x: 300,
            y: 600,
            scale: 1,
            decoupled: false,
            content: '',
        }

        // When class has been assigned an UUID
        if( this.UUID )
        {
            this.ui.view = 'LANDING'
            this.meta.name = 'New Tab'
            this.meta.isGhost = false
        }
    }

    getStruct() {
        let obj = {}

        for (const prop of Object.keys(this))
        {
            obj[prop] = this[prop]
        }

        return obj
    }
}