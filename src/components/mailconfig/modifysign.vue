<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{ name: 'SeeSign' }">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >{{ lang.title }}
      <div>
        <span class="delet fw_bold" @click="Delete"
          ><a>{{ lang.delete }}</a></span
        >
        <span class="save fw_bold" @click="Modify"
          ><a>{{ lang.save }}</a></span
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
            <Body :body="body" ref="Body" :read="false" did="sign" />
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
    this.lang = this.GetMConfigL.modifysign;
    this.default = this.GetSignView.default;
    this.body = this.GetSignView.body;
    this.subject = this.GetSignView.subject;
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
    ...mapGetters("mailjs", ["GetSignView"]),
  },
  methods: {
    Delete() {
      this.$store.dispatch("mailjs/SignGreetDelete", "sign");
    },
    async Modify() {
      let editorData = this.$refs.Body.getBody();

      this.GetSignView.body = editorData;
      // this.GetSignView.body = this.editor.getHTML();
      this.GetSignView.subject = this.subject;
      this.GetSignView.default = this.default;
      var result = await this.$store.dispatch(
        "mailjs/SignEdit",
        this.GetSignView
      );
      if (result) {
        this.$router.push({ name: "sign" });
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