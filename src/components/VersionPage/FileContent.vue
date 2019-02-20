<template>
  <div class="container">
    <ul id="tags">
      <li v-repeat="VersionContent">
        {{$value}}
      </li>
    </ul>
  </div>
</template>

<script>
import { fileServer } from "../../api/fileServer";

export default {
  data() {
    return {
      VersionContent: []
    };
  },
  methods: {
    getVersionContent(path, type){
      if(type == 'full'){
        fileServer.getFullVersionContent(path)
        .then(response => {
          console.log(response.data.responseData);
          this.VersionContent = response.data.responseData.slice();
          console.log(this.VersionContent);
        })
        .catch(err => {
          this.responseTxt = "서버 에러";
        });
      }else{
        fileServer.getPatchVersionContent(path)
        .then(response => {
          console.log(response.data.responseData);
          this.VersionContent = response.data.responseData.slice();
          console.log(this.VersionContent);
        })
        .catch(err => {
          this.responseTxt = "서버 에러";
        });
      }   
    }
  }
};
</script>

<style>
</style>
