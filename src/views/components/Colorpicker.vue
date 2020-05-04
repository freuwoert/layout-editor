<template>
    <div class="colorpicker">
        <div class="container">
            <div class="mode-selector">
                <div class="mode" @mousedown="switchMode('PLAIN')" :class="{'active': mode === 'PLAIN'}">
                    <div class="icon">&#61742;</div>
                    <div class="text">Plain</div>
                </div>
                <div class="mode" @mousedown="switchMode('LINEAR')" :class="{'active': mode === 'LINEAR'}">
                    <div class="icon">&#61622;</div>
                    <div class="text">Linear</div>
                </div>
                <div class="mode" @mousedown="switchMode('RADIAL')" :class="{'active': mode === 'RADIAL'}">
                    <div class="icon">&#61621;</div>
                    <div class="text">Radial</div>
                </div>
            </div>
            <div class="eyedropper">&#61962;</div>
            <div class="picker-container" draggable="false">
                <div class="main-picker" @mousedown="mainMouseDown($event)" :style="'background:' + internalBaseColor">
                    <div class="handle" draggable="false" :style="'left: '+handlePos.mainX+'px; top: '+handlePos.mainY+'px;'"></div>
                </div>
                <div class="hue-picker" @mousedown="hueMouseDown($event)">
                    <div class="handle" draggable="false" :style="'top: '+handlePos.hue+'px;'"></div>
                </div>
                <div class="alpha-picker" @mousedown="alphaMouseDown($event)">
                    <div class="gradient" :style="'background: linear-gradient(0deg, rgba(0,0,0,0) 0%, '+internalColor+' 100%)'"></div>
                    <div class="handle" draggable="false" :style="'top: '+handlePos.alpha+'px;'"></div>
                </div>
            </div>
            <div class="output-container">
                <!-- <drop-down class="selector-input" label="RGB"></drop-down>
                <drag-unit class="number-input" @input="setColor('RGB')" v-model="output.rgb[0]" :max="255" :min="0" nounit></drag-unit>
                <drag-unit class="number-input" @input="setColor('RGB')" v-model="output.rgb[1]" :max="255" :min="0" nounit></drag-unit>
                <drag-unit class="number-input" @input="setColor('RGB')" v-model="output.rgb[2]" :max="255" :min="0" nounit></drag-unit>
                <drag-unit class="number-input" @input="setAlpha()" v-model="output.alpha" :max="100" :min="0" nounit></drag-unit>

                <drop-down class="selector-input" label="HSB"></drop-down>
                <drag-unit class="number-input" @input="setColor('HSB')" v-model="output.hsb[0]" :max="360" :min="0" nounit></drag-unit>
                <drag-unit class="number-input" @input="setColor('HSB')" v-model="output.hsb[1]" :max="100" :min="0" nounit></drag-unit>
                <drag-unit class="number-input" @input="setColor('HSB')" v-model="output.hsb[2]" :max="100" :min="0" nounit></drag-unit>
                <drag-unit class="number-input" @input="setAlpha()" v-model="output.alpha" :max="100" :min="0" nounit></drag-unit> -->

                <drop-down class="selector-input" label="HEX"></drop-down>
                <text-field class="text-input"  @input="setColor('HEX')" v-model="output.hex"></text-field>
                <drag-unit class="number-input" @input="setAlpha()" v-model="output.alpha" :max="100" :min="0" nounit></drag-unit>
            </div>
            <div class="divider"></div>
            <div class="swatches-container">
                <div class="swatch-paginator">
                    <div class="arrow left">&#61761;</div>
                    <div class="title">{{swatches[1].vendor}} - {{swatches[1].name}}</div>
                    <div class="arrow right">&#61762;</div>
                </div>
                <div class="swatches">
                    <!-- <div class="swatch add-button">
                        <div class="icon">&#62485;</div>
                    </div> -->
                    <div class="swatch" v-for="(swatch ,i) in swatches[1].swatches" :key="i" :style="'background:' + swatch"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import colorConvert from 'color-convert'
    import DropDown from '../components/DropDown.vue'
    import DragUnit from '../components/DragUnitInput.vue'
    import TextField from '../components/TextField.vue'

    export default {
        props: ['value'],
        data() {
            return {
                mode: 'PLAIN',
                
                selectedOutput: 'rgba',
                output: {
                    rgb: [0,0,0],
                    alpha: 0,
                    hex: '000000',
                    hsb: [0,0,0],
                },

                internalColor: 'rgba(255, 0, 0, 1)',
                internalBaseColor: 'rgba(255, 0, 0, 1)',
                internalFullColor: 'rgba(255, 0, 0, 1)',

                maxX: 260,
                maxY: 230,
                grabbed: {
                    hue: false,
                    main: false,
                    alpha: false,
                },
                handlePos: {
                    hue: 0,
                    mainX: 0,
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
                    mainX: 0,
                    mainY: 0,
                    alpha: 0,
                },
            }
        },
        mounted() {
            this.handlePos.mainX = this.maxX

            // Init color
            this.setAlpha(100)
            this.setColor('HEX','#FF0000')

            // MouseMove & MouseUp Events
            const vm = this

            window.addEventListener('mousemove', function(event) {
                vm.mouseMove(event)
            }, false)

            window.addEventListener('mouseup', function(event) {
                vm.mouseUp(event)
            }, false)
        },
        computed: {
            ...mapGetters([
                'swatches',
            ]),
        },
        methods: {
            ...mapActions([]),

            switchMode(mode) {
                if( ['PLAIN','LINEAR','RADIAL'].includes(mode) ) this.mode = mode
            },

            hueMouseDown(e) {
                this.grabbed.hue = true
                this.handleStartPos.hue = this.getCoords(e.target).top
                this.mouseMove(e)
            },

            mainMouseDown(e) {
                this.grabbed.main = true
                this.handleStartPos.mainX = this.getCoords(e.target).left
                this.handleStartPos.mainY = this.getCoords(e.target).top
                this.mouseMove(e)
            },

            alphaMouseDown(e) {
                this.grabbed.alpha = true
                this.handleStartPos.alpha = this.getCoords(e.target).top
                this.mouseMove(e)
            },

            mouseUp(e) {
                this.grabbed.hue = false
                this.grabbed.main = false
                this.grabbed.alpha = false
            },

            mouseMove(e) {
                
                let isGrabbed = false

                // Calc hue
                if(this.grabbed.hue)
                {
                    this.handlePos.hue = this.limit(e.y - this.handleStartPos.hue, 0, this.maxY)
                    this.handleValue.hue = this.handlePos.hue / this.maxY
                    isGrabbed = true
                }

                // Calc main
                if(this.grabbed.main)
                {
                    this.handlePos.mainX = this.limit(e.x - this.handleStartPos.mainX, 0, this.maxX)
                    this.handlePos.mainY = this.limit(e.y - this.handleStartPos.mainY, 0, this.maxY)
                    this.handleValue.mainX = this.handlePos.mainX / this.maxX
                    this.handleValue.mainY = 1 - this.handlePos.mainY / this.maxY
                    isGrabbed = true
                }

                // Calc alpha
                if(this.grabbed.alpha)
                {
                    this.handlePos.alpha = this.limit(e.y - this.handleStartPos.alpha, 0, 230)
                    this.handleValue.alpha = Math.round(100 - this.handlePos.alpha / (this.maxY / 100)) / 100
                    
                    isGrabbed = true
                }

                // Set Output Values
                if(isGrabbed)
                {
                    let colorArrayRaw = [360 * this.handleValue.hue, 100 * this.handleValue.mainX, 100 * this.handleValue.mainY]
                    let colorArray = [Math.round(360 * this.handleValue.hue), Math.round(100 * this.handleValue.mainX), Math.round(100 * this.handleValue.mainY)]

                    this.output.rgb = colorConvert.hsv.rgb(colorArrayRaw)
                    this.output.hex = '#'+colorConvert.hsv.hex(colorArrayRaw)
                    this.output.hsb = colorArray
                    this.output.alpha = this.handleValue.alpha * 100

                    this.updateInternalColors()
                }
            },

            updateInternalColors() {
                this.internalBaseColor = 'rgb(' + colorConvert.hsv.rgb(360 * this.handleValue.hue, 100, 100).join(',') + ')'
                this.internalColor = 'rgba(' + this.output.rgb.join(',') + ', 1)'
                this.internalFullColor = 'rgba(' + this.output.rgb.join(',') + ', '+ this.output.alpha / 100 +')'
            },

            getCoords(elem) {
                var box = elem.getBoundingClientRect()
            
                var body = document.body
                var docEl = document.documentElement
            
                var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
                var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft
            
                var clientTop = docEl.clientTop || body.clientTop || 0
                var clientLeft = docEl.clientLeft || body.clientLeft || 0
            
                var top = box.top + scrollTop - clientTop
                var left = box.left + scrollLeft - clientLeft
            
                return { top: top, left: left }
            },

            limit(value, min, max) {
                if(value < min) value = min
                if(value > max) value = max
                return value
            },

            setAlpha(value = this.output.alpha) {

                if( value !== this.output.alpha ) this.output.alpha = value

                if( !this.grabbed.alpha )
                {
                    this.handleValue.alpha = value / 100
                    this.handlePos.alpha = this.maxY - this.maxY * this.handleValue.alpha
                }

                this.updateInternalColors()
            },

            setColor(base, value = false) {
                let rgb = null
                let hsb = null
                let hex = null
                let hasRun = false

                if( base === 'HEX' )
                {
                    value = value ? value : this.output.hex

                    hex = value
                    rgb = colorConvert.hex.rgb(value)
                    hsb = colorConvert.rgb.hsv(rgb)

                    hasRun = true
                }

                if( base === 'RGB' )
                {
                    value = value ? value : this.output.rgb

                    rgb = value
                    hex = '#'+colorConvert.rgb.hex(value)
                    hsb = colorConvert.hex.hsv(hex)

                    hasRun = true
                }

                if( base === 'HSB' )
                {
                    value = value ? value : this.output.hsb

                    rgb = colorConvert.hsv.rgb(value)
                    hex = '#'+colorConvert.rgb.hex(rgb)
                    hsb = value

                    hasRun = true
                }

                if( hasRun )
                {
                    this.output.rgb = rgb
                    this.output.hsb = hsb
                    this.output.hex = hex

                    if( !this.grabbed.hue && !this.grabbed.main)
                    {
                        this.handleValue.hue = hsb[0] / 360
                        this.handlePos.hue = this.maxY * this.handleValue.hue
                        
                        this.handleValue.mainX = hsb[1] / 100
                        this.handleValue.mainY = hsb[2] / 100
                        this.handlePos.mainX = this.maxX * this.handleValue.mainX
                        this.handlePos.mainY = this.maxY - this.maxY * this.handleValue.mainY
                    }
    
                    this.updateInternalColors()
                }
            }
        },
        components: {
            DropDown,
            DragUnit,
            TextField,
        }
    }
