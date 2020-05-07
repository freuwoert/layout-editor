<template>
    <div class="viewport-controls">
        <iframe ref="coupledViewport" class="viewport" :style="'width: '+viewport.x+'px; height:'+viewport.y+'px;'"></iframe>
        <div class="horizontal-handle" @mousedown="mouseDown($event, 'HORIZONTAL')">
            <div class="icon">&#61917;</div>
        </div>
        <div class="vertical-handle" @mousedown="mouseDown($event, 'VERTICAL')">
            <div class="icon">&#61916;</div>
        </div>
        <div class="diagonal-handle" @mousedown="mouseDown($event, 'BOTH')">
            <div class="icon">&#62557;</div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'Viewport',
        props: ['x', 'y', 'content'],
        data: () => {
            return {
                grabbed: false,
                direction: 'BOTH',
                startPos: {
                    x: 0,
                    y: 0,
                },
                startSize: {
                    x: 0,
                    y: 0,
                },
                x_: 0,
                y_: 0
            }
        },
        computed: {
            ...mapGetters([
                'viewport',
            ]),
        },
        watch: {
            'content': function() {
                this.setContent(this.content)
            },
            'viewport.x': function() {
                this.x_ = this.viewport.x
            },
            'viewport.y': function() {
                this.y_ = this.viewport.y
            },
        },
        mounted() {
            const vm = this

            this.x_ = this.viewport.x
            this.y_ = this.viewport.y

            window.addEventListener('mousemove', function(event) {
                vm.mouseMove(event)
            }, false)

            window.addEventListener('mouseup', function(event) {
                vm.mouseUp(event)
            }, false)
        },
        methods: {

            ...mapActions([
                'setViewportSize',
            ]),

            mouseDown: function(e, direction = 'BOTH'){
                this.grabbed = true
                this.direction = direction
                this.startPos.x = e.x
                this.startPos.y = e.y
                this.startSize.x = parseInt(this.x_)
                this.startSize.y = parseInt(this.y_)
                this.mouseMove(e)
            },

            mouseMove: function(e){

                if( this.grabbed )
                {
                    if( this.direction == 'HORIZONTAL' || this.direction == 'BOTH' )
                    {
                        this.x_ = parseInt(this.limit(this.startSize.x + (e.x - this.startPos.x) * 2, 40, 20000))
                    }
    
                    if( this.direction == 'VERTICAL' || this.direction == 'BOTH' )
                    {
                        this.y_ = parseInt(this.limit(this.startSize.y + (e.y - this.startPos.y), 40, 20000))
                    }
                    this.setViewportSize({x: this.x_, y: this.y_})
                }
            },

            mouseUp: function(e){
                this.grabbed = false
            },

            setContent: function(viewportstring){
                this.$refs.coupledViewport.contentWindow.document.open()
                this.$refs.coupledViewport.contentWindow.document.write(viewportstring)
                this.$refs.coupledViewport.contentWindow.document.close()
            },

            limit: function(value, min, max){
                if(value < min) value = min
                if(value > max) value = max
                return parseFloat(value)
            }
        }
    }
</script>

<style lang="sass" scoped>
    .viewport-controls
        display: inline-grid
        overflow: hidden
        border-radius: 2px
        background: var(--background)
        grid-template-columns: auto 20px
        grid-template-rows: auto 20px
        grid-template-areas: "viewport horizontal-handle" "vertical-handle diagonal-handle"
        filter: drop-shadow(0 6px 10px rgba(0,0,0,0.3))

        .viewport
            grid-area: viewport
            background: white
            overflow: hidden
            border-radius: 2px
            min-width: 40px
            min-height: 40px
            border: none
            pointer-events: none

        .horizontal-handle, .vertical-handle, .diagonal-handle
            position: relative
            background: var(--background)
            user-select: none
            border-radius: 2px

            &:hover
                background: var(--light-background)

        .horizontal-handle
            grid-area: horizontal-handle
            cursor: e-resize

        .vertical-handle
            grid-area: vertical-handle
            cursor: s-resize

        .diagonal-handle
            grid-area: diagonal-handle
            cursor: se-resize

        .icon
            position: absolute
            top: calc(50% - 10px)
            left: calc(50% - 10px)
            width: 20px
            height: 20px
            line-height: 20px
            text-align: center
            color: rgba(255,255,255, 0.7)
            font-size: 20px
            font-family: 'Material Icons'
            vertical-align: top
</style>