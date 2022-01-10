<template>
  <div>
    <div
      v-if="(this.Option().editor === 'textarea' && read)"
      v-html="Body_Text"
    ></div>
    <textarea
      v-else-if="this.Option().editor === 'textarea'"
      v-model="Body_Text"
      ref="textarea"
    ></textarea>
    <TipTap
      v-else-if="this.Option().editor === 'tiptap'"
      :body="Body_Text"
      :read="read"
      ref="tiptap"
    />
    <Namo
      v-else-if="this.Option().editor === 'namo'"
      :read="read"
      :did="did"
      :body="Body_Text"
      ref="namo"
    ></Namo>
  </div>
</template>

<script>
import Namo from "@/components/editor/namo.vue";
import TipTap from "@/components/editor/tiptap.vue";

export default {
  created() {
    this.Body_Text = this.body;
  },
  props: ["body", "did", "read"],
  components: {
    Namo,
    TipTap,
  },
  methods: {
    getBody() {
      if (this.Config().env == "dev") {
        return "본문";
      } else if (this.Option().editor === "textarea") {
        return this.Body_Text;
      } else if (this.Option().editor === "tiptap") {
        return this.$refs.tiptap.editor.getHTML();
      } else if (this.Option().editor === "namo") {
        return this.$refs.namo.$refs.namo.contentWindow.crosseditor.GetBodyValue();
      }
      return "";
    },
  },
};
</script>

<style>
</style>