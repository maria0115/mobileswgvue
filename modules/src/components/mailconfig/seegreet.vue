<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="greet">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >인사말 보기
      <span><router-link to="modifygreet">편집</router-link></span>
    </h2>
    <div class="m_contents07">
      <ul>
        <li>
          <span>제목</span>
          <div>
            <p>{{ GetGreetView.subject }}</p>
          </div>
        </li>
        <li>
          <span>설정</span>
          <div v-if="GetGreetView.default">
            <p>기본 인사말</p>
          </div>
        </li>
        <li class="texteditor">
          <!-- <div v-html="GetGreetView.body">안녕하세요 디자인팀 홍길동입니다.</div> -->
          <editor-content :editor="editor" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Editor, EditorContent } from "tiptap";
export default {
  components: {
    EditorContent,
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  data: function () {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      content: this.GetGreetView.body,
      editable: false,
    });
  },
  computed: {
    ...mapGetters("mailjs",["GetGreetView"]),
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