Vue.component('colorpicker', {
    props: ['value', 'icon'],
    data: () => {
        return {
            internalColor: '#ff7700',
            internalBaseColor: '#ff7700',
            grabbed: {
                hue: false,
                main: false,
                alpha: false,
            },
        }
    },
    methods: {
        hueMouseDown: function(e){
            this.grabbed.hue = true
            console.log(this.getCoords(e.target))
            console.log(e.y)
        },
        mouseUp: function(e){
            this.grabbed.hue = false
            this.grabbed.main = false
            this.grabbed.alpha = false
        },
        mouseMove: function(e){
            if(this.grabbed.hue)
            {
                console.log('.')
            }
        },
        getCoords: function(elem) {
            var box = elem.getBoundingClientRect();
        
            var body = document.body;
            var docEl = document.documentElement;
        
            var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        
            var clientTop = docEl.clientTop || body.clientTop || 0;
            var clientLeft = docEl.clientLeft || body.clientLeft || 0;
        
            var top  = box.top +  scrollTop - clientTop;
            var left = box.left + scrollLeft - clientLeft;
        
            return { top: top, left: left };
        }
    },
    template: `
        <div class="colorpicker">
            <div class="event-background" @mousemove="mouseMove(event)" @mouseup="mouseUp(event)"></div>
            <div class="container" @mousemove="mouseMove(event)" @mouseup="mouseUp(event)">
                <div class="picker-container">
                    <div class="main-picker" :style="'background:' + internalBaseColor">
                        <div class="handle"></div>
                    </div>
                    <div class="hue-picker" @mousedown="hueMouseDown(event)">
                        <div class="handle"></div>
                    </div>
                    <div class="alpha-picker">
                        <div class="handle"></div>
                    </div>
                </div>
            </div>
        </div>
    `
})