<template>
  <div class="wrap" :class="{ dark: this.color }">
    {{this.color}}
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import $ from "jquery";
export default {
  components: {
  },
  computed: {
    ...mapGetters("configjs",["GetSystemColor","GetConfig"]),
    // 사용자가 설정한 display color
    color() {
      if (this.GetSystemColor === "dark") {
        return true;
      }
    },
  },
  mounted() {
    // dom이 생성된 후 font setting
    $(".wrap").css("font-family", this.GetConfig.font.font);
    // .catch(() => {});
  },
  created() {
    // console.log(this.GetConfig)
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