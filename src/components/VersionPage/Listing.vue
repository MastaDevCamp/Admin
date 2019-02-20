<template>
  <div class="container">
    <h2>Version List
      <v-btn flat icon color="indigo" v-on:click="getVersionList">
        <v-icon dark>refresh</v-icon>
      </v-btn>
    </h2>

    <v-data-table :headers="headers" :items="versionList" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.version }}</td>
        <td class="text-xs-left">{{ props.item.full }} <v-btn outline fab small color="indigo" @click="throwFilePath(props.item.full, 'full')">
              <v-icon dark>list</v-icon>
            </v-btn> </td>
        <td class="text-xs-left">{{ props.item.patch }} <v-btn outline fab small="" color="indigo" @click="throwFilePath(props.item.patch, 'patch')">
              <v-icon dark>list</v-icon>
            </v-btn></td>
      </template>
    </v-data-table>
    <br>
    <fileContent ref="fileContent"></fileContent>
  </div>
</template>

<script>
import { fileServer } from "../../api/fileServer";
import fileContent from "./FileContent";

export default {
  data() {
    return {
      headers: [
        {
          text: "version",
          align: "center",
          sortable: false,
          value: "version"
        },
        { text: "full", sortable: false, align: "center", value: "full" },
        { text: "patch", sortable: false, align: "center", value: "patch" }
      ],
      versionList: [],
      filePath: ""
    };
  },
  components: {
    fileContent
  },
  methods: {
    getVersionList() {
      var vm = this;

      fileServer
        .getVersionList()
        .then(response => {
          vm.versionList = response.data.responseData.slice();
        })
        .catch(err => {
          this.responseTxt = err;
        });
    },
    throwFilePath(path, type) {
      this.$refs.fileContent.getVersionContent(path, type);
    }
  },
  mounted() {
    this.getVersionList();
  }
};
</script>

<style>
</style>
