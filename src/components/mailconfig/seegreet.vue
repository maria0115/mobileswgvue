<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{ name: 'greet' }">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >{{ lang.title }}
      <span
        ><router-link :to="{ name: 'modifygreet' }">{{
          lang.edit
        }}</router-link></span
      >
    </h2>
    <div class="m_contents07">
      <ul>
        <li>
          <span>{{ lang.subject }}</span>
          <div>
            <p>{{ GetGreetView.subject }}</p>
          </div>
        </li>
        <li>
          <span>{{ lang.setting }}</span>
          <div v-if="GetGreetView.default">
            <p>{{ lang.default }}</p>
          </div>
        </li>
        <li class="texteditor">
          <Body
            style="height: auto"
            :body="GetGreetView.body"
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
// import Namo from "../editor/namo.vue";
export default {
  created() {
    this.lang = this.GetMConfigL.readgreet;
  },
  components: {
    EditorContent,
    // Namo,
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
    ...mapGetters("mailjs", ["GetGreetView"]),
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