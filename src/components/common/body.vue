<template>
  <!-- <Basic
      v-if="read"
      style="padding:0.93rem;"
      :body="Body_Text"
    /> -->
  <div>
    <!-- {{this.body}} -->
    <OpenField
      v-if="isOpenFiled(this.body) && read"
      :body="Body_Text"
      :read="read"
      ref="openfield"
    />
    <TipTap
      v-else-if="this.Option().editor === 'tiptap'"
      :body="Body_Text"
      :read="read"
      ref="tiptap"
    />
    <!-- <TipTap
      v-else-if="this.Option().editor === 'tiptap'"
      :body="Body_Text"
      :read="read"
      ref="tiptap"
    /> -->
    <textarea
      v-else-if="this.Option().editor === 'textarea'"
      v-model="Body_Text"
      ref="textarea"
    ></textarea>

    <Namo
      v-else-if="this.Option().editor === 'namo'"
      :read="read"
      :did="did"
      :body="Body_Text"
      ref="namo"
    ></Namo>
    <Synap
      v-else-if="this.Option().editor === 'synap'"
      :read="read"
      :did="did"
      :body="Body_Text"
      ref="synap"
    />
    <Raonk
      v-else-if="this.Option().editor === 'raonk'"
      :read="read"
      :did="did"
      :body="Body_Text"
      ref="raonk"
    />
  </div>
</template>

<script>
import Namo from "@/components/editor/namo.vue";
import Raonk from "@/components/editor/raonk.vue";
import TipTap from "@/components/editor/tiptap.vue";
import Basic from "@/components/editor/basic.vue";
import Synap from "@/components/editor/synapb.vue";
import OpenField from "@/components/editor/openfield.vue";
export default {
  async created() {
    this.Body_Text = this.body; // innerHTML을 사용하여 text를 html로 파싱 후 자식노드로 추가
    if (this.bodyurl&&this.body && this.isOpenFiled(this.body)&&!this.read) {
      await this.getUrlBody();
    }
  },
  props: ["body", "did", "read", "bodyurl"],
  computed: {
    // isOpenField() {
    //   return (
    //     this.body.toLowerCase().indexOf("openfield") !== -1 || this.bodyurl
    //   );
    // },
  },
  components: {
    Namo,
    TipTap,
    Basic,
    Synap,
    Raonk,
    OpenField,
  },
  data() {
    return {
      Body_Text: "",
    };
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
      } else if (this.Option().editor === "raonk") {
        return this.$refs.raonk.$refs.raonk.contentWindow.RAONKEDITOR.GetHtmlValue(
          { type: "htmlexwithdoctype" },
          "xfe"
        );
      } else if (this.Option().editor === "synap") {
        var synap = this.$refs.synap;
        return synap.GetBody();
      }
      return "";
    },
  },
};
</script>

<style>
</style>