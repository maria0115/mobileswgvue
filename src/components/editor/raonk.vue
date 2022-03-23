<template>
  <iframe
    :src="src"
    style="width: 100%; height: 100%; overflow: hidden; border: 0"
    ref="raonk"
  ></iframe>
</template>

<script>
import configjson from "@/config/config.json";

export default {
  props: ["body", "read", "did"],
  created() {
    this.editorData = this.body;
    this.src = this.src + this.did;
  },
  mounted() {
    window.addEventListener("message", this.receiveMsgFromChild);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.receiveMsgFromChild);
  },
  data: function () {
    return {
      editorData: "",
      src: configjson.raonkURL,
    };
  },
  methods: {
    fReadIframeContent() {},
    receiveMsgFromChild(e) {
      if (e.data === "raonkeditor") {
        if (this.read) {
          // this.$refs.raonk.contentWindow.xfe.editor.SetHtmlContents(this.editorData,"xfe");
          this.$refs.raonk.contentWindow.RAONKEDITOR.SetEditorMode(
            "view",
            "xfe"
          );
        }
        this.$refs.raonk.contentWindow.RAONKEDITOR.SetBodyValue(
          this.editorData,
          "xfe"
        );
      }
    },
  },
};
</script>

<style>
</style>