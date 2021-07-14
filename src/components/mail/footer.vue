<template>
  <ul class="btm_btn clfix">
      <router-link to="/"
        ><li class="home"><a></a></li
      ></router-link>
      <li class="back" @click="RouterBack"><a></a></li>
      <li class="go" @click="RouterGo"><a></a></li>
      <li class="refresh" @click="RouterRefresh"><a></a></li>
      <li class="link" @click="RouterLink"><a></a></li>
      <li class="btm_more"><a></a></li>
    </ul>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    computed: {
    ...mapState(["mail"]),
    ...mapGetters([
    ]),
    path() {
      return this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1);
    },
  },
  methods: {
      // 전 url 이동
    RouterBack() {
      this.$router.go(-1);
    },
    // 후 url 이동
    RouterGo() {
      this.$router.go(1);
    },
    // 새로고침
    RouterRefresh() {
      console.log("새로고침")
      this.$router.push(this.$route.path);
    },
    RouterLink() {
      console.log("routerlink");
    },
  }

}
</script>

<style>

</style>