Vue.component('structure-tree', {
    props: ['type', 'trace', 'attributes', 'children', 'focus'],
    template: `
        <div class="structure-tree" :trace="trace">
            <div class="property-container" :trace="trace" :class="{'selected' : focus == trace}">
                <span class="type">{{type}}</span>
                <span class="attr" v-for="(value, prop) in attributes">
                    &nbsp;{{prop}}<span class="deco">=</span><span class="string">"{{value.join(' ')}}"</span>
                </span>

                <div class="btn-container">
                    <div class="btn">&#61773;</div>
                    <div class="btn">&#61913;</div>
                </div>
            </div>
            <div class="children-container" v-show="children.length > 0">
                <structure-tree v-for="(child, id) in children" :focus="focus" :trace="trace+'-'+id" :attributes="child.attributes" :type="child.type" :children="child.children"></structure-tree>
            </div>
        </div>
    `
})