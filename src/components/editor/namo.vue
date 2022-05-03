<template>
  <iframe
    :src="src"
    style="width: 100%; height: 100%; overflow: hidden; border: 0"
    ref="namo"
  ></iframe>
</template>

<script>
import configjson from "@/config/config.json";

export default {
  props: ["body", "read", "did"],
  created() {
    this.editorData = this.body;
    this.src = this.src + this.did;

    // var test2 = document.createElement("span"); // body에 추가할 span 태그를 추가
    // test2.innerHTML = this.body; // innerHTML을 사용하여 text를 html로 파싱 후 자식노드로 추가
    // var iframes;
    // var here = this;
    // $(test2).ready(function () {
    //   iframes = $(test2).find("iframe");
    //   iframes.attr('onload',null);
    //   here.editorData = test2.innerHTML;
    //   this.src = this.src + this.did;
    // });
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
      src: configjson.namoURL,
    };
  },
  methods: {
    fReadIframeContent() {},
    async receiveMsgFromChild(e) {
      if (e.data === "NamoCrossEditor") {
        $("input").each(function () {
          const mobileRegex = [/iPhone/i, /iPad/i, /iPod/i];

          var isI = mobileRegex.some((mobile) =>
            window.navigator.userAgent.match(mobile)
          );

          $("body").on("focus", "input", function () {
            if (isI) {
              $(".btm_btn").css("position", "absolute");
              $(".cal_w_header").css("position", "absolute");
            }
          });

          $("body").on("blur", "input", function () {
            if (isI) {
              $(".btm_btn").css("position", "fixed");
              $(".cal_w_header").css("position", "fixed");
            }
          });
        });

        this.$refs.namo.contentWindow.crosseditor.SetBodyValue(this.body);
        if (this.read) {
          this.$refs.namo.contentWindow.crosseditor.SetReadonly(true);
        }
      }
    },
  },
};
</script>

<style>
</style>