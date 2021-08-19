<template>
  <div class="wrap btm_b" :class="{ dark: this.color }">
    <router-view :key="$route.fullPath"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Footer from "./footer.vue";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      checkEvent: "touch",
    };
  },
  computed: {
    ...mapGetters([
      "GetSystemColor","GetConfig"
    ]),
    color() {
      if (this.GetSystemColor === "dark") {
        return true;
      }
    },
  },
  mounted() {
    // if ("ontouchstart" in document.documentElement !== true) {
    //   this.checkEvent = "mouse";
    // }
    // dom이 생성된 후 font setting
    $(".wrap").css("font-family", this.GetConfig.font.font);
  },
  created() {
    // font size setting
    if (this.GetConfig.font.size == "small") {
      $("html").addClass("small");
      $("html").removeClass("normal");
      $("html").removeClass("large");
      $("html").removeClass("mar15");
    } else if (this.GetConfig.font.size == "normal") {
      $("html").addClass("normal");
      $("html").removeClass("small");
      $("html").removeClass("large");
      $("html").removeClass("mar15");
    } else if (this.GetConfig.font.size == "large") {
      $("html").addClass("large");
      $("html").removeClass("small");
      $("html").removeClass("normal");
      $("html").addClass("mar15");
    }
  },
};
</script>

<style>
</style>