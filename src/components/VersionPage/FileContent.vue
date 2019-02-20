<template>
<v-card class="contents">
        <v-list subheader>
          <v-subheader>{{ versionTitle }}</v-subheader>
          <v-list-tile class="contents-text"
             v-for="content in versionContents" v-bind:key="content.id"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="content"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
</v-card>
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
.v-subheader{
  font-size: 30px;
}
.contents-text{
  font-size: 15px;
}
</style>
