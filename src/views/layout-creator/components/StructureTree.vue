<template>
    <div class="structure-tree" :trace="trace" :class="insertPos">
        <div class="attribute-container" :trace="trace" @drop="drop($event)" @dragover="drapOver($event)" @dragenter="dragEnter('drag-insert')" @dragleave="dragLeave()">
            <span class="label">{{structure.tag}}</span>
            <!-- <span class="attr" v-for="(attribute, i) in attributes" :key="i">
                &nbsp;{{attribute.label}}<span class="deco">=</span><span class="string">"{{attribute.value.join(' ')}}"</span>
            </span> -->
        </div>
        <div class="children-container" v-if="structure.children.length > 0">
            <structure-tree v-for="(child, id) in structure.children" :key="id" :trace="trace+'-'+id" :structure="child"></structure-tree>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'structure-tree',
        props: {
            structure: {
                required: true,
                type: Object
            },
            trace: {},
        },
        data() {
            return {
                insertPos: null
            }
        },
        computed: {
            ...mapGetters([
                'dragElement',
                'availableStructures',
            ]),
        },
        methods: {
            ...mapActions([
                'insertStructure',
            ]),
            drop(event) {
                if( this.dragElement.type === 'structure' )
                {
                    let elementId = this.dragElement.element

                    if( this.availableStructures.hasOwnProperty(elementId) )
                    {
                        this.insertStructure({trace: this.trace+'', position: 'insert', element: this.availableStructures[elementId]})
                    }
                }

                this.insertPos = null
            },
            drapOver(event) {
                event.preventDefault()
            },
            dragEnter(pos) {
                this.insertPos = pos
            },
            dragLeave() {
                this.insertPos = null
            },
        },
        mounted() {
        },
    }
</script>
<style lang="sass" scoped>
    .structure-tree
        width: 100%
        user-select: none
        font-family: 'SCP'

        .label
            display: inline-block
            line-height: 18px
            color: var(--red)
            text-transform: lowercase
            font-size: 12px

        .attribute-container
            text-align: left
            display: block
            box-sizing: border-box
            height: 20px
            border-radius: 5px
            padding-left: 5px
            font-size: 0
            font-weight: 600
            position: relative
            white-space: nowrap
            overflow: hidden
            border: 1px solid transparent

            &:hover
                background: var(--dark-background)

                .btn-container
                    background: var(--dark-background)
                    display: block !important

            &.selected
                border-color: rgba(255, 255, 255, 0.2)

            .btn-container
                position: absolute
                top: 0
                right: 0
                height: 100%
                line-height: 20px
                display: none

                .btn
                    height: 100%
                    width: 20px
                    line-height: 20px
                    font-size: 15px
                    font-family: 'Material Icons'
                    vertical-align: top
                    text-align: center
                    color: white
                    cursor: pointer
                    font-weight: normal !important

            .attr
                display: inline-block
                line-height: 18px
                color: #e8a666
                text-transform: lowercase
                font-size: 12px

                .string
                    color: #89ca78
                    display: inline
                    font-size: 12px

            .deco
                color: rgba(255, 255, 255, 0.7)
                display: inline
                font-size: 12px

        &.drag-insert > .attribute-container
            border-color: rgba(255, 255, 255, 0.6)
            background: rgba(255, 255, 255, 0.1)

        .children-container
            display: block
            padding: 0 0 0 5px
            margin: 0 0 0 5px
            border-left: 1px solid rgba(255, 255, 255, 0.2)
</style>