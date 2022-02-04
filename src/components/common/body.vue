<template>
  <div>
    <!-- <Basic
      v-if="read"
      style="padding:0.93rem;"
      :body="Body_Text"
    /> -->
    <TipTap
      v-if="this.Option().editor === 'tiptap'"
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
export default {
  async created() {
    // var test2 = document.createElement("span"); // body에 추가할 span 태그를 추가
    this.Body_Text = this.body; // innerHTML을 사용하여 text를 html로 파싱 후 자식노드로 추가
    // test2.innerHTML = this.body;
    // var iframes;
    // var here = this;
    // $(test2).ready(function () {
    //   iframes = $(test2).find("iframe");
    //   // console.log(iframes)
    //   iframes.attr('onload',null);
    //   // console.log(test2.innerHTML)
    //   here.Body_Text = test2.innerHTML;
    //   // here.$forceUpdate();
    // });
  },
  props: ["body", "did", "read",],
  components: {
    Namo,
    TipTap,
    Basic,
    Synap,
    Raonk,
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
        return this.$refs.raonk.$refs.raonk.contentWindow.RAONKEDITOR.GetHtmlValue({type:'htmlexwithdoctype'},'xfe');
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