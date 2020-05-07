<template>
    <div class="view" id="layout-editor-view">

        <div class="option-panel">
            <div class="leave-button" title="Leave to overview">&#61517;</div>
            <div class="button">
                <div class="icon">&#62903;</div> Build Code
            </div>
            <div class="account">
                <div class="sign-in" v-show="!userInfo.online">
                    <div class="text">Sign In</div>
                    <div class="image">
                        <div class="icon">&#64305;</div>
                    </div>
                </div>
                <div class="online" v-show="userInfo.online">
                    <div class="text">{{userInfo.displayName}}</div>    
                    <div class="image">
                        <img :src="userInfo.displayImage" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="tool-panel">
            <div class="tool" title="Search">&#62281;</div>
            <div class="divider">&#62281;</div>
            <div class="tool" draggable="true" title="Div-Box"      @drag="dragStructure($event, 'W3:DEFAULT:DIV:0')">&#63651;</div>
            <div class="tool" draggable="true" title="Text"         @drag="dragStructure($event, 'VU:DEFAULT:TEXT:0')">&#62964;</div>
            <div class="tool" draggable="true" title="Link"         @drag="dragStructure($event, 'W3:DEFAULT:A:0')">&#62265;</div>
            <div class="tool" draggable="true" title="Icon"         @drag="dragStructure($event, 'VU:DEFAULT:ICON:0')">&#63984;</div>
            <div class="tool" draggable="true" title="Span"         @drag="dragStructure($event, 'W3:DEFAULT:SPAN:0')">&#63912;</div>
            <div class="tool" draggable="true" title="Paragraph"    @drag="dragStructure($event, 'W3:DEFAULT:P:0')">&#63911;</div>
            <div class="tool" draggable="true" title="Image"        @drag="dragStructure($event, 'W3:DEFAULT:IMAGE:0')">&#63861;</div>
            <div class="tool" draggable="true" title="Video"        @drag="dragStructure($event, 'W3:DEFAULT:VIDEO:0')">&#62823;</div>
            <div class="tool" draggable="true" title="Headline 1"   @drag="dragStructure($event, 'W3:DEFAULT:H1:0')">&#62059;</div>
            <div class="tool settings" title="Settings" @click="setSettingsUI(true)">&#62611;</div>
        </div>

        <div class="structure-panel">
            <!-- <focus-indicator :when="TAB.FOCUSED_PANEL" equals="STRUCTURE"></focus-indicator> -->

            <div class="structure-container">
                <structure-tree :key="id" v-for="(child, id) in docStructures.children" :structure="child" :trace="id"></structure-tree>
            </div>
        </div>

        <property-panel></property-panel>

        <div class="workspace">
            <div class="controls">
                <drag-unit class="control-input" label="W" :min="40" :max="9999" nounit :value="viewport.x" @input="setViewportSize({x: $event, y: null})"></drag-unit>
                <drag-unit class="control-input" label="H" :min="40" :max="9999" nounit :value="viewport.y" @input="setViewportSize({x: null, y: $event})"></drag-unit>
                <div class="control-icon-btn" @click="rotateCoupledViewport()">&#62581;</div>
                <div class="control-icon-btn" @click="toggleDecoupleViewport()" :class="{'active' : viewport.decoupled}">&#61516;</div>
            </div>

            <div class="center">
                <div class="decoupled-viewport" v-show="viewport.decoupled">
                    <div class="icon">&#63880;</div>
                    <div class="text">
                        The Viewport is <strong>decoupled</strong> and<br>shown in a seperate window.
                    </div>
                </div>

                <viewport :content="viewport.content" v-show="!viewport.decoupled"></viewport>
            </div>
        </div>

        <div class="status-panel">
            <div class="savepath" :title="'TabsSavePath'">
                <div class="icon">&#63343;</div>
                <div class="label" v-show="false">{{'savePathName'}}</div>
                <div class="label" v-show="!false">Set file location</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Viewport from './components/Viewport'
    import StructureTree from './components/StructureTree'
    import PropertyPanel from './components/PropertyPanel'
    import DragUnit from '../components/DragUnitInput'

    export default {
        computed: {
            ...mapGetters([
                'docStructures',
                'dragElement',
                'viewport',
                'userInfo',
            ]),
        },
        methods: {
            ...mapActions([
                'setView',
                'setDraggedElement',
                'setViewportSize',
                'rotateCoupledViewport',
                'toggleDecoupleViewport',
                'setSettingsUI',
            ]),
            dragStructure(event, elementId) {
                this.setDraggedElement({type: 'structure', element: elementId})
            },
        },
        mounted() {
        },
        components: {
            Viewport,
            StructureTree,
            PropertyPanel,
            DragUnit,
        }
    }
