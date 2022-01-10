<template>
  <editor-content ref="tiptap" :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from "tiptap";
export default {
  props: ["body","read"],
  components: {
    EditorContent,
  },
  data: function () {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      content: this.body,
      editable:!this.read
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style>
.ProseMirror{border: none !important;}
</style>