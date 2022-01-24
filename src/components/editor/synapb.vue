<template>
  <div id="synapEditor" style="height: 100%"></div>
</template>
<script>
</script>
<script>
export default {
  created() {
    this.addScript();
  },
  mounted() {
    setTimeout(() => {
      this.initEditor();
    },500);
  },
  props: ["body", "read", "did"],
  computed: {
    src() {
      return `${this.synap.synapHost}${this.synap.synapBody}`;
    },
  },
  data() {
    return {
      synap: this.Config().synap,
      getBody: "",
      editor: null,
    };
  },
  methods: {
    initEditor() {
      this.editor = new SynapEditor(
        "synapEditor",
        synapEditorConfig,
        this.body
      );
    },
    GetBody() {
      return this.editor.getPublishingHtml();
    },
    addScript() {
      let scripts = [
        "../../assets/synap/synapeditor.config.js",
        "../../assets/synap/synapeditor.min.js",
        "../../assets/synap/plugins/shapeEditor/shapeEditor.min.js",
        "../../assets/synap/plugins/personalDataProtection/personalDataProtection.min.js",
        "../../assets/synap/plugins/characterPicker/characterPicker.min.js",
        "../../assets/synap/plugins/webAccessibilityChecker/webAccessibilityChecker.min.js",
        "../../assets/synap/plugins/tuiImageEditor/tuiImageEditor.min.js",
        "../../assets/synap/plugins/horizontalLineExtension/horizontalLineExtension.min.js",
        "../../assets/synap/plugins/quoteExtension/quoteExtension.min.js",
        "../../assets/synap/externals/formulaParser/formula-parser.min.js",
        // "../../assets/synap/externals/SEDocModelParser/SEDocModelParser.min.js",
        "../../assets/synap/externals/SEShapeManager/SEShapeManager.min.js",
        // "../../assets/synap/externals/codeMirror/codemirror.min.js",
        // "../../assets/synap/externals/codeMirror/xml.min.js",
      ];
      for (let i = 0, len = scripts.length; i < len; i++) {
        let script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", scripts[i]);
        script.async = true;
        script.defer = true;
        document.getElementsByTagName("body")[0].appendChild(script);
      }
    },
  },
};
</script>
<style>
@import "../../assets/synap/externals/codeMirror/codemirror.min.css";
@import "../../assets/synap/plugins/quoteExtension/quoteExtension.min.css";
@import "../../assets/synap/plugins/webAccessibilityChecker/webAccessibilityChecker.min.css";
@import "../../assets/synap/plugins/tuiImageEditor/tuiImageEditor.min.css";
@import "../../assets/synap/plugins/characterPicker/characterPicker.min.css";
@import "../../assets/synap/plugins/personalDataProtection/personalDataProtection.min.css";
@import "../../assets/synap/plugins/shapeEditor/shapeEditor.min.css";
@import "../../assets/synap/synapeditor.min.css";
</style>