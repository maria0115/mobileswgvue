<template>
  <iframe
    :src="body"
    id="iid"
    :style="isPoint()"
    ref="openfield"
  ></iframe>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  beforeDestroy() {
    clearInterval(this.interval);
    clearInterval(this.color);
    if (this.isClick) {
      clearInterval(this.link);
    }
  },
  created() {
    this.params = false;
    if (this.$route.query.data) {
      this.params = JSON.parse(this.$route.query.data);
    }

    this.isClick = this.params && this.params.type == "news" && this.isA();

    this.timeout = setTimeout(() => {
      clearInterval(this.interval);
      clearInterval(this.color);
      if (this.isClick) {
        clearInterval(this.link);
      }
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
  methods: {
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

      if (this.isClick) {
        this.link = setInterval(() => {
          var doc =
            check.$refs.openfield.contentDocument ||
            check.$refs.openfield.contentWindow.document;
          var link = doc.querySelectorAll("a");
          if (link.length > 0) {
            clearInterval(check.link);
            for (var i = 0; i < link.length; i++) {
              // var url = "m60call://browser?urladdress="+link[i].getAttribute("href");
              var url = link[i].getAttribute("href");

              var goto = `${window.location.origin}/mobile_index/viewer`;
              var setToken = this.replaceAll(this.getToKen(), "+", "$SIS$");
              var href = `${goto}?url=${encodeURIComponent(
                url
              )}&token=${encodeURIComponent(setToken)}`;

              link[i].setAttribute("href", href);
              link[i].setAttribute("target", "_parent");
            }
          }
        }, 200);
      }

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
    isPoint() {
      var sty = `width: 100%;
      height: 100%;
      overflow: hidden;
      border: 0;`;
      if (!this.isClick) {
        sty += "pointer-events: none;";
      }
      return sty;
    },
  },
  computed: {
    ...mapGetters("configjs", ["GetSystemColor"]),
    isOpenField() {
      return this.body.toLowerCase().indexOf("openfiled") !== -1;
    },
  },
};
</script>

<style>
</style>