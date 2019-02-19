<template>
  <div class="container">
    
  </div>
</template>

<script>
import { fileServer } from "../../api/fileServer";

export default {
  name: "TodoPage",
  data() {
    return {
      versionList: []
    };
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
    }
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
