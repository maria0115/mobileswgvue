<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="/maillist"><img src="../../mobile/img/wmail_back.png" alt="" /></router-link>환경설정
    </h2>
    <div class="m_contents05">
      <ul class="cm_list">
        <router-link to="autosave"
          ><li>
            <a>자동저장<span>사용함</span></a>
          </li></router-link
        >
        <router-link to="sign"
          ><li>
            <a>서명<span>{{this.mail.data.signature.data.use}}사용함</span></a>
          </li></router-link
        >
        <router-link to="greet"
          ><li>
            <a>인사말<span>사용함</span></a>
          </li></router-link
        >
        <router-link to="delay"
          ><li>
            <a>지연발송<span>사용안함</span></a>
          </li></router-link
        >
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
  },
};
</script>

<style>
</style>