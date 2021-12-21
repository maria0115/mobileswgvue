<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{name:'sign'}">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >{{lang.title}}
      <span class="save fw_bold" @click="SignAdd"><a>{{lang.save}}</a></span>
    </h2>
    <div class="m_contents06">
      <form @submit.prevent>
        <ul>
          <li>
            <span>{{lang.subject}}</span>
            <input type="text" v-model="subject" />
          </li>
          <li>
            <span>{{lang.setting}}</span>
            <div @click="DefaultSign"><em class="sig_check"  :class="{active:this.default}"></em>{{lang.default}}</div>
          </li>
          <li>
            <Namo :editor="body" :read="false" did="greet" ref="editor"></Namo>
            <!-- <textarea v-model="body">
---------------------------------------------------------
이정인 책임연구원
(주)새롬정보시스템/디자인팀
153-704 서울시 금천구 가산디지털1로 219 벽산디지털 밸리 
6차 601호 
Tel : (02) 2105-2548  H.P: 010-6612-5764
E-mail : jeongin@saerom.co.kr
http://www.saerom.co.kr
---------------------------------------------------------
                    </textarea
            > -->
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import Namo from '../editor/namo.vue';

export default {
  created(){
    this.lang = this.GetMConfigL.addsign
  },
  components: {
    Namo
  },
  data() {
    return {
      // path:this.path,
      subject: "",
      default: false,
      body: "",
    };
  },
  methods: {
    DefaultSign(){
      this.default = !this.default;
    },
    SignAdd(){
      var data = {};
      data.subject = this.subject;
      data.default = this.default;
      data.body = this.$refs.editor.$refs.namo.contentWindow.crosseditor.GetBodyValue();
      this.$store.dispatch("mailjs/SignAdd",data);
    },
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>