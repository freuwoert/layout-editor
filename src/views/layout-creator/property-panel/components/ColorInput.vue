<template>
    <div class="color-input">
        <checkbox @click.native="emitChange" v-model="checked" class="checkbox"></checkbox>

        <div class="color-toggle">
            <div class="grid"></div>
            <div class="color" :style="'background: '+color+';'"></div>
        </div>
        <div class="label">{{label}}</div>
        <div class="eyedropper-toggle">&#983562;</div>



        <colorpicker class="colorpicker" v-model="color"></colorpicker>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import { EventBus } from '@/assets/js/event-bus'
    import Colorpicker from '../../../components/Colorpicker.vue'
    import Checkbox from '../../../components/Checkbox.vue'

    export default {
        props: {
            label: {
                type: String,
            },
            value: {
                type: Object,
            },
        },
        computed: {
            ...mapGetters([]),
        },
        methods: {
            ...mapActions([]),

            emitChange() {
                this.$emit('input', {color: this.color, checked: this.checked})
            },
        },
        mounted() {
            if( this.value )
            {
                this.color = this.value.color
                this.checked = this.value.checked
            }
        },
        watch: {
            value() {
                this.color = this.value.color
                this.checked = this.value.checked
            }
        },
        data() {
            return {
                checked: false,
                color: '#0057ffff',
            }
        },
        components: {
            Colorpicker,
            Checkbox,
        }
    }
</script>
<style lang="sass" scoped>
    .color-input
        width: 100%
        height: 30px
        margin: 5px 0
        position: relative

        .checkbox
            vertical-align: top

        .color-toggle
            height: 22px
            width: 42px
            border-radius: 5px
            background: var(--dark-background)
            margin: 4px 10px
            vertical-align: top
            user-select: none
            cursor: pointer
            overflow: hidden
            position: relative

            .grid
                height: calc(100% - 2px)
                width: calc(100% - 2px)
                position: absolute
                top: 1px
                left: 1px
                background-image: url('~@/assets/images/interface/general/grid.svg')
                background-size: 20px
                background-position: top left
                background-color: white
                border-radius: 4px

            .color
                height: calc(100% - 2px)
                width: calc(100% - 2px)
                position: absolute
                top: 1px
                left: 1px
                z-index: 1
                border-radius: 4px
        
        .label
            height: 30px
            width: calc(100% - 122px)
            line-height: 30px
            text-align: left
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            font-size: 11px
            font-weight: 800
            letter-spacing: 1px
            text-transform: uppercase
            color: var(--color-bright)
            user-select: none
        
        .eyedropper-toggle
            height: 30px
            width: 30px
            line-height: 30px
            text-align: center
            border-radius: 5px
            font-family: 'Material Icons'
            font-size: 20px
            color: var(--color-light)
            vertical-align: top
            user-select: none
            cursor: pointer

            &:hover
                background: var(--color-dimm)
                color: var(--color-bright)

        

        .colorpicker
            position: absolute
            top: 0
            right: 400px
</style>