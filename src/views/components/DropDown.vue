<template>
    <div class="dropdown">
        <div class="text">{{label}}</div>
        <div class="icon">&#61760;</div>
    </div>
</template>
<script>
    export default {
        props: {
            label: {
                type: String
            }
        }
    }
</script>
<style lang="sass" scoped>
    .dropdown
        --h: 30px
        height: var(--h)
        line-height: var(--h)
        background: var(--darker-background)
        border-radius: 5px
        user-select: none

        .icon
            height: var(--h)
            line-height: var(--h)
            width: var(--h)
            text-align: center
            color: var(--color-lighter)
            font-family: 'Material Icons'
            font-size: 20px
            vertical-align: top

        .text
            height: var(--h)
            line-height: var(--h)
            color: var(--color)
            font-size: 13px
            font-weight: 700
            letter-spacing: 0.5px
            vertical-align: top
            padding-left: 10px

</style>