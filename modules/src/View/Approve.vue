<template>
  <div class="wrap btm_b" :class="{ dark: this.color }">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Footer from "./footer.vue";
import $ from "jquery";
export default {
components: {
    Footer,
  },
  computed: {
    ...mapGetters("configjs",["GetSystemColor", "GetConfig"]),
    color() {
      if (this.GetSystemColor === "dark") {
        return true;
      }
    },
  },
  mounted() {
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
}
</script>

<style>

</style>