</script>
<style lang="sass" scoped>
    #layout-editor-view
        background: var(--dark-background)
        display: grid
        grid-template-columns: 50px 400px auto 400px
        grid-template-rows: 40px auto 30px
        grid-template-areas: "option_panel option_panel option_panel option_panel" "tool_panel structure_panel workspace styling_panel" "status_panel status_panel status_panel status_panel"

        .option-panel
            grid-area: option_panel
            background: var(--background)
            position: relative
            text-align: left

            .leave-button
                width: 50px
                height: 32px
                line-height: 32px
                margin: 4px 0
                font-family: 'Material Icons'
                font-size: 20px
                color: var(--red)
                text-align: center
                border-radius: 5px
                cursor: pointer
                user-select: none

                &:hover
                    background: var(--color-dimm)

            .button, .icon-button
                margin: 7px
                margin-right: 0
                background: transparent
                color: var(--color)

                &:hover
                    background: var(--color-dimm)
                    color: var(--color-bright)

            .account
                position: absolute
                top: 0
                right: 0
                height: 100%
                line-height: 40px
                padding: 3px 10px
                user-select: none

                .sign-in, .online
                    height: 34px
                    border-radius: 40px
                    background: var(--dark-background)
                    cursor: pointer
                    color: var(--color)

                    &:hover
                        color: var(--color-bright)

                .text
                    height: 28px
                    line-height: 28px
                    font-size: 12px
                    padding: 3px 8px 3px 15px
                    letter-spacing: 1px
                    vertical-align: top

                .image
                    height: 30px
                    width: 30px
                    margin: 2px
                    border-radius: 40px
                    background: var(--background)
                    overflow: hidden
                    vertical-align: top

                    .icon
                        height: 100%
                        width: 100%
                        line-height: 30px
                        text-align: center
                        font-family: 'Material Icons'
                        font-size: 22px
                        color: var(--color-light)

                    img
                        height: 100%
                        width: 100%

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

                &.settings
                    position: absolute
                    bottom: 0
                    left: 0

                &:hover
                    background: rgba(255, 255, 255, 0.05)
                    color: white
            
            .divider
                height: 0
                width: calc(100% - 10px)
                margin: 0 5px
                border-bottom: 1px solid var(--color-lighter)

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

        .workspace
            grid-area: workspace
            background: var(--dark-background)
            overflow: hidden
            position: relative

            .controls
                position: absolute
                top: 0
                left: 50%
                transform: translateX(-50%)
                height: 50px
                padding: 10px 5px
                border-radius: 0 0 10px 10px
                background: var(--background)
                user-select: none
                white-space: nowrap

                &:before
                    content: ''
                    height: 100%
                    width: 10px
                    border-radius: 0 10px 0 0
                    background: var(--dark-background)
                    position: absolute
                    top: 0
                    left: -10px
                    box-shadow: 0 -10px var(--background)

                &:after
                    content: ''
                    height: 100%
                    width: 10px
                    border-radius: 10px 0 0 0
                    background: var(--dark-background)
                    position: absolute
                    top: 0
                    right: -10px
                    box-shadow: 0 -10px var(--background)

                .control-icon-btn
                    height: 30px
                    width: 30px
                    line-height: 30px
                    border-radius: 3px
                    overflow: hidden
                    margin: 0 5px
                    color: rgba(255, 255, 255, 0.7)
                    font-size: 21px
                    font-family: 'Material Icons'
                    vertical-align: top
                    text-align: center
                    cursor: pointer

                    &:hover
                        background: rgba(255, 255, 255, 0.05)
                        color: white

                    &.active
                        background: var(--dark-background)
                        color: var(--primary)

                .control-input
                    position: relative
                    background: var(--darker-background)
                    text-align: right
                    height: 30px
                    width: 70px
                    border-radius: 3px
                    cursor: text
                    overflow: hidden
                    margin: 0 5px

                    .icon
                        width: 28px
                        text-align: center
                        line-height: 30px
                        color: var(--color)
                        font-size: 17px
                        font-family: 'Material Icons'
                        vertical-align: top

                    .input
                        border: none
                        height: 30px
                        width: calc(100% - 28px)
                        position: absolute
                        top: 0
                        left: 30px
                        padding-right: 8px
                        background: transparent
                        color: var(--color-bright)
                        font-family: 'SCP'
                        font-size: 12px
                        text-align: right
                        letter-spacing: 0.5px

                        &::-webkit-inner-spin-button, &::-webkit-outer-spin-button
                            -webkit-appearance: none
                            margin: 0

            .center
                position: absolute
                top: 50px
                left: 0
                width: 100%
                height: calc(100% - 50px)
                padding-top: 50px
                text-align: center

                .decoupled-viewport
                    position: absolute
                    top: calc(50%)
                    left: 0
                    width: 100%
                    height: 140px
                    transform: translateY(-50%)

                    .icon
                        height: 140px
                        width: 140px
                        border-radius: 100%
                        line-height: 140px
                        text-align: center
                        margin-right: 20px
                        color: var(--dark-background)
                        background: rgba(255,255,255, 0.05)
                        font-size: 90px
                        font-family: 'Material Icons'
                        vertical-align: middle

                    .text
                        color: rgba(255,255,255, 0.2)
                        font-size: 17px
                        letter-spacing: 1px
                        line-height: 22px
                        text-align: left
                        vertical-align: middle

                        strong
                            font-weight: 800

        .status-panel
            grid-area: status_panel
            background: var(--background)
            text-align: left

            .savepath
                height: 30px
                line-height: 30px
                color: var(--color)
                user-select: none
                cursor: pointer
                border-radius: 4px
                padding-right: 5px

                &:hover
                    color: var(--color-bright)
                    background: var(--color-dimm)

                .icon
                    height: 28px
                    line-height: 28px
                    width: 28px
                    text-align: center
                    font-size: 16px
                    font-family: 'Material Icons'
                    vertical-align: top

                .label
                    font-size: 10px
                    vertical-align: top
                    line-height: 28px
                    padding-left: 2px
                    padding-right: 5px
                    letter-spacing: 0.5px
</style>