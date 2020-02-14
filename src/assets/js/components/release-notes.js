Vue.component('release-notes', {
    props: ['show', 'info'],
    template: `
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
    `
})