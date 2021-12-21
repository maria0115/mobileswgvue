<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{name:'greet'}">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >{{lang.title}}
      <span class="save fw_bold" @click="GreetAdd"><a>{{lang.save}}</a></span>
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
            <div @click="DefaultGreet">
              <em class="sig_check" :class="{ active: this.default }"></em>{{lang.default}}
            </div>
          </li>
          <li>
            <Namo :editor="body" :read="false" did="greet" ref="editor"></Namo>
            <!-- <textarea v-model="body">
안녕하세요 디자인팀 홍길동입니다.
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
    this.lang = this.GetMConfigL.addgreet;
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
    DefaultGreet() {
      this.default = !this.default;
    },
    GreetAdd() {
      var data = {};
      data.subject = this.subject;
      data.default = this.default;
      data.body = this.$refs.editor.$refs.namo.contentWindow.crosseditor.GetBodyValue();
      this.$store.dispatch("mailjs/GreetAdd", data);
    },
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>