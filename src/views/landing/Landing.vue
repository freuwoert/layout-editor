<template>
    <div class="view">
        <div class="header"></div>
        <div class="container">
            <div class="selector">
                <div class="software-info">
                    <div class="logo-wrapper">
                        <img src="~@/assets/images/icon/vudesigner_logo_white.svg" class="logo">
                        <div class="name">VuDesigner</div>
                    </div>
                    <div class="panel-button settings" @click="setSettingsUI(true)">&#62611;</div>
                    <div class="panel-button info">&#62205;</div>
                </div>
                <div class="button-wrapper">
                    <div class="project-button b1">
                        <div class="create-container" @click="setView({ view: 'PROJECT_MANAGER' })">
                            <div class="icon">&#62027;</div>
                            <div class="label">New Project</div>
                        </div>
                        <div class="open-button">Open</div>
                    </div>
                    <div class="project-button b2">
                        <div class="create-container" @click="setView({ view: 'LAYOUT_CREATOR' })">
                            <div class="icon">&#63275;</div>
                            <div class="label">New Page or Asset</div>
                        </div>
                        <div class="open-button">Open</div>
                    </div>
                    <div class="project-button b3">
                        <div class="create-container">
                            <div class="icon">&#62185;</div>
                            <div class="label">New Vector Image</div>
                        </div>
                        <div class="open-button">Open</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([]),
    },
    methods: {
        ...mapActions([
            'setView',
            'setSettingsUI',
        ]),
    },
}
</script>
<style lang="sass" scoped>
    .view
        display: block
        background: var(--dark-background)

        .header
            height: 40px
            width: 100%
            position: absolute
            top: 0
            left: 0
            background: var(--background)

        .container
            width: 100%
            position: absolute
            top: 40px
            left: 0

            .selector
                width: calc(100% - 20px)
                max-width: 1360px
                margin: 0 10px
                min-height: 20px
                position: relative
                background: var(--background)
                border-radius: 0 0 10px 10px
                padding: 20px
                padding-top: 0
                user-select: none

                &:before
                    content: ''
                    height: var(--header-height)
                    width: 10px
                    border-radius: 0 10px 0 0
                    background: var(--dark-background)
                    position: absolute
                    top: 0
                    left: -10px
                    box-shadow: 0 -10px var(--background)

                &:after
                    content: ''
                    height: var(--header-height)
                    width: 10px
                    border-radius: 10px 0 0 0
                    background: var(--dark-background)
                    position: absolute
                    top: 0
                    right: -10px
                    box-shadow: 0 -10px var(--background)

                .software-info
                    width: calc(100% - 40px)
                    margin: 20px
                    margin-top: 0
                    height: 200px
                    position: relative
                    background: var(--light-background)
                    border-radius: 10px
                    text-align: left

                    .logo-wrapper
                        padding: 40px
                        
                        .logo
                            height: 120px
                            width: 120px
                            vertical-align: middle
                            margin-right: 30px
                            -webkit-user-drag: none

                        .name
                            font-size: 30px
                            font-weight: 700
                            letter-spacing: 2px
                            vertical-align: middle

                    .panel-button
                        width: 40px
                        text-align: center
                        height: 40px
                        line-height: 40px
                        position: absolute
                        right: 10px
                        border-radius: 5px
                        font-size: 25px
                        font-family: 'Material Icons'
                        text-transform: uppercase
                        color: var(--color)
                        cursor: pointer

                        &.settings
                            top: 10px
                        &.info
                            bottom: 10px
                        
                        &:hover
                            background: var(--color-dimm)
                            color: var(--color-bright)

                .button-wrapper
                    width: 100%
                    display: flex

                    .project-button
                        flex: 1
                        border-radius: 10px
                        background: var(--light-background)
                        margin: 20px
                        height: 260px
                        position: relative
                        user-select: none
                        text-align: left

                        &.b1
                            background: #0984E3
                        &.b2
                            background: #7F1DFF
                        &.b3
                            background:#FF3463

                        .create-container
                            width: 100%
                            height: 100%
                            cursor: pointer
                            position: absolute

                            .icon
                                position: absolute
                                left: 50%
                                top: 50%
                                transform: translate(-50%, calc(-50% - 10px))
                                border-radius: 5px
                                font-size: 140px
                                font-family: 'Material Icons'
                                text-transform: uppercase
                                color: var(--color)
                                cursor: pointer

                            .label
                                height: 30px
                                line-height: 30px
                                position: absolute
                                z-index: 1
                                bottom: 10px
                                left: 10px
                                font-size: 15px
                                font-weight: 800
                                letter-spacing: 1px
                                padding: 0 10px
                                text-transform: uppercase
                                color: var(--color-bright)
                                cursor: pointer

                        .open-button
                            height: 30px
                            line-height: 30px
                            position: absolute
                            z-index: 1
                            bottom: 10px
                            right: 10px
                            border-radius: 5px
                            font-size: 13px
                            font-weight: 800
                            letter-spacing: 1px
                            padding: 0 10px
                            text-transform: uppercase
                            color: var(--color)
                            cursor: pointer

                            &:hover
                                background: var(--color-lighter)
                                color: var(--color-bright)

            
</style>