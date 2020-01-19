Vue.component('structure-tree', {
    props: ['label', 'trace', 'attributes', 'children', 'focus'],
    template: `
        <div class="structure-tree" :trace="trace">
            <div class="attribute-container" :trace="trace" :class="{'selected' : focus == trace}">
                <span class="label">{{label}}</span>
                <span class="attr" v-for="attribute in attributes">
                    &nbsp;{{attribute.label}}<span class="deco">=</span><span class="string">"{{attribute.value.join(' ')}}"</span>
                </span>

                <div class="btn-container">
                    <div class="btn">&#61773;</div>
                    <div class="btn">&#61913;</div>
                </div>
            </div>
            <div class="children-container" v-show="children.length > 0">
                <structure-tree v-for="(child, id) in children" :focus="focus" :trace="trace+'-'+id" :attributes="child.attributes" :label="child.label" :children="child.children"></structure-tree>
            </div>
        </div>
    `
})