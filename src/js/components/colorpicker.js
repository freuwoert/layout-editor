Vue.component('colorpicker', {
    props: ['value'],
    data: () => {
        return {
            output: {
                rgb: [0,0,0],
                rgba: [0,0,0,0],
                hex: '000000',
                hsv: [0,0,0],
            },
            selectedOutput: 'rgba',
            internalColor: 'rgba(255, 0, 0, 1)',
            internalBaseColor: 'rgba(255, 0, 0, 1)',
            internalFullColor: 'rgba(255, 0, 0, 1)',
            grabbed: {
                hue: false,
                main: false,
                alpha: false,
            },
            handlePos: {
                hue: 0,
                mainX: 230,
                mainY: 0,
                alpha: 0,
            },
            handleStartPos: {
                hue: 0,
                mainX: 0,
                mainY: 0,
                alpha: 0,
            },
            handleValue: {
                hue: 0,
                mainX: 1,
                mainY: 1,
                alpha: 0,
            },
        }
    },
    watch: {
        'handlePos.hue': function(val){
            //console.log(val)
        }
    },
    methods: {
        hueMouseDown: function(e){
            this.grabbed.hue = true
            this.handleStartPos.hue = this.getCoords(e.target).top
            this.mouseMove(e)
        },
        mainMouseDown: function(e){
            this.grabbed.main = true
            this.handleStartPos.mainX = this.getCoords(e.target).left
            this.handleStartPos.mainY = this.getCoords(e.target).top
            this.mouseMove(e)
        },
        alphaMouseDown: function(e){
            this.grabbed.alpha = true
            this.handleStartPos.alpha = this.getCoords(e.target).top
            this.mouseMove(e)
        },
        mouseUp: function(e){
            this.grabbed.hue = false
            this.grabbed.main = false
            this.grabbed.alpha = false
        },
        mouseMove: function(e){
            
            let isGrabbed = false

            if(this.grabbed.hue)
            {
                this.handlePos.hue = this.limit(e.y - this.handleStartPos.hue, 0, 200)
                this.handleValue.hue = this.handlePos.hue / 200
                isGrabbed = true
            }
            if(this.grabbed.main)
            {
                this.handlePos.mainX = this.limit(e.x - this.handleStartPos.mainX, 0, 230)
                this.handlePos.mainY = this.limit(e.y - this.handleStartPos.mainY, 0, 200)
                this.handleValue.mainX = this.handlePos.mainX / 230
                this.handleValue.mainY = 1 - this.handlePos.mainY / 200
                isGrabbed = true
            }
            if(this.grabbed.alpha)
            {
                this.handlePos.alpha = this.limit(e.y - this.handleStartPos.alpha, 0, 200)
                this.handleValue.alpha = Math.round(100 - this.handlePos.alpha / 2) / 100
                isGrabbed = true
            }

            if(isGrabbed)
            {
                let colorArrayRaw = [360 * this.handleValue.hue, 100 * this.handleValue.mainX, 100 * this.handleValue.mainY]
                let colorArray = [Math.round(360 * this.handleValue.hue), Math.round(100 * this.handleValue.mainX), Math.round(100 * this.handleValue.mainY)]
                this.output.rgb = colorConvert.hsv.rgb(colorArrayRaw)
                this.output.hex = colorConvert.hsv.hex(colorArrayRaw)
                this.output.hsv = colorArray
                this.output.rgba = [...this.output.rgb, this.handleValue.alpha]

                this.internalBaseColor = 'rgb(' + colorConvert.hsv.rgb(360 * this.handleValue.hue, 100, 100).join(',') + ')'
                this.internalColor = 'rgba(' + this.output.rgb.join(',') + ', 1)'
                this.internalFullColor = 'rgba(' + this.output.rgba.join(',') + ')'
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
        },
        limit: function(value, min, max){
            if(value < min) value = min
            if(value > max) value = max
            return value
        }
    },
    template: `
        <div class="colorpicker">
            <div class="event-background" @mousemove="mouseMove(event)" @mouseup="mouseUp(event)"></div>
            <div class="container" @mousemove="mouseMove(event)" @mouseup="mouseUp(event)">
                <div class="picker-container" draggable="false">
                    <div class="main-picker" @mousedown="mainMouseDown(event)" :style="'background:' + internalBaseColor">
                        <div class="handle" draggable="false" :style="'left: '+handlePos.mainX+'px; top: '+handlePos.mainY+'px;'"></div>
                    </div>
                    <div class="hue-picker" @mousedown="hueMouseDown(event)">
                        <div class="handle" draggable="false" :style="'top: '+handlePos.hue+'px;'"></div>
                    </div>
                    <div class="alpha-picker" @mousedown="alphaMouseDown(event)">
                        <div class="gradient" :style="'background: linear-gradient(0deg, rgba(0,0,0,0) 0%, '+internalColor+' 100%)'"></div>
                        <div class="handle" draggable="false" :style="'top: '+handlePos.alpha+'px;'"></div>
                    </div>
                </div>
                <div class="out" style="font-size: 16px">
                    rgba[ {{output.rgba.join(', ')}} ]<br>
                    hsv[ {{output.hsv.join(', ')}} ]<br>
                    #{{output.hex}}<br>
                </div>
            </div>
        </div>
    `
})