<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{name:'SeeSign'}">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >{{lang.title}}
      <div>
        <span class="delet fw_bold" @click="Delete"><a>{{lang.delete}}</a></span>
        <span class="save fw_bold" @click="Modify"><a>{{lang.save}}</a></span>
      </div>
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
            <div @click="defaultCheck">
              <em class="sig_check" :class="{ active: this.default }"></em>{{lang.default}}
            </div>
          </li>
          <li>
            <Namo :editor="body" did="sign" :read="false" ref="editor"></Namo>
            <!-- <textarea v-model="GetSignView.body">
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
import { mapState, mapGetters } from "vuex";
import { Editor,EditorContent } from "tiptap";
import Namo from '../editor/namo.vue';
// import EditorContent from "./EditorContent.vue";
export default {
  created() {
    this.lang = this.GetMConfigL.modifysign;
    this.default = this.GetSignView.default;
    this.body = this.GetSignView.body;
    this.subject = this.GetSignView.subject;
  },
  mounted() {
    // this.content = this.GetGreetView.body;
    this.editor = new Editor({
      content: this.body,
    })
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  data() {
    return {
      default: false,
      editor: null,
      content: "",
      body: "",
      subject: "",
    };
  },
  computed: {
    ...mapGetters("mailjs",["GetSignView"]),
  },
  components: {
    EditorContent,Namo
  },
  methods: {
    Delete(){
      this.$store.dispatch("mailjs/SignGreetDelete","sign");
    },
    async Modify() {
      let editorData = this.$refs.editor.$refs.namo.contentWindow.crosseditor.GetBodyValue();
      this.GetSignView.body = editorData;
      // this.GetSignView.body = this.editor.getHTML();
      this.GetSignView.subject = this.subject;
      this.GetSignView.default = this.default;
      var result = await this.$store.dispatch("mailjs/SignEdit", this.GetSignView);
      if(result){
        this.$router.push({ name: 'sign' });
      }
    },
    Back() {
      this.$router.go(-1);
    },
    defaultCheck() {
      this.default = !this.default;
    },
  },
};
</script>

<style>
</style>