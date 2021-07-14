<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="set_config"><img src="../../mobile/img/wmail_back.png" alt="" /></router-link>
      인사말
      <span><router-link to="addgreet">추가</router-link></span>
    </h2>
    <div class="m_contents06">
      <ul class="cm_list">
        <li>
          <span class="sv_radio active"></span
          ><router-link to="seegreet">기본 인사말</router-link>
        </li>
        <li>
          <span class="sv_radio"></span
          ><router-link to="seegreet">대외용 인사말</router-link>
        </li>
        <li>
          <span class="sv_radio"></span
          ><router-link to="seegreet">테스트 인사말</router-link>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../mail/footer.vue";
export default {
  components: {
    Footer,
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