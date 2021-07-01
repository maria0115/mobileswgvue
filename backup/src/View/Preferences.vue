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
  computed: {
    ...mapState(["systemcolor","config"]),
    // 사용자가 설정한 display color
    color() {
      if (this.systemcolor === "dark") {
        return true;
      }
    },
  },
  mounted() {
    // dom이 생성된 후 font setting
    $(".wrap").css("font-family", this.config.font.font);
    // .catch(() => {});
  },
  created(){
    // this.$store.dispatch("GetLanguage",{app:"config"});
  }
};
</script>

<style>
</style>