<template>
    <div class="status-panel">
        <div class="savepath" :title="savePath" @click="chooseSavePath()">
            <div class="icon">&#984944;</div>
            <div class="label" v-show="savePath">{{savePathName}}</div>
            <div class="label" v-show="!savePath">Set file location</div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import path from 'path'

    export default {
        computed: {
            ...mapGetters([
                'savePath',
            ]),
    
            savePathName() {
                return this.savePath ? path.basename(this.savePath) : false
            }
        },
        methods: {
            ...mapActions([
                'chooseSavePath',
            ]),
        },
    }
</script>
<style lang="sass" scoped>
    .status-panel
        grid-area: status_panel
        background: var(--background)
        text-align: left

        .savepath
            height: 30px
            line-height: 30px
            color: var(--color)
            user-select: none
            cursor: pointer
            border-radius: 4px
            padding-right: 5px

            &:hover
                color: var(--color-bright)
                background: var(--color-dimm)

            .icon
                height: 28px
                line-height: 28px
                width: 28px
                text-align: center
                font-size: 16px
                font-family: 'Material Icons'
                vertical-align: top

            .label
                font-size: 10px
                vertical-align: top
                line-height: 28px
                padding-left: 2px
                padding-right: 5px
                letter-spacing: 0.5px
</style>