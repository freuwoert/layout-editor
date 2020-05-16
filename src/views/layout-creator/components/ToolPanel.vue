<template>
    <div class="tool-panel">
        <div class="tool" title="Search">&#983881;</div>
        <div class="divider"></div>
        <div class="tool" draggable="true" title="Div-Box"      @drag="dragStructure($event, 'W3:DEFAULT:DIV:0')">&#985252;</div>
        <div class="tool" draggable="true" title="Text"         @drag="dragStructure($event, 'VU:DEFAULT:TEXT:0')">&#984564;</div>
        <div class="tool" draggable="true" title="Link"         @drag="dragStructure($event, 'W3:DEFAULT:A:0')">&#983865;</div>
        <div class="tool" draggable="true" title="Icon"         @drag="dragStructure($event, 'VU:DEFAULT:ICON:0')">&#985585;</div>
        <div class="tool" draggable="true" title="Span"         @drag="dragStructure($event, 'W3:DEFAULT:SPAN:0')">&#985512;</div>
        <div class="tool" draggable="true" title="Paragraph"    @drag="dragStructure($event, 'W3:DEFAULT:P:0')">&#985512;</div>
        <div class="tool" draggable="true" title="Image"        @drag="dragStructure($event, 'W3:DEFAULT:IMAGE:0')">&#985462;</div>
        <div class="tool" draggable="true" title="Video"        @drag="dragStructure($event, 'W3:DEFAULT:VIDEO:0')">&#984423;</div>
        <div class="tool" draggable="true" title="Headline 1"   @drag="dragStructure($event, 'W3:DEFAULT:H1:0')">&#983659;</div>

        <div class="tool css" title="CSS View">&#983836;</div>
        <div class="tool html" title="HTML View">&#983837;</div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'dragElement',
            ]),
        },
        methods: {
            ...mapActions([
                'setDraggedElement',
                'setSettingsUI',
            ]),
            dragStructure(event, elementId) {
                this.setDraggedElement({type: 'structure', element: elementId})
            },
        },
    }
</script>
<style lang="sass" scoped>
    .tool-panel
        grid-area: tool_panel
        position: relative
        display: flex
        flex-direction: column
        margin: 5px 0
        background: var(--background)
        border-radius: 0 5px 5px 0

        .tool
            height: 50px
            width: 50px
            position: relative
            border-radius: 5px
            background: var(--background)
            text-align: center
            line-height: 50px
            color: rgba(255, 255, 255, 0.7)
            font-size: 24px
            font-family: 'Material Icons'
            user-select: none
            cursor: pointer

            &.html
                position: absolute
                bottom: 0
                left: 0

            &.css
                position: absolute
                bottom: 50px
                left: 0

            &:hover
                background: rgba(255, 255, 255, 0.05)
                color: white
        
        .divider
            height: 0
            width: calc(100% - 10px)
            margin: 0 5px
            border-bottom: 1px solid var(--color-lighter)
</style>