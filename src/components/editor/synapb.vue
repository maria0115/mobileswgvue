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
      if(this.read){
        this.editor.setMode('preview');
        this.editor.execCommand('hideDimLayer');
      }
    },
    GetBody() {
      return this.editor.getPublishingHtml();
    },
    addScript() {
      let scripts = [
        "../../mobile/synap/synapeditor.config.js",
        "../../mobile/synap/synapeditor.min.js",
        "../../mobile/synap/plugins/shapeEditor/shapeEditor.min.js",
        "../../mobile/synap/plugins/personalDataProtection/personalDataProtection.min.js",
        "../../mobile/synap/plugins/characterPicker/characterPicker.min.js",
        "../../mobile/synap/plugins/webAccessibilityChecker/webAccessibilityChecker.min.js",
        "../../mobile/synap/plugins/tuiImageEditor/tuiImageEditor.min.js",
        "../../mobile/synap/plugins/horizontalLineExtension/horizontalLineExtension.min.js",
        "../../mobile/synap/plugins/quoteExtension/quoteExtension.min.js",
        "../../mobile/synap/externals/formulaParser/formula-parser.min.js",
        // "../../mobile/synap/externals/SEDocModelParser/SEDocModelParser.min.js",
        "../../mobile/synap/externals/SEShapeManager/SEShapeManager.min.js",
        // "../../mobile/synap/externals/codeMirror/codemirror.min.js",
        // "../../mobile/synap/externals/codeMirror/xml.min.js",
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
@import "../../mobile/synap/externals/codeMirror/codemirror.min.css";
@import "../../mobile/synap/plugins/quoteExtension/quoteExtension.min.css";
@import "../../mobile/synap/plugins/webAccessibilityChecker/webAccessibilityChecker.min.css";
@import "../../mobile/synap/plugins/tuiImageEditor/tuiImageEditor.min.css";
@import "../../mobile/synap/plugins/characterPicker/characterPicker.min.css";
@import "../../mobile/synap/plugins/personalDataProtection/personalDataProtection.min.css";
@import "../../mobile/synap/plugins/shapeEditor/shapeEditor.min.css";
@import "../../mobile/synap/synapeditor.min.css";
</style>