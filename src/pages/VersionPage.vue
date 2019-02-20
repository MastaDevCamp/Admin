<template>
    <div class="version">
        <versionUp/>
        <Listing/>
    </div>
</template>

<script>
import VueRouter from 'vue-router';
import Listing from '../components/VersionPage/Listing.vue'
import VersionUp from '../components/VersionPage/VersionUp'
import FileContent from '../components/VersionPage/FileContent'

export default {
    components: {
        Listing,
        VersionUp,
        FileContent
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
