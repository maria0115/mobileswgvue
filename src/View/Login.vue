<template>
  <div class="wrap btm_b">
    <div class="main_wrap">
      <h1 class="main_logo">
        <img src="../mobile/img/main_logo.png" alt="로고" />
      </h1>
      <div class="login_input">
        <input type="text" placeholder="아이디" v-model="id" />
        <input type="password" placeholder="비밀번호" v-model="password" />
      </div>
      <p class="login_check">
        <span class="check_lf" @click="toggleidSave">
          <b :class="{ active: this.idSave }"></b>
          <em>아이디저장</em>
        </span>
        <span class="check_ri" @click="toggleautoLogin">
          <b :class="{ active: this.autoLogin }"></b>
          <em>자동로그인</em>
        </span>
      </p>
      <button @click="login">로그인</button>
    </div>
  </div>
</template>

<script>
import config from "../config/config.json";
import cookie from 'vue-cookie';
export default {
  created() {
    console.log(this.$route.query);
    this.idSave = JSON.parse(localStorage.getItem("idSave"));
    this.autoLogin = JSON.parse(localStorage.getItem("autoLogin"));
    if (this.idSave) {
      this.id = localStorage.getItem(`${config.packageName}id`);
    }
    if (this.autoLogin) {
      this.id = localStorage.getItem(`${config.packageName}id`);
      this.password = localStorage.getItem(`${config.packageName}pass`);
      this.login();
    }
  },
  data() {
    return {
      id: "",
      password: "",
      language: "ko",
      idSave: false,
      autoLogin: false,
    };
  },
  methods: {
    login() {
      var data = {
        Username: this.id,
        Password: this.password,
        idSave: this.idSave,
        autoLogin: this.autoLogin,
        data: this.$route.query,
      };
      this.$store.dispatch("login", data).then((res) => {
        if (res.success) {
          this.$router.push("/");
          console.log("router 가기");
        } else {
          alert("로그인 실패, reason = > " + res.message);
          localStorage.setItem("autoLogin", false);
          localStorage.setItem(`${config.packageName}pass`, "");
          this.password = "";
          cookie.set("LtpaToken", "");
        }
      });
    },
    toggleidSave() {
      this.idSave = !this.idSave;
    },
    toggleautoLogin() {
      this.autoLogin = !this.autoLogin;
    },
  },
};
</script>

<style>
</style>