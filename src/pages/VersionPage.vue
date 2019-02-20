<template>
    <div class="version">
        <h2>New Version Input</h2>
        <versionUp/>
        <Listing/>
        
    </div>
</template>

<script>
import VueRouter from 'vue-router';
import Listing from '../components/VersionPage/Listing.vue'
import VersionUp from '../components/VersionPage/VersionUp'

export default {
    components: {
        Listing,
        VersionUp
    },
    data() {
        return {
            rPath : '',
        }
    },
    created() {
        this.rPath = this.$route.query.rPath || '/home'
    },

    
}

</script>

<style>
</style>
