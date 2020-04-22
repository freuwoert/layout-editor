<template>
    <div class="indication-container">
        <div class="focus-indicator" :class="{'active' : ACTIVE}"></div>
    </div>
</template>
<script>
    export default {
        props: ['when', 'equals'],
        computed: {
            ACTIVE: function() {
                let arr = this.equals.split('|')
                return arr.includes(this.when)
            }
        },
    }
</script>
