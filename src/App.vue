<template>
  <div id="app" ref="top" :class="{ dark: this.color }">
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
  },
  created() {
    // this.$store.dispatch("getForm");
    //   이거 라우터 비포로 옮기기
    
    
  },
  mounted() {

  },
  mixin: [ p, slick,common],
};
</script>

<style>
@import "./mobile/css/common.css";
@import "./mobile/css/style.css";
@import "./mobile/css/slick.css";
</style>