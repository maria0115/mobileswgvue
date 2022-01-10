<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{ name: 'SeeGreet' }">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >{{ lang.title }}
      <div>
        <span class="save fw_bold" @click="Modify"
          ><a>{{ lang.save }}</a></span
        >
        <span class="delet fw_bold" @click="Delete"
          ><a>{{ lang.delete }}</a></span
        >
      </div>
    </h2>
    <div class="m_contents06">
      <form @submit.prevent>
        <ul>
          <li>
            <span>{{ lang.subject }}</span>
            <input type="text" v-model="subject" />
          </li>
          <li>
            <span>{{ lang.setting }}</span>
            <div @click="defaultCheck">
              <em class="sig_check" :class="{ active: this.default }"></em
              >{{ lang.default }}
            </div>
          </li>
          <li>
            <Body :body="body" ref="Body" :read="false" did="greet" />
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  created() {
    this.lang = this.GetMConfigL.modifygreet;
    this.default = this.GetGreetView.default;
    this.body = this.GetGreetView.body;
    this.subject = this.GetGreetView.subject;
  },
  data() {
    return {
      default: false,
      content: "",
      body: "",
      subject: "",
    };
  },
  computed: {
    ...mapGetters("mailjs", ["GetGreetView"]),
  },
  methods: {
    Delete() {
      this.$store.dispatch("mailjs/SignGreetDelete", "greet");
    },
    async Modify() {
      let editorData = this.$refs.Body.getBody();

      this.GetGreetView.body = editorData;
      // this.GetGreetView.body = this.editor.getHTML();
      this.GetGreetView.subject = this.subject;
      this.GetGreetView.default = this.default;
      var result = await this.$store.dispatch(
        "mailjs/GreetEdit",
        this.GetGreetView
      );
      if (result) {
        this.$router.push({ name: "greet" });
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
/* .ProseMirror {
  width: 100%;
  height: 100%;
  resize: none;
  outline: none;
  border: 0;
  padding: 1.25rem;
  font-size: 0.87rem;
  color: #444;
  line-height: 1.6;
  overflow-y: scroll;
} */
</style>