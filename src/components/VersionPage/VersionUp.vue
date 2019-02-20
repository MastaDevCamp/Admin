<template>
  <div class="container">
    <h2>Upload New Version</h2>
    <form @submit.prevent="onSubmit" name="fileForm" ref="fleForm">
      <div>
        <label for="newVersion"></label>
        <input
          class="form-control"
          type="text"
          name="version"
          v-model="version"
          autofocus
          placeholder="newVersion"
        >
        <label for="file"></label>
        <input
          class="form-control"
          type="file"
          name="sourceFile"
          ref="file"
          v-on:change="handleFileUpload()"
        >
      </div>

      <v-flex xs12>
        <v-card>
          <v-card-actions>
            <v-btn
              color="indigo"
              class= "white--text"
              :class="{'btn-success' : !invalidForm}"
              type="submit"
              :disabled="invalidForm"
            >Upload New Version</v-btn>
            <div class="text-truncate">
              <div v-if="responseTxt != null">
                <p class="result">{{ responseTxt }}</p>
              </div>
              <div v-else>
                <p class="result">등록중
                  <v-icon>fas fa-circle-notch fa-spin</v-icon>
                </p>
              </div>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </form>
  </div>
</template>

<script>
import { fileServer } from "../../api/fileServer";

export default {
  data() {
    return {
      version: "",
      sourceFile: "",
      responseTxt: ""
    };
  },
  computed: {
    invalidForm() {
      return !this.version || !this.sourceFile;
    }
  },
  methods: {
    handleFileUpload() {
      this.sourceFile = this.$refs.file.files;
    },
    onSubmit() {
      this.responseTxt = null;
      console.log(this.version);
      console.log(this.sourceFile[0]);

      let bodyFormData = new FormData();
      bodyFormData.set("version", this.version);
      bodyFormData.append("sourceFile", this.sourceFile[0]);

      fileServer
        .newVersion(bodyFormData)
        .then(response => {
          this.responseTxt = response.data.responseMessage;
          console.log(response.data.responseMessage);
        })
        .catch(err => {
          this.responseTxt = "서버 에러";
        });
    }
  }
};
</script>


<style>

.result {
  margin-bottom: 0px;
  margin-left: 10px;
  font-weight: bold;
  color:gray;
}

</style>
