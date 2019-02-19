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
      <button
        class="btn"
        :class="{'btn-success' : !invalidForm}"
        type="submit"
        :disabled="invalidForm"
      >Upload New Version</button>
      <p>{{ responseTxt }}</p>
    </form>
  </div>
</template>

<script>
import { fileServer } from "../../api/fileServer";

export default {
    props: {
      versionPath: {
        type: String,
        default: ''
      }
    }
  };

</script>

<style>

</style>
