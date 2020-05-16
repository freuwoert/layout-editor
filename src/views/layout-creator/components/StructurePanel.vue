<template>
    <div class="structure-panel">
        <div class="structure-container">
            <structure-tree :key="id" v-for="(child, id) in docStructures.children" :structure="child" :trace="id"></structure-tree>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import StructureTree from './StructureTree'

    export default {
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'docStructures',
            ]),
        },
        methods: {
            ...mapActions([]),
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
            flex: 1 1 0px
            overflow-y: auto
</style>