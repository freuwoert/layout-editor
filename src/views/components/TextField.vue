<template>
    <div class="input">
        <div class="label" @dragstart.prevent v-if="label">{{label}}</div>
        
        <input @click="selectAll()" @focus="focused = true" @blur="focused = false" :placeholder="label" ref="input" type="text" class="text-input" v-model="value_">
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: String
            },
            label: {
                type: String
            },
        },
        data() {
            return {
                value_: '',
                focused: false,
            }
        },
        watch: {
            value() {
                this.value_ = this.value
            },
            value_() {
                if( this.focused ){
                    this.$emit('input', this.value_)
                }
            }
        },
        methods: {
            selectAll() {
                this.$refs.input.select()
            },
        },
    }
</script>
<style lang="sass" scoped>
    .input
        --h: 30px
        --br: 5px
        height: var(--h)
        width: 130px
        background: rgba(0,0,0,0.3)
        border-radius: var(--br)
        position: relative
        text-align: left
        vertical-align: top
        
        .text-input
            width: 100%
            height: var(--h)
            line-height: var(--h)
            background: transparent
            border-radius: var(--br)
            border: none
            color: white
            font-size: 13px
            letter-spacing: 1px
            font-family: 'Muli'
            vertical-align: top
            text-align: inherit
            padding-left: 10px
            padding-right: 10px
</style>