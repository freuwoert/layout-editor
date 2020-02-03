Vue.component('style-tree', {
    props: ['label', 'trace', 'properties', 'children', 'focus'],
    template: `
        <div class="style-tree" :trace="trace">
            <div class="selector-container" :trace="trace" :class="{'selected' : focus == trace}">
                <span class="label class" v-show="label.startsWith('.')">{{label}}</span>
                <span class="label id" v-show="label.startsWith('#')">{{label}}</span>
                <span class="label none" v-show="!label.startsWith('.') && !label.startsWith('#')">{{label}}</span>
            </div>
            <div class="property-container">
                <span>
                    <style-property v-for="(property, id) in properties" :focus="focus" :trace="trace+'-'+id+'-prop'" :property="property"></structure-property>
                </span>
                <div class="add-property" :class="{'selected' : focus == trace+'-propadd'}">+++ Add Property +++</div>
            </div>
            <div class="children-container" v-show="children.length > 0">
                <style-tree v-for="(child, id) in children" :focus="focus" :trace="trace+'-'+id" :properties="child.properties" :label="child.label" :children="child.children"></structure-tree>
            </div>
        </div>
    `
})