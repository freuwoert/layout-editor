<template>
    <div class="workspace">
        <div class="controls">
            <drag-unit class="control-input" label="W" :min="40" :max="9999" nounit :value="viewport.x" @input="setViewportSize({x: $event, y: null})"></drag-unit>
            <drag-unit class="control-input" label="H" :min="40" :max="9999" nounit :value="viewport.y" @input="setViewportSize({x: null, y: $event})"></drag-unit>
            <div class="control-icon-btn" @click="rotateCoupledViewport()">&#62581;</div>
            <div class="control-icon-btn" @click="toggleDecoupleViewport()" :class="{'active' : viewport.decoupled}">{{viewport.decoupled ? '&#64876;' : '&#62329;'}}</div>
        </div>

        <div class="center">
            <div class="decoupled-viewport" v-show="viewport.decoupled">
                <div class="icon">&#63880;</div>
                <div class="text">
                    The Viewport is <strong>decoupled</strong> and<br>shown in a seperate window.
                </div>
            </div>

            <viewport :content="viewport.content" v-show="!viewport.decoupled"></viewport>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import DragUnit from '../../components/DragUnitInput'
    import Viewport from './Viewport'

    export default {
        computed: {
            ...mapGetters([
                'viewport',
            ]),
        },
        methods: {
            ...mapActions([
                'setViewportSize',
                'rotateCoupledViewport',
                'toggleDecoupleViewport',
            ]),
        },
        components: {
            Viewport,
            DragUnit,
        }
    }
</script>
<style lang="sass" scoped>
    .workspace
        grid-area: workspace
        background: var(--dark-background)
        overflow: hidden
        position: relative

        .controls
            position: absolute
            top: 0
            left: 50%
            transform: translateX(-50%)
            height: 50px
            padding: 10px 5px
            border-radius: 0 0 10px 10px
            background: var(--background)
            user-select: none
            white-space: nowrap

            &:before
                content: ''
                height: 100%
                width: 10px
                border-radius: 0 10px 0 0
                background: var(--dark-background)
                position: absolute
                top: 0
                left: -10px
                box-shadow: 0 -10px var(--background)

            &:after
                content: ''
                height: 100%
                width: 10px
                border-radius: 10px 0 0 0
                background: var(--dark-background)
                position: absolute
                top: 0
                right: -10px
                box-shadow: 0 -10px var(--background)

            .control-icon-btn
                height: 30px
                width: 30px
                line-height: 30px
                border-radius: 3px
                overflow: hidden
                margin: 0 5px
                color: rgba(255, 255, 255, 0.7)
                font-size: 21px
                font-family: 'Material Icons'
                vertical-align: top
                text-align: center
                cursor: pointer

                &:hover
                    background: rgba(255, 255, 255, 0.05)
                    color: white

                &.active
                    background: var(--dark-background)
                    color: var(--primary)

            .control-input
                position: relative
                background: var(--darker-background)
                text-align: right
                height: 30px
                width: 70px
                border-radius: 3px
                cursor: text
                overflow: hidden
                margin: 0 5px

                .icon
                    width: 28px
                    text-align: center
                    line-height: 30px
                    color: var(--color)
                    font-size: 17px
                    font-family: 'Material Icons'
                    vertical-align: top

                .input
                    border: none
                    height: 30px
                    width: calc(100% - 28px)
                    position: absolute
                    top: 0
                    left: 30px
                    padding-right: 8px
                    background: transparent
                    color: var(--color-bright)
                    font-family: 'SCP'
                    font-size: 12px
                    text-align: right
                    letter-spacing: 0.5px

                    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button
                        -webkit-appearance: none
                        margin: 0

        .center
            position: absolute
            top: 50px
            left: 0
            width: 100%
            height: calc(100% - 50px)
            padding-top: 50px
            text-align: center
            user-select: none

            .decoupled-viewport
                position: absolute
                top: calc(50%)
                left: 0
                width: 100%
                height: 140px
                transform: translateY(-50%)

                .icon
                    height: 140px
                    width: 140px
                    border-radius: 100%
                    line-height: 140px
                    text-align: center
                    margin-right: 20px
                    color: var(--dark-background)
                    background: rgba(255,255,255, 0.05)
                    font-size: 90px
                    font-family: 'Material Icons'
                    vertical-align: middle

                .text
                    color: rgba(255,255,255, 0.2)
                    font-size: 17px
                    letter-spacing: 1px
                    line-height: 22px
                    text-align: left
                    vertical-align: middle

                    strong
                        font-weight: 800
</style>