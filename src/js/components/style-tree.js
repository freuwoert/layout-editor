Vue.component('style-tree', {
    props: ['label', 'trace', 'properties', 'children', 'focus'],
    template: `
        <div class="style-tree" :trace="trace">
            <div class="selector-container" :trace="trace" :class="{'selected' : focus == trace}">
                <span class="label">{{label}}</span>

                <div class="btn-container">
                    <div class="btn">&#61773;</div>
                    <div class="btn">&#61913;</div>
                </div>
            </div>
            <div class="property-container" v-show="properties.length > 0">
                <style-property v-for="(property, id) in properties" :focus="focus" :trace="trace+'-'+id+'-prop'" :property="property"></structure-property>
            </div>
            <div class="children-container" v-show="children.length > 0">
                <style-tree v-for="(child, id) in children" :focus="focus" :trace="trace+'-'+id" :properties="child.properties" :label="child.label" :children="child.children"></structure-tree>
            </div>
        </div>
    `
})