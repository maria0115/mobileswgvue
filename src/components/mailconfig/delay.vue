<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{name:'mailsetconfig'}"><img src="../../mobile/img/wmail_back.png" alt="" /></router-link
      >{{lang.title}}
    </h2>
    <div class="m_contents05">
      <ul class="cm_list" :class="{on:GetMailConfig.delay.config.use}">
        <li class="toggle_line">
          <a @click="MailConfigChange(!GetMailConfig.delay.config.use,'use')">{{lang.subtitle}}<span class="btn_toggle"></span></a>
        </li>
        <li class="t_btn">
          <a>{{lang.delyminute}}<span>{{GetMailConfig.delay.config.time}}{{lang.minute}}</span></a>
        </li>
      </ul>
      <div>
        <p>
          {{lang.message}}
        </p>
        <p>
          {{lang.message2}}
        </p>
      </div>
      <div class="save_time">
        <div class="move_bg"></div>
        <ul>
          <li v-for="(value,index) in this.GetMailConfig.delay.dutytime" :key="index" @click="MailConfigChange(value,'time')">
            <span class="sv_radio" :class="{active:GetMailConfig.delay.config.time==value}"></span>
            <em>{{value}}{{lang.minute}}</em>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  created(){
    this.lang = this.GetMConfigL.dely;
  },
  components: {
  },
  computed: {
    ...mapGetters("mailjs",["GetMailConfig"]),
  },
  methods: {
    MailConfigChange(value,type){
      if(type =="use"){
        this.GetMailConfig.delay.config.use = !this.GetMailConfig.delay.config.use;
      }else{
        this.GetMailConfig.delay.config[type] = value;
      }
      this.$store.dispatch("mailjs/MailDelay",this.GetMailConfig.delay.config);

    },
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>