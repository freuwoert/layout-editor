<template>
    <svg class="circular" viewBox="25 25 50 50" :style="'height: '+size+'px; width: '+size+'px;'">
        <circle class="path" cx="50" cy="50" r="20" fill="none" :stroke="color" :stroke-width="stroke || 5" stroke-miterlimit="10"/>
    </svg>
</template>
<script>
export default {
    props: ['color', 'size', 'stroke']
}
</script>
<style lang="sass" scoped>
    .circular
        height: 20px
        width: 20px
        animation: rotate 2s linear infinite
        transform-origin: center center
        margin: auto
        user-select: none

        .path
            stroke-dasharray: 1, 200
            stroke-dashoffset: 0
            animation: dash 1.5s ease-in-out infinite

        @keyframes rotate
            100%
                transform: rotate(360deg)

        @keyframes dash
            0%
                stroke-dasharray: 1, 200
                stroke-dashoffset: 0
            50%
                stroke-dasharray: 89, 200
                stroke-dashoffset: -35px
            100%
                stroke-dasharray: 89, 200
                stroke-dashoffset: -124px
</style>