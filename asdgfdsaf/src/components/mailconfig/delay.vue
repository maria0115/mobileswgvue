<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="set_config"><img src="../../mobile/img/wmail_back.png" alt="" /></router-link
      >지연발송
    </h2>
    <div class="m_contents05">
      <ul class="cm_list" :class="{on:MailConfig.delay.config.use}">
        <li class="toggle_line">
          <a @click="MailConfigChange(!MailConfig.delay.config.use,'use')">지연발송사용<span class="btn_toggle"></span></a>
        </li>
        <li class="t_btn">
          <a>지연시간<span>{{MailConfig.delay.config.time}}분</span></a>
        </li>
      </ul>
      <div>
        <p>
          메시지를 일정시간후에 발송할 수 있도록 지연시킬 수 있는 기능입니다.
        </p>
        <p>
          이 기능을 사용하여 메시지를 발송하면 [예약메일]->[발송대기]에
          저장됩니다.
        </p>
        <p>
          발송 대기함 열 중 발송취소 아이콘을 누르거나 보낼 메시지를 열어서
          발송취소 버튼을 클릭하여 발송을 취소하여 임시저장 상태로 변경할 수
          있습니다.
        </p>
      </div>
      <div class="save_time">
        <div class="move_bg"></div>
        <ul>
          <li v-for="(value,index) in this.MailConfig.delay.dutytime" :key="index" @click="MailConfigChange(value,'time')">
            <span class="sv_radio" :class="{active:MailConfig.delay.config.time==value}"></span>
            <em>{{value}}분</em>
          </li>
        </ul>
      </div>
    </div>
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
    ...mapGetters(["MailConfig"]),
  },
  methods: {
    MailConfigChange(value,type){
      if(type =="use"){
        this.MailConfig.delay.config.use = !this.MailConfig.delay.config.use;
      }else{
        this.MailConfig.delay.config[type] = value;
      }
      this.$store.dispatch("MailDelay",this.MailConfig.delay.config);

    },
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>