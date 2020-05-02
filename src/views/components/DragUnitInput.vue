<template>
    <div class="input">
        <div class="label" v-if="label">{{label}}</div>
        <input @click="selectAll()" @blur="valueBlur()" @dragstart.prevent @mousedown="valueMouseDown($event)" ref="input" type="number" class="number-input" v-model="value_">
        <div class="unit" @wheel.prevent="scrollUnit($event)">
            <div class="list top">
                <div class="item" v-for="(item,i) in unitList.top" :key="i">{{item}}</div>
            </div>
            {{units[unit]}}
            <div class="list bottom">
                <div class="item" v-for="(item,i) in unitList.bottom" :key="i">{{item}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: Object
            },
            label: {
                type: String
            },
            min: {
                type: Number
            }
        },
        data() {
            return {
                isValueMouseDown: false,
                isDragging: false,
                value_: 0,
                unit: 2,
                units: ['cm','auto','px','%','vm','vh','em','rem'],
                start: 0,
                temp: 0,
            }
        },
        computed: {
            unitList()
            {
                let units = this.units
                let top = []
                let bottom = []
                let len = 0

                len = Math.floor((units.length - 1) / 2)

                for (let i = 0; i < len; i++) {

                    let h = this.unit - i - 1
                    if( h < 0 ) h += units.length
                    
                    top.unshift(units[h])
                }

                len = units.length - Math.floor((units.length) / 2)

                for (let i = 0; i < len; i++) {

                    let h = this.unit + i + 1
                    if( h >= units.length ) h -= units.length
                    
                    bottom.push(units[h])
                }

                return {top, bottom}
            }
        },
        mounted() {
            const vm = this

            window.addEventListener('mousemove', function(event) {
                vm.valueMouseMove(event)
            }, false)

            window.addEventListener('mouseup', function(event) {
                vm.valueMouseUp(event)
            }, false)
        },
        watch: {
            value_() {
                this.limitValue()
            }
        },
        methods: {
            valueMouseDown(event) {
                this.isValueMouseDown = true
                this.start = event.clientY
            },

            valueMouseMove(event) {
                if( this.isValueMouseDown )
                {
                    
                    if( !this.isDragging && Math.abs(this.start - event.clientY) > 25 )
                    {
                        this.isDragging = true
                        this.start = event.clientY
                        this.temp = parseInt(this.value_)
                    }

                    if( this.isDragging )
                    {
                        this.value_ = this.temp + Math.round((this.start - event.clientY) * .4)
                        this.limitValue()
                    }
                }
            },

            valueMouseUp() {
                this.isValueMouseDown = false

                if( this.isDragging )
                {
                    this.$refs.input.blur()
                    this.isDragging = false
                }
            },

            selectAll() {
                // TODO: check if already has focus
                this.$refs.input.select()
            },

            valueBlur() {
                this.limitValue()
            },

            limitValue() {
                if( parseInt(this.value_) > 999999 ) this.value_ = 999999
                else if( parseInt(this.value_) < this.min ) this.value_ = this.min
            },



            scrollUnit(event) {
                if( event.wheelDelta > 0 )
                {
                    this.unit--
                }
                else
                {
                    this.unit++
                }

                if( this.unit >= this.units.length ) this.unit = 0
                else if( this.unit < 0 ) this.unit = this.units.length - 1
            },
        },
    }
</script>
<style lang="sass" scoped>
    .input
        --h: 30px
        --br: 5px
        height: var(--h)
        background: rgba(0,0,0,0.3)
        border-radius: var(--br)
        position: relative

        .label
            text-transform: uppercase
            color: var(--color-lighter)
            width: 24px
            line-height: calc(var(--h) + 1px)
            text-align: center
            font-size: 13px
            position: absolute
            top: 0
            left: 0
            user-select: none
            pointer-events: none
        
        .number-input
            width: 80px
            height: var(--h)
            line-height: var(--h)
            background: transparent
            border-radius: var(--br)
            border: none
            color: white
            font-size: 13px
            letter-spacing: 1px
            font-family: 'Muli'
            vertical-align: top
            padding-left: 24px
            text-align: right

            &.no-select
                user-select: none !important

        .unit
            width: 50px
            line-height: calc(var(--h) + 1px)
            height: var(--h)
            text-align: center
            font-size: 10px
            text-transform: uppercase
            letter-spacing: 1px
            padding-left: 1px
            color: var(--color-light)
            font-weight: 800
            border-radius: var(--br)
            user-select: none
            vertical-align: top
            position: relative
            cursor: default

            .list
                line-height: 20px
                width: 100%
                position: absolute
                left: 0
                pointer-events: none
                opacity: 0
                transition: opacity 100ms

                &.top
                    bottom: var(--h)
                    .item:first-of-type
                        border-radius: 5px 5px 0 0
                    .item:last-of-type
                        border-bottom-right-radius: 5px

                &.bottom
                    top: var(--h)
                    .item:last-of-type
                        border-radius: 0 0 5px 5px
                    .item:first-of-type
                        border-top-right-radius: 5px

                .item
                    height: 20px
                    line-height: 20px
                    background: var(--dark-background)
                    font-size: 10px
                    width: 100%
                    font-weight: 300
                    letter-spacing: 0px

            &:hover
                .list
                    pointer-events: all
                    opacity: 1
</style>