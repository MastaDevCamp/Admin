<template>
  <div class="container">
    <h2>Version List</h2>

    <button v-on:click="getVersionList">getAllVersion</button>
    <table>
      <thead>
        <tr>
          <td>version</td>
					<td>full</td>
					<td>patch</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="elt in versionList">
					<td>{{elt.version}}</td>
					<td>{{elt.full}}</td>
					<td>{{elt.patch}}</td>
        </tr>
      </tbody>
    </table>
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
  },
  mounted() {
    this.getVersionList();
  }
};
</script>