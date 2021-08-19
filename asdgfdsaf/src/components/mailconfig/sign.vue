<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="set_config"><img src="../../mobile/img/wmail_back.png" alt="" /></router-link>
      서명
      <span><router-link to="addsign">추가</router-link></span>
    </h2>
    <div class="m_contents06">
      <ul class="cm_list">
        <li v-for="(value,index) in this.mail.data.signature.data.data" :key="index">
          <span @click="SignSet(value)" class="sv_radio" :class="{active:value.default}"></span
          ><a @click="SeeSign(value.unid)">{{value.subject}}</a>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../mail/footer.vue";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    Footer,
  },
  computed: {
    ...mapState(["mail"]),
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    SignSet(value){
      this.$store.dispatch("SignSet",{unid:value.unid});

    },
    SeeSign(unid){
      this.$router.push({ name: "SeeSign", params: { unid } });
    },
  },
};
</script>

<style>
</style>