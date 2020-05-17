<template>
    <div class="structure-panel">
        <div class="structure-container">
            <div class="drag-start" :class="insertPos" @drop="drop($event)" @dragover="dragOver($event, 'start')" @dragleave="dragLeave()" v-show="docStructures.children.length > 0"></div>
            
            <structure-tree :key="id" v-for="(child, id) in docStructures.children" :structure="child" :trace="id"></structure-tree>
            
            <div class="drag-end" :class="insertPos" @drop="drop($event)" @dragover="dragOver($event, 'end')" @dragleave="dragLeave()">
                <div class="empty-placeholder" v-show="docStructures.children.length === 0">
                    <div class="icon">&#984022;</div>
                    <div class="text">No tags added</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import StructureTree from './StructureTree'
    import { EventBus } from '@/assets/js/event-bus'

    export default {
        data() {
            return {
                insertPos: null,
            }
        },
        computed: {
            ...mapGetters([
                'dragElement',
                'docStructures',
                'selectedStructures',
            ]),
        },
        methods: {
            ...mapActions([
                'insertStructure',
                'deleteStructures',
            ]),
            drop(event) {
                if( this.dragElement.type === 'structure' )
                {
                    this.insertStructure({trace: '', position: this.insertPos, element: this.dragElement.element})
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
        },
        mounted() {
            EventBus.$on('delete', () => {
                this.deleteStructures({traces: this.selectedStructures})
            })
        },
        components: {
            StructureTree,
        }
    }
</script>
<style lang="sass" scoped>
    .structure-panel
        grid-area: structure_panel
        position: relative
        display: flex
        flex-direction: column
        background: var(--background)
        margin: 5px
        margin-right: 0
        border-radius: 5px

        .structure-container
            width: calc(100% - 10px)
            margin: 5px
            display: flex
            flex-direction: column
            flex: 1 1 0px
            overflow-y: auto

            .drag-start
                height: 8px
                width: 100%
                border-radius: 3px

                &.start
                    background: var(--light-background)

            .drag-end
                flex: 1 1 0px
                width: 100%
                min-height: 20px
                border-radius: 3px
                position: relative

                &.end
                    background: var(--light-background)

                .empty-placeholder
                    width: 100%
                    position: absolute
                    top: 50%
                    left: 0
                    text-align: center
                    transform: translateY(-50%)
                    user-select: none
                    pointer-events: none

                    .icon
                        font-family: 'Material Icons'
                        font-size: 120px
                        color: var(--color-dimm)
                        display: block
                        margin: 10px auto

                    .text
                        font-size: 15px
                        text-transform: uppercase
                        letter-spacing: 2px
                        font-weight: 700
                        color: var(--color-light)
</style>