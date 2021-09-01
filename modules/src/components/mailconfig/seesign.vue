<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="sign"> <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >서명 보기
      <span><router-link to="modifysign">편집</router-link></span>
    </h2>
    <div class="m_contents07">
      <ul>
        <li>
          <span>제목</span>
          <div>
            <em>{{GetSignView.subject}}</em>
          </div>
        </li>
        <li>
          <span>설정</span>
          <div v-if="GetSignView.default">
            <em>기본 서명</em>
          </div>
        </li>
        <li class="texteditor">
          <!-- <div v-html="GetSignView.body">
            ---------------------------------------------------------<br />
            이정인 책임연구원<br />
            (주)새롬정보시스템/디자인팀<br />
            153-704 서울시 금천구 가산디지털1로 219 벽산디지털 밸리 <br />
            6차 601호 <br />
            Tel : (02) 2105-2548 H.P: 010-6612-5764<br />
            E-mail : jeongin@saerom.co.kr<br />
            http://www.saerom.co.kr<br />
            ---------------------------------------------------------
          </div> -->
          <editor-content :editor="editor" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Editor,EditorContent  } from "tiptap";
export default {
  components: {
    EditorContent,
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  mounted(){
    this.editor = new Editor({
      content: this.GetSignView.body,
      editable:false,
    })
  },
  data() {
    return {
      // path:this.path,
      subject: "",
      default: false,
      body: "",
      editor: null,
    };
  },
  computed: {
    ...mapGetters("mailjs",["GetSignView"]),
  },
  created(){
    
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