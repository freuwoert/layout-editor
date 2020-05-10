<template>
    <div class="structure-panel">
        <div class="mode-selector">
            <div class="mode html" @mousedown="switchMode('STRUCTURE')" :class="{'active': mode === 'STRUCTURE'}">
                <div class="icon">&#62237;</div>
                <div class="text">HTML</div>
            </div>
            <div class="mode css" @mousedown="switchMode('STYLE')" :class="{'active': mode === 'STYLE'}">
                <div class="icon">&#62236;</div>
                <div class="text">CSS</div>
            </div>
        </div>
        <div class="structure-container" v-show="mode === 'STRUCTURE'">
            <structure-tree :key="id" v-for="(child, id) in docStructures.children" :structure="child" :trace="id"></structure-tree>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import StructureTree from './StructureTree'

    export default {
        data() {
            return {
                mode: 'STRUCTURE'
            }
        },
        computed: {
            ...mapGetters([
                'docStructures',
            ]),
        },
        methods: {
            ...mapActions([]),

            switchMode(mode) {
                if( ['STRUCTURE','STYLE'].includes(mode) ) this.mode = mode
            },
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

        .mode-selector
            width: 100%
            display: inline-flex
            padding: 5px
            user-select: none
            vertical-align: top

            .mode
                flex: 1
                height: 30px
                line-height: 30px
                text-align: center
                background: var(--dark-background)
                cursor: pointer
                transition: background 20ms

                .icon
                    font-family: 'Material Icons'
                    font-size: 20px
                    vertical-align: middle
                    margin-right: 8px
                    color: var(--color-lighter)

                .text
                    font-size: 13px
                    text-transform: uppercase
                    color: var(--color-light)
                    vertical-align: middle
                    letter-spacing: 1px
                    font-weight: 800

                    .text-input
                        text-transform: uppercase !important

                &:first-of-type
                    border-top-left-radius: 5px
                    border-bottom-left-radius: 5px

                &:last-of-type
                    border-top-right-radius: 5px
                    border-bottom-right-radius: 5px

                &.active
                    background: var(--darker-background)

                    .icon, .text
                        color: var(--primary)

        .structure-container
            width: calc(100% - 10px)
            margin: 5px
            flex: 1 1 0px
            overflow-y: auto
</style>