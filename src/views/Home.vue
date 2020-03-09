<template>
    <div class="view" id="home-view">
        <div class="header">
            <div class="view-selector" @click="setViewOfTab({ ID: activeTab, view: 'VIEW:PROJECT_MANAGER' })">
                <div class="image-container">
                    <div class="image image-project-manager"></div>
                </div>
                <div class="label">Project Manager (1)</div>
            </div>
            <div class="view-selector" @click="setViewOfTab({ ID: activeTab, view: 'VIEW:LAYOUT_CREATOR' })">
                <div class="image-container">
                    <div class="image image-layout-creator"></div>
                </div>
                <div class="label">Layout Creator (2)</div>
            </div>
            <div class="view-selector" @click="setViewOfTab({ ID: activeTab, view: 'VIEW:ASSET_STORE' })">
                <div class="image-container">
                    <div class="image image-asset-store"></div>
                </div>
                <div class="label">Open Market (3)</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Home',
    computed: {
        ...mapGetters([
            'activeTab',
        ]),
    },
    methods: {
        ...mapActions([
            'setViewOfTab',
        ]),
    },
    components: {
    }
}
</script>
