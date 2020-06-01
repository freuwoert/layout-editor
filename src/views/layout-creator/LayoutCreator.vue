<template>
    <div class="view">
        <option-panel></option-panel>
        <tool-panel></tool-panel>
        <structure-panel></structure-panel>
        <workspace-panel></workspace-panel>
        <property-panel></property-panel>
        <status-panel></status-panel>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import OptionPanel from './components/OptionPanel'
    import ToolPanel from './components/ToolPanel'
    import StructurePanel from './components/StructurePanel'
    import WorkspacePanel from './components/WorkspacePanel'
    import PropertyPanel from './property-panel/PropertyPanel'
    import StatusPanel from './components/StatusPanel'

    export default {
        computed: {
            ...mapGetters([]),
        },
        methods: {
            ...mapActions([]),
        },
        components: {
            StructurePanel,
            WorkspacePanel,
            PropertyPanel,
            OptionPanel,
            StatusPanel,
            ToolPanel,
        }
    }
</script>
<style lang="sass" scoped>
    .view
        background: var(--dark-background)
        display: grid
        grid-template-columns: 50px 400px auto 400px
        grid-template-rows: 40px auto 30px
        grid-template-areas: "option_panel option_panel option_panel option_panel" "tool_panel structure_panel workspace styling_panel" "status_panel status_panel status_panel status_panel"
</style>