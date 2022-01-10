<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{ name: 'sign' }">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >{{ lang.title }}
      <span
        ><router-link :to="{ name: 'modifysign' }">{{
          lang.edit
        }}</router-link></span
      >
    </h2>
    <div class="m_contents07">
      <ul>
        <li>
          <span>{{ lang.subject }}</span>
          <div>
            <p>{{ GetSignView.subject }}</p>
          </div>
        </li>
        <li>
          <span>{{ lang.setting }}</span>
          <div v-if="GetSignView.default">
            <p>{{ lang.default }}</p>
          </div>
        </li>
        <li class="texteditor">
          <Body
            style="height: auto"
            :body="GetSignView.body"
            ref="Body"
            :read="true"
            did="mail"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Editor, EditorContent } from "tiptap";
// import Namo from '../editor/namo.vue';
export default {
  components: {
    EditorContent,
    // Namo
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  mounted() {
    this.editor = new Editor({
      content: this.GetSignView.body,
      editable: false,
    });
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
    ...mapGetters("mailjs", ["GetSignView"]),
  },
  created() {
    this.lang = this.GetMConfigL.readsign;
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