<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{name:'mail'}"><img src="../../mobile/img/wmail_back.png" alt="" /></router-link>환경설정
    </h2>
    <div class="m_contents05">
      <ul class="cm_list">
        <router-link :to="{name:'autosaveconfig'}"
          ><li>
            <a>자동저장<span>사용함</span></a>
          </li></router-link
        >
        <router-link :to="{name:'sign'}"
          ><li>
            <a>서명<span>{{this.mail.data.signature.data.use}}사용함</span></a>
          </li></router-link
        >
        <router-link :to="{name:'greet'}"
          ><li>
            <a>인사말<span>{{this.mail.data.greetings.data.use}}사용함</span></a>
          </li></router-link
        >
        <router-link :to="{name:'delay'}"
          ><li>
            <a>지연발송<span>사용안함</span></a>
          </li></router-link
        >
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("mailjs",["mail"]),
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