</script>
<style lang="sass" scoped>
    .colorpicker
        .container
            width: 370px
            border-radius: 5px
            background: var(--background)
            filter: drop-shadow(0 6px 10px rgba(0,0,0,0.3))
            position: fixed
            top: 40%
            right: 40%
            z-index: 1
            text-align: left

            &:before
                content: ''
                position: absolute
                right: -20px
                top: calc(50% - 20px)
                height: 0
                width: 0
                border: 10px solid transparent
                border-top-width: 20px
                border-bottom-width: 20px
                border-left-color: var(--background)

            .divider
                border-bottom: 1px solid var(--color-dimm)
                width: calc(100% - 40px)
                margin: 0 20px

            .eyedropper
                height: 30px
                width: 30px
                border-radius: 5px
                margin: 20px 13px 20px 7px
                text-align: center
                line-height: 30px
                font-family: 'Material Icons'
                font-size: 20px
                vertical-align: top
                user-select: none
                color: var(--color-light)
                float: right
                cursor: pointer

                &:hover
                    color: var(--color-bright)

            .mode-selector
                width: calc(100% - 50px)
                display: inline-flex
                padding: 20px
                padding-right: 0
                user-select: none
                vertical-align: top

                .mode
                    flex: 1
                    height: 30px
                    line-height: 30px
                    text-align: center
                    background: var(--dark-background)
                    cursor: pointer
                    transition: background 20ms

                    .icon
                        font-family: 'Material Icons'
                        font-size: 20px
                        vertical-align: middle
                        margin-right: 5px
                        color: var(--color-lighter)

                    .text
                        font-size: 11px
                        text-transform: uppercase
                        color: var(--color)
                        vertical-align: middle
                        letter-spacing: 0.5px
                        font-weight: 600

                        .text-input
                            text-transform: uppercase !important

                    &:first-of-type
                        border-top-left-radius: 5px
                        border-bottom-left-radius: 5px

                    &:last-of-type
                        border-top-right-radius: 5px
                        border-bottom-right-radius: 5px

                    &.active
                        background: var(--darker-background)

                        .icon, .text
                            color: var(--primary)

            .picker-container
                height: 230px
                width: 100%
                padding: 0 20px
                user-drag: none
                user-select: none

                .handle
                    height: 15px
                    width: 15px
                    border: 2px solid white
                    border-radius: 30px
                    filter: drop-shadow(0 1px 1px rgba(0,0,0,0.6))
                    position: absolute
                    top: 0
                    left: 0
                    pointer-events: none
                    z-index: 5
                    transform: translateY(-50%)

                .main-picker
                    height: 100%
                    width: 260px
                    margin-right: 20px
                    border-radius: 3px
                    overflow: hidden
                    position: relative

                    &:before
                        content: ''
                        position: absolute
                        top: 0
                        left: 0
                        height: 100%
                        width: 100%
                        background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)

                    &:after
                        content: ''
                        position: absolute
                        top: 0
                        left: 0
                        height: 100%
                        width: 100%
                        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)

                    .handle
                        transform: translate(-50%, -50%)

                .hue-picker
                    height: 100%
                    width: 15px
                    border-radius: 3px
                    overflow: hidden
                    margin-right: 20px
                    position: relative
                    background: linear-gradient(to bottom, red 0%, #ff0 17%, lime 33%, cyan 50%, blue 66%, #f0f 83%, red 100%)

                .alpha-picker
                    height: 100%
                    width: 15px
                    border-radius: 3px
                    overflow: hidden
                    background-image: url('~@/assets/images/interface/general/grid.svg')
                    background-size: 15px
                    background-position: top center
                    background-color: white
                    position: relative

                    .gradient
                        content: ''
                        position: absolute
                        top: 0
                        left: 0
                        height: 100%
                        width: 100%
            
            .output-container
                width: 100%
                padding: 20px

                .selector-input
                    width: 80px
                    margin-right: 10px

                .number-input
                    width: 50px
                    text-align: center
                    margin-left: 10px

                .text-input
                    width: 170px
                    text-align: center
                    margin-left: 10px
            
            .swatches-container
                width: 100%
                padding: 10px
                user-select: none

                .swatch-paginator
                    width: calc(100% - 20px)
                    margin: 10px
                    height: 30px
                    text-align: center

                    .title
                        text-align: center
                        font-size: 13px
                        height: 30px
                        line-height: 30px
                        text-transform: uppercase
                        font-weight: 800
                        letter-spacing: 1px
                        color: var(--color)

                    .arrow
                        height: 30px
                        line-height: 30px
                        width: 30px
                        text-align: center
                        border-radius: 5px
                        font-family: 'Material Icons'
                        font-size: 20px
                        color: var(--color-bright)
                        cursor: pointer

                        &:hover
                            color: var(--color-bright)
                            background: var(--color-dimm)

                        &.left
                            float: left
                        &.right
                            float: right

                .swatches
                    width: 100%
                    padding: 5px

                    .swatch
                        width: calc(100% / 8 - 10px)
                        padding-bottom: calc(100% / 8 - 12px)
                        margin: 5px
                        border-radius: 5px
                        background: var(--primary)
                        border: 1px solid var(--darker-background)
                        vertical-align: top

                        &.add-button
                            background: transparent
                            position: relative
                            cursor: pointer

                            .icon
                                height: 30px
                                line-height: 30px
                                width: 30px
                                text-align: center
                                font-family: 'Material Icons'
                                font-size: 20px
                                color: var(--color-bright)
                                position: absolute
                                top: 50%
                                left: 50%
                                transform: translate(-50%, -50%)
</style>