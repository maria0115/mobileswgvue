<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{name:'mailsetconfig'}"><img src="../../mobile/img/wmail_back.png" alt="" /></router-link
      >{{lang.title}}
    </h2>
    <div class="m_contents05">
      <ul class="cm_list" :class="{on:GetMailConfig.autosave.config.use}">
        <li class="toggle_line">
          <a @click="MailConfigChange(!GetMailConfig.autosave.config.use,'use')">{{lang.subtitle}}<span class="btn_toggle"></span></a>
        </li>
        <li class="t_btn">
          <a>{{lang.cycle}}<span>{{GetMailConfig.autosave.config.time}}{{lang.minute}}</span></a>
        </li>
        <li class="d_btn">
          <a>{{lang.period}}<span>{{GetMailConfig.autosave.config.day}}{{lang.day}}</span></a>
        </li>
      </ul>
      <div>
        <p>{{lang.message}}</p>
        <p>
          {{lang.message2}}
        </p>
      </div>
      <div class="save_time">
        <div class="move_bg"></div>
        <ul>
          <li v-for="(value,index) in this.GetMailConfig.autosave.dutytime" :key="index" @click="MailConfigChange(value,'time')">
            <span class="sv_radio" :class="{active:GetMailConfig.autosave.config.time==value}"></span>
            <em>{{value}}{{lang.minute}}</em>
          </li>
        </ul>
      </div>
      <div class="save_day">
        <div class="move_bg"></div>
        <ul>
          <li v-for="(value,index) in this.GetMailConfig.autosave.storageperiod" :key="index" @click="MailConfigChange(value,'day')">
            <span class="sv_radio" :class="{active:GetMailConfig.autosave.config.day==value}"></span>
            <em>{{value}}{{lang.day}}</em>
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
    this.lang = this.GetMConfigL.autosave;
  },
  components: {
  },
  computed: {
    ...mapGetters("mailjs",["GetMailConfig"]),
  },
  methods: {
    MailConfigChange(value,type){
      if(type =="use"){
        this.GetMailConfig.autosave.config.use = !this.GetMailConfig.autosave.config.use;
      }else{
        this.GetMailConfig.autosave.config[type] = value;
      }
      this.$store.dispatch("mailjs/MailAutoSave",this.GetMailConfig.autosave.config);

    },
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>