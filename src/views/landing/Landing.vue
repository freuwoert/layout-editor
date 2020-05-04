<template>
    <div class="view" id="home-view">
        <div class="header">
            <div class="view-selector" @click="setTabView({ ID: activeTabID, view: 'VIEW:PROJECT_MANAGER' })">
                <div class="image-container i1">
                    <div class="image image-project-manager"></div>
                </div>
                <div class="label">Combinator</div>
            </div>
            <div class="view-selector" @click="setTabView({ ID: activeTabID, view: 'VIEW:LAYOUT_CREATOR' })">
                <div class="image-container i2">
                    <div class="image image-layout-creator"></div>
                </div>
                <div class="label">Creator</div>
            </div>
            <div class="view-selector" @click="setTabView({ ID: activeTabID, view: 'VIEW:ASSET_STORE' })">
                <div class="image-container i3">
                    <div class="image image-asset-store"></div>
                </div>
                <div class="label">Marketplace</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Home',
    computed: {
        ...mapGetters([
            'activeTabID',
        ]),
    },
    methods: {
        ...mapActions([
            'setTabView',
        ]),
    },
    components: {
    }
}
</script>
<style lang="sass" scoped>
    #home-view
        display: block
        background: var(--dark-background)

        .header
            height: 300px
            width: 100%
            position: absolute
            top: 0
            left: 0
            padding: 10px
            display: flex
            background: var(--background)

            .view-selector
                height: calc(100% - 20px)
                margin: 10px
                flex: 1
                border-radius: 10px
                overflow: hidden
                position: relative
                user-select: none
                cursor: pointer

                &:hover

                .label
                    height: 40px
                    width: calc(100% - 0px)
                    line-height: 40px
                    color: white
                    font-size: 16px
                    text-transform: uppercase
                    letter-spacing: 1px
                    font-weight: 900
                    border-radius: 10px
                    transition: all 80ms ease-in-out
                    position: absolute
                    bottom: 0px
                    left: 0px
                    z-index: 10

                .image-container
                    height: calc(100% - 0px)
                    width: calc(100% - 0px)
                    position: absolute
                    top: 0px
                    left: 0px
                    overflow: hidden

                    &.i1
                        background-color: #ffa502
                    &.i2
                        background-color: #ff6348
                    &.i3
                        background-color: #ff4757

                    .image
                        width: 100%
                        height: 100%
                        background-size: cover
                        background-position: center
                        background-repeat: no-repeat
                        transform-origin: center center
                        transition: all 80ms ease-in-out

                        &.image-layout-editor
                            background-image: url('~@/assets/images/interface/home_view/layout_editor.svg')

                        &.image-layout-creator
                            background-image: url('~@/assets/images/interface/home_view/layout_creator.svg')

                        &.image-project-manager
                            background-image: url('~@/assets/images/interface/home_view/project_manager.svg')

                        &.image-asset-store
                            background-image: url('~@/assets/images/interface/home_view/asset_store.svg')
</style>