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

            <div class="button-container">
                <div class="btn">
                    <div class="icon">&#64120;</div>
                    <div class="key">del</div>
                </div>
                <div class="btn">
                    <div class="icon">&#62443;</div>
                    <div class="key">ctrl + enter</div>
                </div>
                <div class="btn">
                    <div class="icon">&#62485;</div>
                    <div class="key">enter</div>
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
                    <input class="input" tabindex="-1" min="0" max="9999" maxlength="4" type="number" v-model="TAB.VIEWPORT.X">
                </div>
                <div class="control-input">
                    <div class="icon">&#63566;</div>
                    <input class="input" tabindex="-1" min="0" max="9999" maxlength="4" type="number" v-model="TAB.VIEWPORT.Y">
                </div>
                <div class="control-icon-btn" onclick="rotateCoupledViewport()">&#62581;</div>
                <div class="control-icon-btn" onclick="decoupleViewport()" :class="{'active' : TAB.VIEWPORT.DECOUPLED}">&#61516;</div>
            </div>

            <div class="center">
                <div class="decoupled-viewport" v-show="TAB.VIEWPORT.DECOUPLED">
                    <div class="icon">&#63880;</div>
                    <div class="text">
                        The Viewport is <strong>decoupled</strong> and<br>shown in a seperate window.
                    </div>
                </div>

                <viewport :content="TAB.VIEWPORT.CONTENT" :x="TAB.VIEWPORT.X" :y="TAB.VIEWPORT.Y" @update:x="TAB.VIEWPORT.X = $event" @update:y="TAB.VIEWPORT.Y = $event" v-show="!TAB.VIEWPORT.DECOUPLED"></viewport>
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
export default {
    name: 'LayoutCreator',
    data: function(){
        return {
            TAB: {
                VIEWPORT: {
                    X: 300,
                    Y: 600,
                    SCALE: 1,
                    DECOUPLED: false,
                    CONTENT: '',
                },
            }
        }
    },
    components: {
    }
}
</script>