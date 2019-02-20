<template>
  <div>
    <h3>{{ versionTitle }}</h3>
    <ul id="tags">
      <li v-for="content in versionContents" v-bind:key="content.id">{{ content }}</li>
    </ul>
  </div>
</template>

<script>
import { fileServer } from "../../api/fileServer";

export default {
  data() {
    return {
      versionContents: null,
      versionTitle: null
    };
  },
  methods: {
    getVersionContent(path, type) {
      var vm = this;
      if (type == "full") {
        fileServer
          .getFullVersionContent(path)
          .then(response => {
            vm.versionTitle = path;
            vm.versionContents = response.data.responseData.slice();
            console.log(this.versionContents);
          })
          .catch(err => {
            this.responseTxt = err;
          });
      } else {
        fileServer
          .getPatchVersionContent(path)
          .then(response => {
            vm.versionTitle = path;
            vm.versionContents = response.data.responseData.slice();
            console.log(this.versionContents);
          })
          .catch(err => {
            this.responseTxt = err;
          });
      }
    }
  }
};
</script>

<style>
</style>
