<template>
  <iframe
    :src="body"
    id="iid"
    style="width: 100%; height: 100%; overflow: hidden; border: 0;pointer-events: none;"
    ref="openfield"
  ></iframe>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  beforeDestroy() {
    clearInterval(this.interval);
    clearInterval(this.color);
  },
  created() {
    this.timeout = setTimeout(() => {
      clearInterval(this.interval);
      clearInterval(this.color);
      }, 10000);
    this.src = "/mobile_index/main/my";
  },
  mounted() {
    $("#iid").on("load", this.deleteImg);
  },
  props: ["body", "read", "did"],
  data() {
    return {
      interval: null,
    };
  },
  methods: {},
  computed: {
    ...mapGetters("configjs", ["GetSystemColor"]),
    isOpenField() {
      return this.body.toLowerCase().indexOf("openfiled") !== -1;
    },
    deleteImg() {
      var check = this;
      this.interval = setInterval(() => {
        var doc =
          check.$refs.openfield.contentDocument ||
          check.$refs.openfield.contentWindow.document;

        var imgs = doc.querySelectorAll("img[src='/icons/medoc.gif']");
        if (imgs.length > 0) {
          clearInterval(check.interval);
          for (var i = 0; i < imgs.length; i++) {
            imgs[
              i
            ].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
          }
        }
      }, 300);

      if (this.GetSystemColor == "dark") {
        this.color = setInterval(() => {
          var doc =
          check.$refs.openfield.contentDocument ||
          check.$refs.openfield.contentWindow.document;
          var color = doc.querySelectorAll("body");
          if (color.length > 0) {
            clearInterval(check.color);
            for (var i = 0; i < color.length; i++) {
              color[i].setAttribute("style", "color: #f2f2f2;");
            }
          }
        }, 200);
      }
    },
  },
};
</script>

<style>
</style>