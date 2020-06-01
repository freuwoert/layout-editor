<template>
    <div class="checkbox" @click="toggle" :class="{'active': checked}">
        <div class="checkmark">&#983340;</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                checked: false
            }
        },
        methods: {
            toggle() {
                this.checked = !this.checked
            }
        }
    }
</script>
<style lang="sass" scoped>
    .checkbox
        color: white
        margin: 5px
        width: 20px
        height: 20px
        margin: 5px
        border: 2px solid var(--color-lighter)
        border-radius: 5px
        cursor: pointer
        position: relative
        vertical-align: middle

        .checkmark
            height: 18px
            width: 18px
            line-height: 18px
            text-align: center
            position: absolute
            top: -1px
            left: -1px
            color: inherit
            font-size: 17px
            font-family: 'Material Icons'
            transition: all 80ms
            color: var(--color-bright)
            display: none


        &.active
            border-color: var(--primary)
            color: white
            background: var(--primary)

            .checkmark
                display: block
    
</style>