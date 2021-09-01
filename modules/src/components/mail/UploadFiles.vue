<template>
  <div class="container">
    <label
      >File
      <input
        type="file"
        id="file"
        ref="file"
        v-on:click="handleFileUpload()"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "UploadFiles",
  /*
      Defines the data used by the component
    */
  data() {
    return {
      file: undefined,
    };
  },

  methods: {
    focus() {
      this.$refs.file.click();
    },
    /*
        Submits the file to the server
      */
    submitFile() {
      /*
                Initialize the form data
            */
      let formData = new FormData();

      /*
                Add the form data we need to submit
            */
      formData.append("file", this.file);

      /*
          Make the request to the POST /single-file URL
        */
      axios
        .post("/maillist/write_mail", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },

    /*
        Handles a change on the file upload
      */
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      return this.file;
    },
  },
};
</script>