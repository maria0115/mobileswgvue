<template>
  <div class="wrap p_b50" :class="{ dark: this.color }" >
    <div class="modal_wrap">
    <router-view></router-view>
    <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Footer from "./footer.vue";
import $ from "jquery";
export default {
  components: {
    Footer
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

<style scoped>
.wrap{background:#f3f3f3;}
.p_b50{padding-bottom:3.12rem;}
</style>