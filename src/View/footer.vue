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
            <!-- v-if="value.key !== 'person'" -->
            <router-link :to="`/${value.key}_more`"
              ><span :class="`${value.key}_f_ic`"></span
              >{{ GetMainLanguage.header[value.key] }}</router-link
            >
          </li>
        </ul>
        <em class="close_btn"></em>
      </div>
    </div>
    <OrgFooter
      @CardOpen="CardOpen"
      :modalon="modalon"
      @ModalOff="ModalOff"
    ></OrgFooter>
    <PersonCard @ModalOff="CardOff" :item="cardItem" :modalon="cardon"></PersonCard>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PersonCard from "./PersonCard.vue";
import OrgFooter from "./OrgFooter.vue";
export default {
  created() {},
  computed: {
    ...mapState("mailjs", ["mail"]),
    ...mapState(["org"]),
    ...mapGetters("mailjs", ["GetMailDetail", "GetMail", "GetMailConfig"]),
    ...mapGetters(["GetMainLanguage"]),
    path() {
      return this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1);
    },
  },
  components: {
    OrgFooter,
    PersonCard,
  },
  data: function () {
    return {
      modalAutoOrg: 0,
      modalon: false,
      cardItem: {},
      cardon:false,
    };
  },

  methods: {
    CardOff(){
      this.cardon = false;
    },
    CardOpen(item) {
      this.cardon = true;
      this.cardItem = item;
    },
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