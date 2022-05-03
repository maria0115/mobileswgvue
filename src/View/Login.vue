<template>
  <div class="wrap btm_b">
    <div class="main_wrap">
      <h1 class="main_logo">
        <img :src="Logo()" @error="$event.target.src = etcLogo()" alt="로고" />
      </h1>
      <div class="login_input">
        <input type="text" placeholder="id" v-model="id" />
        <input
          type="password"
          placeholder="password"
          v-model="password"
          @keyup.enter="login"
        />
      </div>
      <select v-if="this.Option().language" id="mult_lan" v-model="language">
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
      <p class="login_check">
        <span class="check_lf" @click="toggleidSave">
          <b :class="{ active: this.idSave }"></b>
          <em>Save ID</em>
        </span>
        <span class="check_ri" @click="toggleautoLogin">
          <b :class="{ active: this.autoLogin }"></b>
          <em>Auto Login</em>
        </span>
      </p>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import cookie from "vue-cookies";
import config from "@/config/config.json";
export default {
  computed: {
    ...mapGetters("configjs", ["GetConfig"]),
  },
  created() {
    // this.lang = this.GetCommonL.login;
    // console.log(this.lang)
    this.query = this.$route.query;

    var storage = JSON.parse(
      localStorage.getItem(`${config.packageName}deviceInformation`)
    );

    if (storage) {
      this.language = storage.strLocale;
      // 여기엔 무조건 locale 값이 있다
      if (this.query && Object.keys(this.query).length > 0) {
        // 앱파라미터값이 있으면
        this.query.strLocale = this.language.toLowerCase();
      } else {
        // 앱파라미터값이 없으면
        this.query = storage;
      }
    } else {
      //  여기엔 무조건 locale 값이 없다
      if (this.query && Object.keys(this.query).length > 0) {
        // 앱파라미터값이 있으면
        this.language = this.query.strLocale.toLowerCase();
      } else {
        this.query = {};
        this.query.strLocale = this.language.toLowerCase();
      }
    }
    this.idSave = JSON.parse(localStorage.getItem("idSave"));
    this.autoLogin = this.GetConfig.login;
    // this.autoLogin = JSON.parse(localStorage.getItem("autoLogin"));
    if (this.autoLogin && this.GetConfig.login) {
      this.id = localStorage.getItem(`${config.packageName}id`);
      this.password = localStorage.getItem(`${config.packageName}pass`);
      if (this.password && this.password.length > 0) {
        if (!(this.Option().sso && this.Config().env == "dev")) {
          this.login();
        }
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
      strLocale: "ko",
    };
  },
  methods: {
    Logo() {
      if (this.Config().company == "ace") {
        return `http://gw.ace-group.co.kr/dwplibs/images/login/login_logo.png`;
      }
      return require(`../mobile/img/main_logo_${this.Company()}.png`);
    },
    Company() {
      return config.company;
    },
    login() {
      this.$store.commit("mailjs/MailSearchOptionInit");

      this.query.strLocale = this.language.toLowerCase();

      localStorage.setItem(
        `${config.packageName}deviceInformation`,
        JSON.stringify(this.query)
      );
      var data = {
        Username: this.id,
        Password: this.password,
        idSave: this.idSave,
        autoLogin: this.autoLogin,
        data: this.query,
        lang: this.language.toLowerCase(),
      };
      this.$store.dispatch("login", data).then((res) => {
        if (res.success) {
          this.setConfig();
          if (this.$route.query.type == "mail" || this.$route.query.type == "approval") {
            var langarr = [
              "search",
              "main",
              "config",
              "approval",
              "board",
              "reservation",
              "mailconfig",
              "schedule",
              "common",
            ];
            for (var item of langarr) {
              this.getLanguage(item);
            }
            this.$store.dispatch("GetLanguage", { app: "common" });
            this.$store.dispatch("GetLanguage", { app: "mail" });
            this.$store.dispatch("configjs/setMode");
            this.$store.dispatch("mainjs/GetMyInfo");

            this.$store.dispatch("CategoryList", "").then((res) => {
              this.categorys = res;
              if (this.query.type == "mail") {
                this.$router.push({ name: "inbox_detail" });
              } else {
                var app = this.ThisCategory("approval");
                this.$store.dispatch("CategoryList", app.lnbid).then((res) => {
                  this.categorys = res;
                  var approve = this.ThisCategory("approve");
                  if (approve) {
                    this.$router.push({
                      name: "appapprove",
                      query: {
                        data: JSON.stringify({
                          title: approve.title,
                          type: approve.category,
                          top: app.lnbid,
                          lnbid: approve.lnbid,
                        }),
                      },
                    });
                  }
                });
              }
            });
          } else {
            this.$router.push({ name: "home" });
          }
        } else {
          if (res.alert) {
            // alert("로그인 실패, reason = > " + res.message);
            if (res.count) {
              alert(
                this.GetCommonL.login[res.message]
                  .replace("\\n", "\n")
                  .replace("#count#", res.count)
              );
            } else {
              alert(this.GetCommonL.login[res.message].replace("\\n", "\n"));
            }
          }
          localStorage.setItem("autoLogin", false);
          localStorage.setItem(`${config.packageName}pass`, "");
          this.password = "";
          var firstDot = window.location.hostname.indexOf(".");

          var domain = window.location.hostname.substring(
            firstDot == -1 ? 0 : firstDot + 1
          );
          cookie.remove("LtpaToken", null, domain);
          cookie.remove("language", null, domain);
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
    menuOfCategoryIdx(menu) {
      if (this.categorys) {
        return this.categorys.findIndex(function (item, idx) {
          return item.category == menu;
        });
      }
      return -1;
    },
    ThisCategory(menu) {
      if (this.categorys) {
        return this.categorys[this.menuOfCategoryIdx(menu)];
      }
      return [];
    },
  },
};
</script>

<style>
</style>