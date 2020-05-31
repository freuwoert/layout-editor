export default class TabStruct {

    constructor(uuid = '') {
        this.UUID = uuid
        this.meta = {
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
            children: [
                { 
                    children: [],
                    style: {
                        width: {value: 100, unit: 'px'},
                        background: {value: '#ffff45ff'},
                    },
                    classes: ['tom','peter'],
                    id: 'someRandomId1',
                    type: 'tag',
                    tag: 'div',
                    uuid: '39209887-167d-4ab6-ab00-eada0bf2a101',
                },
                { 
                    children: [
                        { 
                            children: [],
                            style: {
                                width: {value: 75, unit: 'px'},
                                background: {value: '#ffff45ff'},
                            },
                            classes: ['tom','peter'],
                            id: 'someRandomId2',
                            type: 'tag',
                            tag: 'div',
                            uuid: '65b6e0fa-ba88-4b2e-907b-e4f26f94673e',
                        }
                    ],
                    style: {
                        width: {value: 100, unit: '%'},
                        background: {value: '#ffff45ff'},
                    },
                    classes: ['peter'],
                    id: 'someRandomId3',
                    type: 'tag',
                    tag: 'span',
                    uuid: '25fea364-929d-42c9-ba44-df45ed1c5919',
                }
            ]
        }
        this.selectors = {

        }
        this.style = {
            children: []
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