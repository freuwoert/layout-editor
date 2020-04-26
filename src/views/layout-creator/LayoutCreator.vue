<template>
    <div class="view" id="layout-editor-view">

        <div class="option-panel">
            <div class="icon-button leave" title="Leave to overview">&#61517;</div>
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
            <div class="tool" draggable="true" title="Div-Box" @drag="dragStructure($event, 'W3:DEFAULT:DIV:0')">&#63651;</div>
            <div class="tool" draggable="true" title="Text" @drag="dragStructure($event, 'VU:DEFAULT:TEXT:0')">&#62964;</div>
            <div class="tool" draggable="true" title="Link" @drag="dragStructure($event, 'W3:DEFAULT:A:0')">&#62265;</div>
            <div class="tool" draggable="true" title="Span" @drag="dragStructure($event, 'W3:DEFAULT:SPAN:0')">&#63912;</div>
            <div class="tool" draggable="true" title="Paragraph" @drag="dragStructure($event, 'W3:DEFAULT:P:0')">&#63911;</div>
            <div class="tool" draggable="true" title="Image" @drag="dragStructure($event, 'W3:DEFAULT:IMAGE:0')">&#63861;</div>
            <div class="tool" draggable="true" title="Video" @drag="dragStructure($event, 'W3:DEFAULT:VIDEO:0')">&#62823;</div>
        </div>

        <div class="structure-panel">
            <!-- <focus-indicator :when="TAB.FOCUSED_PANEL" equals="STRUCTURE"></focus-indicator> -->

            <div class="structure-container">
                <structure-tree :key="id" v-for="(child, id) in docStructures.children" :structure="child" :trace="id"></structure-tree>
            </div>
        </div>

        <div class="styling-panel">
            <!-- <focus-indicator :when="TAB.FOCUSED_PANEL" equals="STYLE"></focus-indicator> -->
        </div>

        <div class="workspace">
            <div class="controls">
                <div class="control-input">
                    <div class="icon">&#63565;</div>
                    <input class="input" tabindex="-1" min="0" max="9999" maxlength="4" type="number" v-model="activeTab.VIEWPORT.X">
                </div>
                <div class="control-input">
                    <div class="icon">&#63566;</div>
                    <input class="input" tabindex="-1" min="0" max="9999" maxlength="4" type="number" v-model="activeTab.VIEWPORT.Y">
                </div>
                <div class="control-icon-btn" onclick="rotateCoupledViewport()">&#62581;</div>
                <div class="control-icon-btn" onclick="decoupleViewport()" :class="{'active' : activeTab.VIEWPORT.DECOUPLED}">&#61516;</div>
            </div>

            <div class="center">
                <div class="decoupled-viewport" v-show="activeTab.VIEWPORT.DECOUPLED">
                    <div class="icon">&#63880;</div>
                    <div class="text">
                        The Viewport is <strong>decoupled</strong> and<br>shown in a seperate window.
                    </div>
                </div>

                <viewport :content="activeTab.VIEWPORT.CONTENT" :x="activeTab.VIEWPORT.X" :y="activeTab.VIEWPORT.Y" @update:x="activeTab.VIEWPORT.X = $event" @update:y="activeTab.VIEWPORT.Y = $event" v-show="!activeTab.VIEWPORT.DECOUPLED"></viewport>
            </div>
        </div>

        <div class="status-panel">
            <!-- <div class="savepath" :title="TAB.SAVE_PATH" onclick="setSavePath(TAB())">
                <div class="icon">&#63343;</div>
                <div class="label" v-show="savePathName">{{savePathName}}</div>
                <div class="label" v-show="!savePathName">Set file location</div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Viewport from './components/Viewport'
import StructureTree from './components/StructureTree'

export default {
    computed: {
        ...mapGetters([
            'activeTab',
            'docStructures',
            'dragElement',
            'userInfo',
        ]),
    },
    methods: {
        ...mapActions([
            'setViewOfTab',
            'setDraggedElement',
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
    }
}
</script>
<style lang="sass" scoped>
</style>