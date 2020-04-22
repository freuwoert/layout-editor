<template>
    <div class="view" id="layout-editor-view" v-show="TAB.VIEW == 'VIEW:LAYOUT_EDITOR'">

        <div class="option-panel">
            <div class="icon-button unimportant" title="Leave to overview" @click="TAB.VIEW = 'VIEW:HOME'">&#62828;</div>
            <div class="button" onclick="generateCode()">
                <div class="icon">&#64567;</div> Generate Code
            </div>
            <div class="account">
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
            </div>
        </div>

        <div class="structure-panel">
            <focus-indicator :when="TAB.FOCUSED_PANEL" equals="STRUCTURE"></focus-indicator>

            <div class="tree-container">
                <structure-tree :key="id" v-for="(child, id) in TAB.DOCUMENT.HTML.children" :focus="TAB.FOCUSED_HTML" :trace="id" :attributes="child.attributes" :label="child.label" :children="child.children"></structure-tree>
            </div>

            <div class="structure-add-panel" v-show="TAB.UI.structureAdd">
                <focus-indicator :when="TAB.FOCUSED_PANEL" equals="STRUCTURE_ADD|STRUCTURE_ADD_SEARCH"></focus-indicator>
                
                <div class="close" onclick="closeStructureAdd()">
                    <div class="key">esc</div>
                </div>

                <div class="direction-indicator" :class="TAB.UI_DATA.structureAddDirection">
                    <div class="dot"></div>
                </div>

                <label class="search">
                    <input  class="input mousetrap"
                            type="text"
                            ref="structureSearch"
                            tabindex="-1"
                            placeholder="Search tags or presets"
                            v-model="TAB.UI_DATA.structureAddSearch"
                            onfocus="focusStructureAddSearch()"
                            onblur="blurStructureAddSearch()"
                            onkeyup="updateStructureAddSearch()"
                            onkeydown="disableInputArrowKeys(event)">

                    <div class="info" :class="{'active' : TAB.FOCUSED_PANEL == 'STRUCTURE_ADD'}">
                        <div class="icon">&#62225;</div>
                        <div class="key">enter</div>
                    </div>
                </label>
                <div class="autocomplete" v-show="TAB.UI_DATA.structureAddSearch != ''">
                    <div class="empty" v-show="TAB.UI_DATA.structureAddSearchItems.length == 0">No matches found</div>
                    <div class="item" :key="id" v-for="(structure, id) in TAB.UI_DATA.structureAddSearchItems" :class="{'selected' : id == TAB.UI_DATA.structureAddSearchSelected}">
                        <div class="type">{{structure.type}}:</div>
                        <div class="label">{{structure.name}}</div>
                    </div>
                </div>
                <div class="suggestions" v-show="TAB.UI_DATA.structureAddSearch == ''">
                    <div class="box">
                        <div class="icon">&#62372;</div>
                        <div class="tag">DIV</div>
                    </div>
                    <div class="box">
                        <div class="icon">&#62375;</div>
                        <div class="tag">SPAN</div>
                    </div>
                    <div class="box">
                        <div class="icon">&#62378;</div>
                        <div class="tag">A</div>
                    </div>
                    <div class="box">
                        <div class="icon">&#62381;</div>
                        <div class="tag">INPUT</div>
                    </div>
                    <div class="box">
                        <div class="icon">&#62384;</div>
                        <div class="tag">B</div>
                    </div>
                    <div class="box">
                        <div class="icon">&#62387;</div>
                        <div class="tag">HTML*</div>
                    </div>
                    <div class="box">
                        <div class="icon">&#62390;</div>
                        <div class="tag">INPUT</div>
                    </div>
                    <div class="box">
                        <div class="icon">&#62393;</div>
                        <div class="tag">B</div>
                    </div>
                    <div class="box">
                        <div class="icon">&#62396;</div>
                        <div class="tag">HTML*</div>
                    </div>
                </div>
            </div>

            <div class="button-container">
                <div class="btn" onclick="removeStructureRemove(TAB().FOCUSED_HTML)">
                    <div class="icon">&#64120;</div>
                    <div class="key">del</div>
                </div>
                <div class="btn">
                    <div class="icon">&#62443;</div>
                    <div class="key">ctrl + enter</div>
                </div>
                <div class="btn" onclick="openStructureAdd(TAB().FOCUSED_HTML, 'INTO')">
                    <div class="icon">&#62485;</div>
                    <div class="key">enter</div>
                </div>
            </div>
        </div>

        <div class="styling-panel">
            <focus-indicator :when="TAB.FOCUSED_PANEL" equals="STYLE"></focus-indicator>

            <div class="tree-container">
                <style-tree :key="id" v-for="(child, id) in TAB.DOCUMENT.CSS.children" :focus="TAB.FOCUSED_CSS" :trace="id" :properties="child.properties" :label="child.label" :children="child.children"></style-tree>
            </div>

            <div class="style-add-panel" v-show="TAB.UI.styleAdd">
                <focus-indicator :when="TAB.FOCUSED_PANEL" equals="STYLE_ADD"></focus-indicator>

                <div class="close" onclick="closeStyleAdd()">
                    <div class="key">esc</div>
                </div>

                <label class="input style-name">
                    <input  class="input-field mousetrap"
                            type="text"
                            ref="styleInput"
                            tabindex="-1"
                            placeholder="Selector"
                            v-model="TAB.UI_DATA.styleAddInput"
                            onkeydown="disableInputArrowKeys(event)">

                    <div class="info" :class="{'active' : TAB.FOCUSED_PANEL == 'STYLE_ADD'}">
                        <div class="icon">&#62225;</div>
                        <div class="key">enter</div>
                    </div>
                </label>

                <div class="direction-indicator" :class="TAB.UI_DATA.styleAddDirection">
                    <div class="dot"></div>
                </div>

                <div class="button">Add Selector</div>
            </div>

            <div class="style-prop-add-panel" v-show="TAB.UI.stylePropAdd">
                <focus-indicator :when="TAB.FOCUSED_PANEL" equals="STYLE_PROP_ADD"></focus-indicator>

                <div class="close" onclick="closeStylePropAdd()">
                    <div class="key">esc</div>
                </div>

                <label class="input prop-name">
                    <input  class="input-field mousetrap"
                            type="text"
                            ref="stylePropName"
                            tabindex="-1"
                            placeholder="Property"
                            v-model="TAB.UI_DATA.stylePropAddName"
                            onfocus="addStylePropSetStep(0)"
                            onkeydown="disableInputArrowKeys(event)">
                </label>

                <label class="input prop-value">
                    <input  class="input-field mousetrap"
                            type="text"
                            ref="stylePropValue"
                            tabindex="-1"
                            placeholder="Value"
                            v-model="TAB.UI_DATA.stylePropAddValue"
                            onfocus="addStylePropSetStep(1)"
                            onkeydown="disableInputArrowKeys(event)">
                </label>

                <div class="button" onclick="addStylePropAddHELPER()">Add Property</div>
            </div>
            
            <div class="button-container">
                <div class="btn" onclick="removeStyleRemove(TAB().FOCUSED_CSS)">
                    <div class="icon">&#64120;</div>
                    <div class="key">del</div>
                </div>
                <div class="btn">
                    <div class="icon">&#62443;</div>
                    <div class="key">ctrl + enter</div>
                </div>
                <div class="btn" onclick="openStyleAdd(TAB().FOCUSED_CSS, 'INTO')">
                    <div class="icon">&#62485;</div>
                    <div class="key">enter</div>
                </div>
            </div>
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
            <div class="savepath" :title="TAB.SAVE_PATH" onclick="setSavePath(TAB())">
                <div class="icon">&#63343;</div>
                <div class="label" v-show="savePathName">{{savePathName}}</div>
                <div class="label" v-show="!savePathName">Set file location</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LayoutEditor',
    components: {
    }
}
</script>