<template>
    <div class="option-panel">
        <div class="action-button">
            <div class="icon">&#984503;</div> Build Code
        </div>

        <div class="more" @click="toggleMoreMenu()">&#983900;</div>

        <div class="more-menu" v-show="moreMenu">
            <div class="account-container">
                <div class="image-container">
                    <div class="image"></div>
                </div>
            </div>
            <div class="option-container">
                <div class="option">
                    <div class="icon">&#983049;</div>
                    <div class="text">Account</div>
                </div>
                <div class="option" @click="setSettingsUI(true)">
                    <div class="icon">&#984211;</div>
                    <div class="text">Settings</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data() {
            return {
                moreMenu: false
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
        },
        methods: {
            ...mapActions([
                'setSettingsUI',
            ]),

            toggleMoreMenu() {
                this.moreMenu = !this.moreMenu
            },
        },
        components: {

        }
    }
</script>
<style lang="sass" scoped>
    .option-panel
        grid-area: option_panel
        background: var(--background)
        position: relative
        text-align: left

        .action-button
            height: 30px
            line-height: 30px
            margin: 5px 0
            margin-left: 10px
            color: var(--color)
            border-radius: 5px
            font-size: 11px
            font-weight: 800
            letter-spacing: 1px
            text-transform: uppercase
            cursor: pointer
            user-select: none
            padding-left: 4px
            padding-right: 15px

            .icon
                color: inherit
                font-family: 'Material Icons'
                font-size: 16px
                height: 30px
                width: 30px
                text-align: center
                line-height: 30px
                font-weight: normal
                vertical-align: top

            &:hover
                background: var(--color-dimm)
                color: var(--color-bright)

        .more
            width: 32px
            height: 32px
            line-height: 32px
            text-align: center
            float: right
            margin: 4px 8px
            color: var(--color)
            font-family: 'Material Icons'
            font-size: 20px
            user-select: none
            cursor: pointer
            border-radius: 40px

            &:hover
                color: var(--color-bright)
                background: var(--color-dimm)

        .more-menu
            position: absolute
            top: 45px
            right: 10px
            width: 300px
            background: var(--background)
            border-radius: 5px 4px 5px 5px
            z-index: 2
            filter: drop-shadow(0 6px 10px rgba(0,0,0,0.3))

            &:before
                content: ''
                position: absolute
                top: -14px
                right: 4px
                height: 0
                width: 0
                border: 10px solid transparent
                border-top-width: 7px
                border-bottom-width: 7px
                border-bottom-color: var(--background)

            .account-container
                width: calc(100% - 10px)
                border-radius: 5px 4px 5px 5px
                background: var(--dark-background)
                margin: 5px
                margin-bottom: 10px

                .image-container
                    height: 60px
                    width: 60px
                    margin: 10px
                    border-radius: 100px
                    background: var(--background)
                    padding: 2px

                    .image
                        height: 100%
                        width: 100%
                        border-radius: 100%
                        background: var(--green)

            .option-container
                width: 100%
                margin-bottom: 10px

                .option
                    width: 100%
                    height: 40px
                    border-radius: 5px
                    user-select: none
                    cursor: pointer
                    color: var(--color)

                    .icon
                        width: 50px
                        height: 40px
                        line-height: 40px
                        text-align: center
                        color: var(--color-lighter)
                        font-family: 'Material Icons'
                        font-size: 20px
                        vertical-align: top

                    .text
                        height: 40px
                        line-height: 40px
                        font-size: 11px
                        font-weight: 800
                        color: inherit
                        letter-spacing: 1px
                        text-transform: uppercase
                        vertical-align: top

                    &:hover
                        color: var(--color-bright)
                        background: var(--color-dimm)
</style>