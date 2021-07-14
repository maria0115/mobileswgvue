<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="set_config"><img src="../../mobile/img/wmail_back.png" alt="" /></router-link
      >자동저장
    </h2>
    <div class="m_contents05">
      <ul class="cm_list" :class="{on:GetMailConfig.autosave.config.use}">
        <li class="toggle_line">
          <a @click="MailConfigChange(!GetMailConfig.autosave.config.use,'use')">자동저장사용<span class="btn_toggle"></span></a>
        </li>
        <li class="t_btn">
          <a>자동저장주기<span>{{GetMailConfig.autosave.config.time}}분</span></a>
        </li>
        <li class="d_btn">
          <a>메시지 보관 기간<span>{{GetMailConfig.autosave.config.day}}일</span></a>
        </li>
      </ul>
      <div>
        <p>메일 작성 시 설정한 시간에 따라 메일이 자동저장됩니다.</p>
        <p>
          자동저장된 메일은 [기본메일함]->[임시보관]->[자동저장] 메뉴에서 확인할
          수 있습니다.
        </p>
      </div>
      <div class="save_time">
        <div class="move_bg"></div>
        <ul>
          <li v-for="(value,index) in this.GetMailConfig.autosave.dutytime" :key="index" @click="MailConfigChange(value,'time')">
            <span class="sv_radio" :class="{active:GetMailConfig.autosave.config.time==value}"></span>
            <em>{{value}}분</em>
          </li>
        </ul>
      </div>
      <div class="save_day">
        <div class="move_bg"></div>
        <ul>
          <li v-for="(value,index) in this.GetMailConfig.autosave.storageperiod" :key="index" @click="MailConfigChange(value,'day')">
            <span class="sv_radio" :class="{active:GetMailConfig.autosave.config.day==value}"></span>
            <em>{{value}}일</em>
          </li>
        </ul>
      </div>
    </div>
    <ul class="btm_btn clfix">
      <li class="home"><a href="./mob_main.html"></a></li>
      <li class="back"><a href=""></a></li>
      <li class="go"><a href=""></a></li>
      <li class="refresh"><a href=""></a></li>
      <li class="link"><a href=""></a></li>
      <li class="btm_more"><a href=""></a></li>
    </ul>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Footer from "../mail/footer.vue";
export default {
  components: {
    Footer,
  },
  computed: {
    ...mapGetters(["GetMailConfig"]),
  },
  methods: {
    MailConfigChange(value,type){
      if(type =="use"){
        this.GetMailConfig.autosave.config.use = !this.GetMailConfig.autosave.config.use;
      }else{
        this.GetMailConfig.autosave.config[type] = value;
      }
      this.$store.dispatch("MailAutoSave",this.GetMailConfig.autosave.config);

    },
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>