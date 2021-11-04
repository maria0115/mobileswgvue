<template>
  <div class="wrap btm_b">
    <div class="main_wrap">
      <h1 class="main_logo">
        <img src="../mobile/img/main_logo.png" alt="로고" />
      </h1>
      <div class="login_input">
        <input type="text" placeholder="아이디" v-model="id" />
        <input
          type="password"
          placeholder="비밀번호"
          v-model="password"
          @keyup.enter="login"
        />
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
import { mapState, mapGetters } from "vuex";
import cookie from "vue-cookies";

export default {
  computed: {
    ...mapGetters("configjs", ["GetConfig"]),
  },
  created() {
    this.idSave = JSON.parse(localStorage.getItem("idSave"));
    this.autoLogin = this.GetConfig.login;
    // this.autoLogin = JSON.parse(localStorage.getItem("autoLogin"));
    if (this.autoLogin && this.GetConfig.login) {
      this.id = localStorage.getItem(`${config.packageName}id`);
      this.password = localStorage.getItem(`${config.packageName}pass`);
      if (this.password.length > 0) {
        this.login();
        return;
      }
    }
    if (this.idSave) {
      this.id = localStorage.getItem(`${config.packageName}id`);
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
      var query = this.$route.query;
      if (query && Object.keys(query).length > 0) {
        localStorage.setItem(
          `${config.packageName}deviceInformation`,
          JSON.stringify(query)
        );
      } else {
        query = JSON.parse(
          localStorage.getItem(`${config.packageName}deviceInformation`)
        );
      }

      var data = {
        Username: this.id,
        Password: this.password,
        idSave: this.idSave,
        autoLogin: this.autoLogin,
        data: query,
      };
      this.$store.dispatch("login", data).then((res) => {
        if (res.success) {
          this.setConfig();
          this.$router.push({ name: "root" });
        } else {
          if(res.alert){
            alert("로그인 실패, reason = > " + res.message);

          }
          localStorage.setItem("autoLogin", false);
          localStorage.setItem(`${config.packageName}pass`, "");
          this.password = "";
          cookie.set("LtpaToken", "");
          // console.log(this.$cookie.get("LtpaToken"))
        }
      });
    },
    toggleidSave() {
      this.idSave = !this.idSave;
    },
    toggleautoLogin() {
      this.autoLogin = !this.autoLogin;
    },
    setConfig() {
      this.$store.dispatch("configjs/setConfig", {
        menu: "login",
        value: this.autoLogin,
      });
    },
  },
};
</script>

<style>
</style>