<template>
    <div class="structure-tree" :trace="trace" :class="[{'selected': selectedStructures.includes(structure.uuid+'')}, insertPos]" @drag="dragStructure()">
        <div class="tag-container" :trace="trace" @click="select()" @drop="drop($event)" @dragover="dragOver($event, 'insert')" @dragleave="dragLeave()">
            <span class="tag" v-if="structure.tag">
                {{structure.tag}}
            </span>

            <span class="tag id" v-if="structure.id">
                {{structure.id}}
            </span>

            <span class="tag class" v-if="structure.classes && structure.classes.length">
                <span v-for="(class_, i) in structure.classes" :key="i">{{class_}}</span>
            </span>

            <span class="attribute no-margin" v-if="structure.hasOwnProperty('text')">
                <div class="attribute-value" v-show="!structure.text">∙ EMPTY ∙</div>
                <div class="attribute-value" v-show="structure.text">{{structure.text}}</div>
            </span>
        </div>



        <div class="children-container" v-if="structure.children.length">
            <structure-tree v-for="(child, id) in structure.children" :key="id" :trace="trace+'-'+id" :structure="child"></structure-tree>
        </div>

        <div class="drag-below" @drop="drop($event)" @dragover="dragOver($event, 'below')" @dragleave="dragLeave()"></div>
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
                insertPos: null,
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
            dragStructure() {
                console.log(this.structure)
                this.setDraggedElement({type: 'structure', element: this.structure})
            },
            drop(event) {
                if( this.dragElement.type === 'structure' )
                {
                    this.insertStructure({trace: this.trace+'', position: this.insertPos, element: this.dragElement.element})
                    this.insertPos = null
                }

            },
            dragOver(event, pos) {
                event.preventDefault()
                this.insertPos = pos
            },
            dragLeave() {
                this.insertPos = null
            },
            select() {
                this.setSelectedStructures({uuid: this.structure.uuid})
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
        position: relative

        .tag-container
            text-align: left
            display: block
            box-sizing: border-box
            height: 24px
            border-radius: 5px
            padding-left: 3px
            font-size: 0
            font-weight: 600
            position: relative
            white-space: nowrap
            overflow: hidden

            &:hover
                background: var(--dark-background)

            .tag
                display: inline-block
                line-height: 18px
                margin: 3px 0
                background: var(--primary)
                color: var(--color-bright)
                text-transform: uppercase
                letter-spacing: 0.5px
                font-size: 11px
                padding: 0 6px
                pointer-events: none

                &:first-child
                    border-top-left-radius: 4px
                    border-bottom-left-radius: 4px

                &:last-child
                    border-top-right-radius: 4px
                    border-bottom-right-radius: 4px

                &.class
                    background: #2F3542
                    color: var(--color)

                &.id
                    background: #57606F
                    color: var(--color)

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

        .drag-below
            width: 100%
            height: 8px
            background: transparent
            border-radius: 3px
            position: absolute
            left: 0
            bottom: 0

        &.selected > .tag-container
            &::after
                content: ''
                position: absolute
                right: 8px
                top: calc(50% - 4px)
                height: 8px
                width: 8px
                background: var(--primary)
                border-radius: 100%

        &.insert > .tag-container
            background: var(--light-background)
        &.below > .drag-below
            opacity: 1
            background: var(--light-background)
</style>