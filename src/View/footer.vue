<template>
  <div>
    <ul class="btm_btn clfix">
      <li class="home"><router-link to="/"></router-link></li>
      <li class="back" @click="RouterBack"><a></a></li>
      <li class="go" @click="RouterGo"><a></a></li>
      <li class="btm_menu"><a></a></li>
      <li class="btm_organ" @click="orgClick()"><a></a></li>
      <li class="btm_allim">
        <a><em class="allim_num">23</em></a>
      </li>
    </ul>
    <div class="btm_menu_list">
      <div class="list_inner">
        <ul class="clfix">
          <li v-for="(value, name) in mainmenu" :key="name">
            <router-link :to="`/${value.key}_more`"
              ><span :class="`${value.key}_f_ic`"></span
              >{{ GetMainLanguage.header[value.key] }}</router-link
            >
          </li>
        </ul>
        <em class="close_btn"></em>
      </div>
    </div>
    <Org :modalon="modalon" @ModalOff="ModalOff"></Org>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Org from "./Org.vue";
export default {
  computed: {
    ...mapState("mailjs", ["mail", "mailorg"]),
    ...mapGetters("mailjs", ["GetMailDetail", "GetMail", "GetMailConfig"]),
    ...mapGetters(["GetMainLanguage"]),
    path() {
      return this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1);
    },
  },
  components: {
    Org
  },
  data: function () {
    return {
      modalAutoOrg: 0,
      modalon: false,
    };
  },
  
  methods: {
    ModalOff() {
      this.modalon = false;
    },
    // 전 url 이동
    RouterBack() {
      this.$store.commit("mailjs/Back");
      this.$router.go(-1);
    },
    // 후 url 이동
    RouterGo() {
      this.$store.commit("mailjs/Back");

      this.$router.go(1);
    },
    // 새로고침
    RouterRefresh() {
      this.$router.push(this.$route.path);
    },
    RouterLink() {
      console.log("routerlink");
    },
    orgClick(to) {
      this.modalon = true;
    },
  },
};
</script>

<style>
</style>