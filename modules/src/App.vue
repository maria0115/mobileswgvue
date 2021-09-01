<template>
  <div id="app">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
// import j from "./mobile/js/jquerymin";
import p from "./mobile/js/prefixfreemin.js";
import slick from "./mobile/js/slick.js";
import common from "./mobile/js/common.js";
// import $ from "jquery";
export default {
  components: {
  },
  computed: {
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