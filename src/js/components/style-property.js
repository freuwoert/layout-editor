Vue.component('style-property', {
    props: ['trace', 'property', 'focus'],
    template: `
        <div class="style-property" :trace="trace">
            <div class="container" :trace="trace" :class="{'selected' : focus == trace}">
                <span class="label">{{property.label}}:&nbsp;</span>
                <span class="value">{{property.value}}</span>

                <div class="btn-container">
                    <div class="btn">&#61773;</div>
                    <div class="btn">&#61913;</div>
                </div>
            </div>
        </div>
    `
})