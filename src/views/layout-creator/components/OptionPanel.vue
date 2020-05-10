<template>
    <div class="option-panel">
        <div class="button">
            <div class="icon">&#62903;</div> Build Code
        </div>

        <div class="account">
            <div class="sign-in" v-show="!userInfo.online">
                <div class="text">Sign In</div>
                <div class="image">
                    <div class="icon">&#64305;</div>
                </div>
            </div>
            <div class="online" v-show="userInfo.online">
                <div class="text">{{userInfo.displayName}}</div>    
                <div class="image">
                    <img :src="userInfo.displayImage" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
        },
        methods: {
            ...mapActions([]),
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

        .leave-button
            width: 50px
            height: 32px
            line-height: 32px
            margin: 4px 0
            font-family: 'Material Icons'
            font-size: 20px
            color: var(--red)
            text-align: center
            border-radius: 5px
            cursor: pointer
            user-select: none

            &:hover
                background: var(--color-dimm)

        .button, .icon-button
            margin: 7px
            margin-right: 0
            background: transparent
            color: var(--color)

            &:hover
                background: var(--color-dimm)
                color: var(--color-bright)

        .account
            position: absolute
            top: 0
            right: 0
            height: 100%
            line-height: 40px
            padding: 3px 10px
            user-select: none

            .sign-in, .online
                height: 34px
                border-radius: 40px
                background: var(--dark-background)
                cursor: pointer
                color: var(--color)

                &:hover
                    color: var(--color-bright)

            .text
                height: 28px
                line-height: 28px
                font-size: 12px
                padding: 3px 8px 3px 15px
                letter-spacing: 1px
                vertical-align: top

            .image
                height: 30px
                width: 30px
                margin: 2px
                border-radius: 40px
                background: var(--background)
                overflow: hidden
                vertical-align: top

                .icon
                    height: 100%
                    width: 100%
                    line-height: 30px
                    text-align: center
                    font-family: 'Material Icons'
                    font-size: 22px
                    color: var(--color-light)

                img
                    height: 100%
                    width: 100%
</style>