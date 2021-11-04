<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{name:'SeeSign'}">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >서명 편집
      <div>
        <span class="delet" @click="Delete"><a>삭제</a></span>
        <span class="save" @click="Modify"><a>저장</a></span>
      </div>
    </h2>
    <div class="m_contents06">
      <form @submit.prevent>
        <ul>
          <li>
            <span>제목</span>
            <input type="text" v-model="subject" />
          </li>
          <li>
            <span>설정</span>
            <div @click="defaultCheck">
              <em class="sig_check" :class="{ active: this.default }"></em>기본
              서명으로 지정
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
        this.$router.push({ name: "SeeSign"});
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