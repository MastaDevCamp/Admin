<template>
  <div class="container">
    <h2>Version List<button id="versionBtn" class="btn btn-success" v-on:click="getVersionList">getAllVersion</button></h2>
    <table class="responsive-table" >
      <thead>
        <tr>
          <td>version</td>
          <td>full</td>
          <td>patch</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="elt in versionList" v-bind:key="elt"> 
          <td>{{elt.version}}</td>
          <td>{{elt.full}} <button @click="throwFilePath(elt.full, 'full')">Show Files</button> </td>
          <td>{{elt.patch}} <button @click="throwFilePath(elt.patch, 'patch')">Show Files</button> </td>
        </tr>
      </tbody>
    </table>
    <fileContent ref="fileContent"></fileContent>
  </div>
</template>

<script>
import { fileServer } from "../../api/fileServer";
import fileContent from "./FileContent";

export default {
  data() {
    return {
      versionList: [],
      filePath: ""
    };
  },
  components : {
      fileContent
  },
  methods: {
    getVersionList() {
      var vm = this;
      fileServer
        .getVersionList()
        .then(response => {
          console.log(response.data.responseData);
          vm.versionList = response.data.responseData.slice();
          console.log(this.versionList);
        })
        .catch(err => {
          this.responseTxt = "서버 에러";
        });
    },
    throwFilePath(path){
      this.$refs.getVersionContent(path)
    }
  },
  mounted() {
    this.getVersionList();
  }
};
</script>

<style>
table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table thead{
    background-color: #4CAF50;
    color: white;
}

table td, table thead {
  border: 1px solid #ddd;
  padding: 8px;
}

#versionBtn {
    margin-bottom: 20px;
    margin-left: 20px;
}
</style>
