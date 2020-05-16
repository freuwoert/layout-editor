<template>
    <div class="iconpicker">
        <div class="container">
            <div class="iconset-panel">
                <div class="iconset-container">
                    <div class="iconset">
                        <div class="icon">&#985478;</div>
                        <div class="name">Material Icons</div>
                    </div>
                    <div class="iconset">
                        <div class="icon">&#983098;</div>
                        <div class="name">Font Awesome</div>
                    </div>
                    <div class="iconset">
                        <div class="icon">&#984787;</div>
                        <div class="name">Feather</div>
                    </div>
                </div>
            </div>
            <div class="icon-panel">
                <text-field class="search-bar" label="Search" v-model="search"></text-field>
                <div class="icon-container">
                    <div class="icon" v-for="(icon, i) in filteredIcons" :key="i" :title="icon.name" @contextmenu="copyIcon(icon.html)">
                        <span v-html="icon.html"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const win = require('electron').remote.getCurrentWindow()

    import { mapGetters, mapActions } from 'vuex'
    import { clipboard } from 'electron'
    import DropDown from '../components/DropDown.vue'
    import TextField from '../components/TextField.vue'

    export default {
        props: ['value'],
        data() {
            return {
                search: '',
            }
        },
        mounted() {
        },
        computed: {
            ...mapGetters([
                'iconsMDI',
            ]),

            filteredIcons() {
                let ret = []

                for (const icon of this.iconsMDI) {
                    if( icon.name.includes(this.search) )
                    {
                        icon.html = '&#' + parseInt(icon.hex, 16) + ';'
                        ret.push(icon)
                    }
                }

                return ret
            },
        },
        methods: {
            ...mapActions([]),

            copyIcon(value) {
                clipboard.writeText(value)
            },
        },
        components: {
            DropDown,
            TextField,
        }
    }
</script>
<style lang="sass" scoped>
    .iconpicker
        position: fixed
        right: 415px
        top: 100px
        z-index: 1

        .container
            width: 560px
            border-radius: 5px
            background: var(--background)
            filter: drop-shadow(0 6px 10px rgba(0,0,0,0.3))
            z-index: 1
            text-align: left
            display: grid
            grid-template-columns: 250px auto
            grid-template-rows: auto
            grid-template-areas: "iconset_panel icon_panel"

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

            .iconset-panel
                grid-area: iconset_panel
                position: relative

                &:before
                    content: ''
                    position: absolute
                    right: 0
                    top: 20px
                    height: calc(100% - 40px)
                    border-right: 1px solid var(--color-dimm)

                .iconset-container
                    width: calc(100% - 40px)
                    height: 445px
                    overflow: hidden
                    overflow-y: auto
                    margin: 20px

                    .iconset
                        height: 30px
                        width: 100%
                        border-radius: 5px
                        cursor: pointer
                        user-select: none
                        white-space: nowrap

                        .icon
                            width: 30px
                            height: 30px
                            line-height: 30px
                            text-align: center
                            margin-right: 5px
                            color: var(--color-lighter)
                            position: relative
                            font-family: 'Material Icons'
                            font-size: 18px
                            font-weight: normal
                            vertical-align: top

                        .name
                            height: 30px
                            line-height: 30px
                            font-size: 13px
                            letter-spacing: 1px
                            color: var(--color)
                            overflow: hidden
                            text-overflow: ellipsis
                            font-weight: normal
                            vertical-align: top

                        &:hover
                            background: var(--darker-background)

                            .icon
                                color: var(--color-bright)

                            .name
                                color: var(--color-bright)

            .icon-panel
                grid-area: icon_panel
                position: relative

                .search-bar
                    width: calc(100% - 40px)
                    margin: 20px
                    margin-bottom: 0

                .icon-container
                    width: calc(100% - 30px)
                    height: 400px
                    overflow: hidden
                    overflow-y: auto
                    margin: 15px

                    .icon
                        width: calc(100% / 5 - 10px)
                        padding-bottom: calc(100% / 5 - 10px)
                        margin: 5px
                        border-radius: 5px
                        background: var(--darker-background)
                        color: var(--color)
                        vertical-align: top
                        cursor: pointer
                        user-select: none
                        position: relative

                        span
                            font-family: 'Material Icons'
                            font-size: 24px
                            font-weight: normal
                            color: inherit
                            position: absolute
                            top: 50%
                            left: 50%
                            transform: translate(-50%, -50%)

                        &:hover
                            color: var(--primary)
</style>