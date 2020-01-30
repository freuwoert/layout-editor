Vue.component('viewport', {
    props: ['x', 'y'],
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
    },
    methods: {
        mouseDown: function(e, direction = 'BOTH'){
            this.grabbed = true
            this.direction = direction
            this.startPos.x = e.x
            this.startPos.y = e.y
            this.startSize.x = JSON.parse(JSON.stringify(this.x))
            this.startSize.y = JSON.parse(JSON.stringify(this.y))
            this.mouseMove(e)
        },
        mouseUp: function(e){
            this.grabbed = false
        },
        mouseMove: function(e){

            if( this.direction == 'HORIZONTAL' || this.direction == 'BOTH' )
            {
                this.x = this.limit(this.startSize.x + (e.x - this.startPos.x) * 2, 40, 20000)
            }

            if( this.direction == 'VERTICAL' || this.direction == 'BOTH' )
            {
                this.y = this.limit(this.startSize.y + (e.y - this.startPos.y), 40, 20000)
            }

            this.$emit('update:x', this.x)
            this.$emit('update:y', this.y)
        },
        limit: function(value, min, max){
            if(value < min) value = min
            if(value > max) value = max
            return value
        }
    },
    template: `
        <div class="viewport-container">
            <div class="event-plane" v-show="grabbed" @mousemove="mouseMove(event)" @mouseup="mouseUp(event)">
                <div class="indicator" :style="'left: '+startPos.x+'px; top:'+startPos.y+'px;'"></div>
            </div>
            <div class="viewport-controls">
                <iframe ref="coupledViewport" class="viewport" :style="'width: '+x+'px; height:'+y+'px;'"></iframe>
                <div class="horizontal-handle" @mousedown="mouseDown(event, 'HORIZONTAL')">
                    <div class="icon">&#61917;</div>
                </div>
                <div class="vertical-handle" @mousedown="mouseDown(event, 'VERTICAL')">
                    <div class="icon">&#61916;</div>
                </div>
                <div class="diagonal-handle" @mousedown="mouseDown(event, 'BOTH')">
                    <div class="icon">&#62557;</div>
                </div>
            </div>
        </div>
    `
})