<template>
    <div class="view" id="layout-editor-view">

        <div class="option-panel">
            <div class="icon-button unimportant" title="Leave to overview" @click="''">&#62828;</div>
            <div class="button" onclick="generateCode()">
                <div class="icon">&#64567;</div> Generate Code
            </div>
            <!-- <div class="account">
                <div class="sign-in" v-show="!USER.online">
                    <div class="text">Sign In</div>
                    <div class="image">
                        <div class="icon">&#64305;</div>
                    </div>
                </div>
                <div class="online" v-show="USER.online">
                    <div class="text">{{USER.displayName}}</div>    
                    <div class="image">
                        <img :src="USER.displayImage" alt="">
                    </div>
                </div>
            </div> -->
        </div>

        <div class="structure-panel">
            <!-- <focus-indicator :when="TAB.FOCUSED_PANEL" equals="STRUCTURE"></focus-indicator> -->

            <div class="structure-container">
                <structure-tree :key="id" v-for="(child, id) in docStructures.children" :structure="child" :trace="id"></structure-tree>
            </div>

            <div class="button-container">
                <div class="btn" draggable="true" @drag="dragStructure($event, 'W3:DEFAULT:H1:0')">
                    <div class="icon">&#62059;</div>
                    <div class="key">h1</div>
                </div>
                <div class="btn" draggable="true" @drag="dragStructure($event, 'W3:DEFAULT:DIV:0')">
                    <div class="icon">&#61812;</div>
                    <div class="key">div</div>
                </div>
                <div class="btn" draggable="true" @drag="dragStructure($event, 'W3:DEFAULT:IMAGE:0')">
                    <div class="icon">&#62185;</div>
                    <div class="key">image</div>
                </div>
                <div class="btn" draggable="true" @drag="dragStructure($event, 'W3:DEFAULT:SPAN:0')">
                    <div class="icon">&#63911;</div>
                    <div class="key">span</div>
                </div>
                <div class="btn" draggable="true" @drag="dragStructure($event, 'W3:DEFAULT:P:0')">
                    <div class="icon">&#62077;</div>
                    <div class="key">p</div>
                </div>
                <div class="btn" draggable="true" @drag="dragStructure($event, 'W3:DEFAULT:A:0')">
                    <div class="icon">&#62265;</div>
                    <div class="key">a</div>
                </div>
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
    .structure-container
        height: calc(100% - 55px)
</style>