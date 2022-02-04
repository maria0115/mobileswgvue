<template>
  <div id="app" ref="top" :style="customStyle" :class="{ dark: this.color }">
    <!-- {{decodeURIComponent(this.$route.fullPath)}} -->
    <router-view :key="$route.fullPath"></router-view>
    <spinner :loading="tf"></spinner>
    <Footer></Footer>
  </div>
</template>

<script>
// import j from "./mobile/js/jquerymin";
import p from "./mobile/js/prefixfreemin.js";
import slick from "./mobile/js/slick.js";
import common from "./mobile/js/common.js";
import pullto from "./mobile/js/pullto.js";
import { mapState, mapGetters } from "vuex";
import Spinner from "@/View/Spinner.vue";
// import $ from "jquery";
export default {
  components: {
    Spinner
  },
  computed: {
    ...mapState([ "tf"]),
    ...mapGetters("configjs",["GetSystemColor", "GetConfig"]),

    ...mapGetters(["GetFont"]),
    color() {
      if (this.GetSystemColor === "dark") {
        return true;
      }
    },
    customStyle(){
      return{
        '--main-bg-color': this.Option().mainBgColor,
        "--border-color":this.Option().borderColor,
        "--image-color":this.Option().imageColor,
        "--main-border-color":this.Option().mainBorderColor,
        "--btn-bg-color":this.Option().btnBgColor,
        "--my-info":this.Option().myInfo,
        "--solid-color":this.Option().solidColor,
        "--obj-color":this.Option().objColor,
        "--icon-color":this.Option().iconColor,
        "--today-color":this.Option().todayColor,
        "--shadow-box-color":this.Option().shadowBoxColor,
      }
    },
  },
  created() {
    // this.$store.dispatch("getForm");
    //   이거 라우터 비포로 옮기기
    
    
  },
  mounted() {
  },
  mixin: [ p, slick,common,pullto],
};
</script>

<style>
@import "./mobile/css/common.css";
@import "./mobile/css/style.css";
@import "./mobile/css/slick.css";
@import "./mobile/css/font.css";
</style>