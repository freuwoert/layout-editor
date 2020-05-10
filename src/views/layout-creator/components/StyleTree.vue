<template>
    <div class="structure-tree" :trace="trace" :class="[{'selected': (selectedStructures.includes(trace+''))}, insertPos]">
        <div class="tag-container" :trace="trace" @click="select()" @drop="drop($event)" @dragover="drapOver($event)" @dragenter="dragEnter('drag-insert')" @dragleave="dragLeave()">
            <span class="tag" v-if="structure.selector">
                {{structure.selector}}
            </span>
        </div>



        <div class="children-container" v-if="structure.children.length">
            <style-tree v-for="(child, id) in structure.children" :key="id" :trace="trace+'-'+id" :structure="child"></style-tree>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'style-tree',
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
                'selectedStructures',
            ]),
        },
        methods: {
            ...mapActions([
                'insertStructure',
                'setSelectedStructures',
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
            select() {
                this.setSelectedStructures({trace: this.trace})
            }
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

        .tag-container
            text-align: left
            display: block
            box-sizing: border-box
            height: 24px
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

            .tag
                display: inline-block
                line-height: 22px
                color: var(--red)
                text-transform: lowercase
                font-size: 12px
                pointer-events: none

            .attribute
                display: inline-block
                line-height: 22px
                font-size: 12px
                margin-left: 7px
                pointer-events: none

                &.no-margin
                    margin: 0

                .attribute-name
                    color: #e8a666
                    display: inline

                    &.is-blue
                        color: #61AFEF

                .attribute-connector, .attribute-deco
                    color: rgba(255, 255, 255, 0.7)
                    display: inline

                .attribute-value
                    color: #89ca78
                    display: inline

                    span
                        margin-right: 7px

                        &:last-of-type
                            margin: 0
                    i
                        margin: 0 2px 0 0
        
        .children-container
            display: block
            padding: 0 0 0 5px
            margin: 0 0 0 5px
            border-left: 1px solid rgba(255, 255, 255, 0.2)

        &.selected > .tag-container
            background: rgba(255, 255, 255, 0.05)
            border-color: rgba(255, 255, 255, 0.2)
        &.drag-insert > .tag-container
            background: rgba(255, 255, 255, 0.1)
</style>