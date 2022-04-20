<template>
  <div id="synapEditor" ref="synap"  style="height: 100%;"></div>
</template>
<script>
  export default {
    created() {
      this.synapEditorConfig = this.Config().synapEditorConfig;

    },
    mounted() {
      this.initEditor();
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
        var conf = JSON.parse(JSON.stringify(this.synapEditorConfig));
        if (this.read) {
          conf['editor.mobile.toolbar'] = [];
          conf['editor.toolbar'] = [];
        }

        if (this.isMobile()) {
          conf['editor.toolbar'] = [];
        } else {
          conf['editor.mobile.toolbar'] = [];
        }
        console.log(this.body)
        this.editor = new SynapEditor(
          "synapEditor",
          conf,
          this.body
        );
        console.log("editor1")

        if (this.read) {
          this.editor.setMode('preview');
          this.editor.execCommand('hideDimLayer');
          this.editor.execCommand('hideAllPopup');
        }
      },
      GetBody() {
        //return this.editor.getPublishingHtml();
        return this.editor.getPublishingHtml({'contantPadding':'10px','wrap':true});
      },
    },
  };
</script>
<style scoped>
@import "../../mobile/synap/externals/codeMirror/codemirror.min.css";
  @import "../../mobile/synap/plugins/quoteExtension/quoteExtension.min.css";
  @import "../../mobile/synap/plugins/webAccessibilityChecker/webAccessibilityChecker.min.css";
  @import "../../mobile/synap/plugins/tuiImageEditor/tuiImageEditor.min.css";
  @import "../../mobile/synap/plugins/characterPicker/characterPicker.min.css";
  @import "../../mobile/synap/plugins/personalDataProtection/personalDataProtection.min.css";
  @import "../../mobile/synap/plugins/shapeEditor/shapeEditor.min.css";
  @import "../../mobile/synap/synapeditor.min.css";
</style>