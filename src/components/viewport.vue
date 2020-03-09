<template>
    <div class="viewport-container">
        <div class="event-plane" v-show="grabbed" @mousemove="mouseMove($event)" @mouseup="mouseUp($event)">
            <div class="indicator" :style="'left: '+startPos.x+'px; top:'+startPos.y+'px;'"></div>
        </div>
        <div class="viewport-controls">
            <iframe ref="coupledViewport" class="viewport" :style="'width: '+x+'px; height:'+y+'px;'"></iframe>
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
    </div>
</template>

<script>
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
            }
        }
    },

    watch: {
        'content': function() {
            this.setContent(this.content)
        }
    },

    methods: {
        mouseDown: function(e, direction = 'BOTH'){
            this.grabbed = true
            this.direction = direction
            this.startPos.x = e.x
            this.startPos.y = e.y
            this.startSize.x = parseInt(this.x)
            this.startSize.y = parseInt(this.y)
            this.mouseMove(e)
        },
        mouseUp: function(e){
            this.grabbed = false
        },
        mouseMove: function(e){

            if( this.direction == 'HORIZONTAL' || this.direction == 'BOTH' )
            {
                this.x = parseInt(this.limit(this.startSize.x + (e.x - this.startPos.x) * 2, 40, 20000))
            }

            if( this.direction == 'VERTICAL' || this.direction == 'BOTH' )
            {
                this.y = parseInt(this.limit(this.startSize.y + (e.y - this.startPos.y), 40, 20000))
            }

            this.$emit('update:x', this.x)
            this.$emit('update:y', this.y)
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

<style scoped>

</style>