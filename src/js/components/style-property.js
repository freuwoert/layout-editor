Vue.component('style-property', {
    props: ['trace', 'property', 'focus'],
    template: `
        <div class="style-property" :trace="trace">
            <div class="container" :trace="trace" :class="{'selected' : focus == trace}">
                <span class="label">{{property.label}}:&nbsp;</span>
                <span class="value">{{property.value}}</span>
            </div>
        </div>
    `
})