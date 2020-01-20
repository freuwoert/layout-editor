Vue.component('colorpicker', {
    props: ['value', 'icon'],
    data: () => {
        return {
            internalColor: '#ff7700',
            internalBaseColor: '#ff7700'
        }
    },
    template: `
        <div class="colorpicker">
            <div class="picker-container">
                <div class="main-picker" :style="'background:' + internalBaseColor">
                    <div class="handle"></div>
                </div>
                <div class="hue-picker">
                    <div class="handle"></div>
                </div>
                <div class="alpha-picker">
                    <div class="handle"></div>
                </div>
            </div>
        </div>
    `
})