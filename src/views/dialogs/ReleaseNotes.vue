<template>
    <div class="release-note-bg" :class="{'active' : show}">
        <div class="release-note-holder">
            <div class="release-image">
                <span class="title">
                    {{info.versionName}}
                    <span class="version">{{info.version}}</span>
                </span>
            </div>
            <span class="headline">Welcome to VuDesigner!</span>
            <div class="release-note-container">
                • Add and remove elements<br>
            </div>
            <div class="close-release-note" @click="$emit('close')">Let's go!</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['show', 'info'],
    }
</script>
<style lang="sass" scoped>
    .release-note-bg
        width: 100%
        height: 100%
        position: absolute
        left: 0
        top: 0
        z-index: 10000
        background: rgba(0,0,0,0)
        pointer-events: none
        transition: background 400ms ease-in-out
        transition: all 300ms ease-in-out

        &.active
            pointer-events: all
            background: rgba(0,0,0,0.8)

            .release-note-holder
                opacity: 1 !important
                transform: translateY(0) !important

        .release-note-holder
            width: calc(100% - 160px)
            max-width: 700px
            height: calc(100% - 180px)
            margin: 90px auto
            display: block
            position: initial
            border-radius: 20px
            box-shadow: none
            font-size: 0
            background: white
            transform: translateY(50px)
            opacity: 0
            box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.3)
            transition: all 300ms ease-in-out

            .release-image
                height: 270px
                width: calc(100% + 140px)
                margin: 40px -70px 70px
                border-radius: 15px
                background-image: url('~@/assets/images/release-bg/rn_init_update.png')
                background-repeat: no-repeat
                background-position: center
                background-size: cover
                filter: drop-shadow(0px 10px 12px rgba(0,0,0,0.4))
                position: relative

                .title
                    color: white
                    font-weight: 600
                    letter-spacing: 3px
                    line-height: 80px
                    position: absolute
                    top: calc(50% - 40px)
                    left: 0
                    font-size: 50px
                    width: 100%
                    text-align: center
                    background: rgba(0,0,0,0.4)

                    .version
                        font-size: 30px
                        height: 50px
                        vertical-align: top
                        font-weight: 200
                        letter-spacing: 0
                        transform: translate(-10px, -40%)
            
            .headline
                color: black
                font-weight: 700
                line-height: 40px
                font-size: 25px
                width: 100%
                text-align: center

            .release-note-container
                width: calc(100% - 40px)
                height: calc(100% - 60px - 480px)
                margin: 20px 40px
                text-align: left
                color: #333
                font-size: 15px
                line-height: 27px
                overflow-y: auto

            .close-release-note
                height: 40px
                line-height: 40px
                border-radius: 5px
                text-align: center
                color: white
                background: black
                width: 200px
                font-size: 16px
                display: block
                margin: 20px auto
                cursor: pointer
                user-select: none
                transition: all 100ms

                &:hover
                    filter: drop-shadow(0px 3px 4px rgba(0,0,0,0.3))
</style>