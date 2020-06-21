<template>
    <div class="styling-panel">
        <div class="container" v-if="properties.hasOwnProperty('text')">
            <textarea rows="10" class="text-field" v-model="textField" placeholder="Text"></textarea>
        </div>

        <div class="container" v-if="properties.style">
            <div class="wrapper">
                <checkbox></checkbox><drag-unit class="test-1" label="w" :min="0"></drag-unit>
                <checkbox></checkbox><drag-unit class="test-2" label="h" :min="0"></drag-unit>
            </div>

            <color-input v-model="test" label="Background Color"></color-input>
            <color-input v-model="test" label="Color"></color-input>
        </div>

        <div class="container" v-if="properties.hasOwnProperty('icon')">
            <iconpicker></iconpicker>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import { EventBus } from '@/assets/js/event-bus'
    import DragUnit from '../../components/DragUnitInput.vue'
    import Colorpicker from '../../components/Colorpicker.vue'
    import ColorInput from './components/ColorInput.vue'
    import Iconpicker from '../../components/Iconpicker.vue'
    import Checkbox from '../../components/Checkbox.vue'

    export default {
        computed: {
            ...mapGetters([
                'selectedStructures',
                'getProperty',
            ]),
        },
        methods: {
            ...mapActions([
                'setProperty',
                'setDraggedElement',
            ]),
        },
        data() {
            return {
                properties: {},
                textField: '',
                test: {checked: true, color: '#7d5fffff'}
            }
        },
        mounted() {

            EventBus.$on('structure-selected', (uuids) => {
                this.properties = this.getProperty(uuids)

                // if( structure.hasOwnProperty('text') )
                // {
                //     this.textField = structure.text
                // }
                // else
                // {
                //     this.textField = ''
                // }
            })
        },
        watch: {
            textField() {
                if( this.selectedStructures.length > 0 )
                {
                    this.setProperty({selectedStructures: this.selectedStructures, text: this.textField})
                }
            }
        },
        components: {
            DragUnit,
            Colorpicker,
            ColorInput,
            Iconpicker,
            Checkbox,
        }
    }
</script>
<style lang="sass" scoped>
    .wrapper
        height: 30px
        width: 100%
        margin: 5px 0
    .test-1
        width: 145px
        margin: 0 10px 0 10px

    .test-2
        width: 145px
        margin: 0 0 0 10px

    .test-divider
        height: 10px
        width: 100%

    .styling-panel
        grid-area: styling_panel
        position: relative
        // overflow-y: auto
        margin: 5px 0
        background: var(--background)
        border-radius: 5px 0 0 5px

        .container
            border-top: 5px solid var(--dark-background)
            width: 100%
            padding: 5px 10px
            text-align: left

            &:first-of-type
                border: none

        .text-field
            width: 100%
            height: 150px
            border-radius: 5px
            background: var(--darker-background)
            border: none
            resize: none
            padding: 10px
            font-family: 'SCP'
            color: var(--color)

        .tree-container
            width: calc(100% - 10px)
            margin: 25px 5px 5px 5px
            flex: 1 1 0px
            overflow: hidden
            overflow-y: auto

        .button-container
            height: 55px
            width: 100%
            border-top: 5px solid var(--dark-background)
            background: var(--background)
            display: inline-flex

            .btn
                height: 50px
                flex: 1
                position: relative
                border-radius: 5px
                background: var(--background)
                user-select: none
                cursor: pointer

                &:hover
                    background: rgba(255, 255, 255, 0.05)
                    .icon
                        color: white !important
                
                .icon
                    position: absolute
                    top: 0
                    left: 0
                    height: 100%
                    width: 100%
                    text-align: center
                    line-height: 37px
                    color: rgba(255, 255, 255, 0.7)
                    font-size: 22px
                    font-family: 'Material Icons'

                .key
                    width: 100%
                    height: 20px
                    line-height: 20px
                    color: rgba(255, 255, 255, 0.2)
                    text-align: center
                    font-size: 12px
                    letter-spacing: 1px
                    position: absolute
                    top: 29px
                    left: 0

                    &.small
                        font-size: 10px
                        top: 30px

                    span
                        font-family: 'Material Icons'
</style>