<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{ name: 'greet' }">
        <img src="../../mobile/img/wmail_back.png" alt="" /> </router-link
      >{{ lang.title }}
      <span class="save fw_bold" @click="GreetAdd"
        ><a>{{ lang.save }}</a></span
      >
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
            <div @click="DefaultGreet">
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
export default {
  created() {
    this.lang = this.GetMConfigL.addgreet;
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
      data.body = this.$refs.Body.getBody();

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