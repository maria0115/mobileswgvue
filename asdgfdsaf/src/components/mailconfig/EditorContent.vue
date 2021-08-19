<template>
</template>

<script>
export default {
  props: {
    editor: {
      default: null,
      type: Object
    },
    value: {
      default: "",
      type: String
    }
  },

  watch: {
    editor: {
      immediate: true,
      handler(editor) {
        if (!editor || !editor.element) return;
        console.log(this.value,"this.value")

        this.editor.setContent(this.value);
        this.editor.on("update", ({ getHTML }) => {
          this.$emit("input", getHTML());
        });

        this.$nextTick(() => {
          this.$el.appendChild(editor.element.firstChild);
          editor.setParentComponent(this);
        });
      }
    },
    value: {
      handler(value) {
        console.log(value)
        this.editor.setContent(value);
      }
    }
  },

//   render(createElement) {
//     return createElement("textarea");
//   },

  beforeDestroy() {
    this.editor.element = this.$el;
  }
};
</script>

<style>

</style>
