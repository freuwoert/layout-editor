<template>
    <div class="dropdown">
        <div class="container" @click="openList()">
            <div class="text">{{label_}}</div>
            <div class="icon">&#61760;</div>
        </div>
        <div class="drop-list" v-show="isOpen">
            <div class="drop-option" v-for="(option, i) in options" @click="chooseItem(i)" :key="i" :class="{'selected': i.toString() === value_.toString()}">{{option}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            value: {},
            options: {
                type: Object
            }
        },
        data() {
            return {
                value_: '',
                label_: '',
                isOpen: false,
            }
        },
        mounted() {
            let value = this.value

            if( this.options )
            {
                if( !this.options.hasOwnProperty(this.value) ) value = Object.keys(this.options)[0]
    
                this.value_ = value
                this.label_ = this.options[value]
            }
        },
        watch: {
            value() {
                if( this.options && this.options.hasOwnProperty(this.value) )
                {
                    this.value_ = this.value
                    this.label_ = this.options[this.value]
                }
            },
            options() {
                if( this.options && !this.options.hasOwnProperty(this.value) )
                {
                    this.chooseItem(Object.keys(this.options)[0])
                }
            },
        },
        methods: {
            openList() {
                this.isOpen = true
            },
            chooseItem(value) {
                this.value_ = value
                this.label_ = this.options[value]
                this.$emit('input', this.value_)
                this.closeList()
            },
            closeList() {
                this.isOpen = false
            }
        }
    }
</script>
<style lang="sass" scoped>
    .dropdown
        --h: 30px
        height: var(--h)
        line-height: var(--h)
        background: var(--darker-background)
        border-radius: 5px
        user-select: none
        text-align: center
        position: relative

        .container
            width: 100%
            cursor: pointer

        .icon
            height: var(--h)
            line-height: var(--h)
            width: var(--h)
            text-align: center
            color: var(--color-lighter)
            font-family: 'Material Icons'
            font-size: 20px
            vertical-align: top
            float: right

        .text
            width: calc(100% - var(--h))
            height: var(--h)
            line-height: var(--h)
            color: var(--color)
            font-size: 13px
            font-weight: 700
            letter-spacing: 0.5px
            vertical-align: top
            padding-left: 10px
            text-align: inherit

        .drop-list
            line-height: 30px
            border-radius: 5px
            background: var(--dark-background)
            width: 100%
            position: absolute
            bottom: 0
            left: 0
            font-size: 0
            max-height: 300px
            overflow-y: auto
            text-align: left

            .drop-option
                height: 30px
                width: 100%
                line-height: 30px
                padding: 0 10px
                font-size: 12px
                letter-spacing: 1px
                white-space: nowrap
                overflow: hidden
                font-weight: 800
                color: var(--color-bright)
                display: block
                border-left: 2px solid transparent

                &:hover
                    background: var(--color-dimm)

                &:first-of-type
                    border-top-left-radius: 5px
                    border-top-right-radius: 5px

                &:last-of-type
                    border-bottom-left-radius: 5px
                    border-bottom-right-radius: 5px

                &.selected
                    border-color: var(--primary)
                    color: var(--primary)

</style>