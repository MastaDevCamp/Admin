<template>
  <form @submit.prevent="onSubmit" name="fileForm" ref="fleForm">
        <div>
            <label for="newVersion"></label>
            <input class="form-control" type="text" name="version"  v-model="version" autofocus placeholder="newVersion"/>
            <label for="file"></label>
            <input class="form-control" type="file" name ="sourceFile"  ref="file" v-on:change="handleFileUpload()"/>
        </div>
        <button class="btn" :class="{'btn-success' : !invalidForm}" type="submit" :disabled="invalidForm">Upload New Version</button>
        <p>{{ responseTxt }}</p>
    </form>
</template>

<script>

import {fileServer} from '../../api/fileServer';

export default {
    data(){
        return{
            version: '',
            sourceFile: '',
            responseTxt: '',
        }
        
    },
    computed : {
        invalidForm() {
            return !this.version
        } 
    },
    methods : {
        handleFileUpload(){
            this.sourceFile = this.$refs.file.files;

        },
        onSubmit() {
            console.log(this.version)
            console.log(this.sourceFile[0])

            let bodyFormData = new FormData();   
            bodyFormData.set('version', this.version);   
            bodyFormData.append('sourceFile', this.sourceFile[0]); 

            fileServer.newVersion(bodyFormData)
            .then(response => {
                this.responseTxt = response.data.responseMessage
                console.log(response.data.responseMessage);
            })
            .catch(err => {
                this.responseTxt = "서버 에러";
            })
        }
    }
}
</script>