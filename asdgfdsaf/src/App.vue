<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import j from "./mobile/js/jquerymin";
import p from "./mobile/js/prefixfreemin.js";
import common from "./mobile/js/common.js";
import slick from "./mobile/js/slick.js";
import { mapState, mapGetters } from "vuex";
import $ from "jquery";
export default {
  computed: {
    ...mapState(["systemcolor", "config"]),
    ...mapGetters(["GetFont"]),
    color() {
      if (this.systemcolor === "dark") {
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
  mixin: [j, p, common, slick],
};
</script>

<style>
@import "./mobile/css/common.css";
@import "./mobile/css/style.css";
@import "./mobile/css/slick.css";
</style>