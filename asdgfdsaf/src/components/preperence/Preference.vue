<template>
  <div>
    <Header header="설정" header_desc="설정"></Header>

    <div class="content01">
      <form action="">
        <ul class="st_menu">
          <li>
            <h2>{{ this.GetLanguageConfig.login.setlogin }}</h2>
            <ul>
              <li>
                <strong>{{
                  this.GetLanguageConfig.login.autologin
                }}</strong>
                <span
                  class="toggle_btn"
                  :class="{ on: this.GetConfig.login }"
                  ref="login"
                  @click="setConfig('login')"
                ></span>
              </li>
            </ul>
          </li>
          <li>
            <h2>{{ this.GetLanguageConfig.allim.setallim }}</h2>
            <ul>
              <li>
                <router-link :to="`/setting/alarm`"
                  ><strong>{{
                    this.GetLanguageConfig.allim.menuallim
                  }}</strong>
                </router-link>
              </li>
              <li>
                <strong>{{
                  this.GetLanguageConfig.allim.ettitime
                }}</strong>
                <span
                  class="toggle_btn atiq_btn"
                  :class="{ on: this.GetConfig.etiquette.use }"
                  ref="etiquette"
                  @click="setConfig('etiquette')"
                ></span>
              </li>
              <li
                class="slideup"
                :class="{ active: this.GetConfig.etiquette.use }"
              >
                <router-link :to="`/setting/etiq`">
                  <strong
                    ><em class="start">{{
                      time(this.GetConfig.etiquette.starttime)
                    }}</em>
                    ~
                    <em class="end">{{
                      time(this.GetConfig.etiquette.endtime)
                    }}</em></strong
                  >
                </router-link>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <strong>{{ this.GetLanguageConfig.synch }}</strong>
                <span
                  class="toggle_btn"
                  :class="{ on: this.GetConfig.synchronize }"
                  ref="synchronize"
                  @click="setConfig('synchronize')"
                ></span>
              </li>
            </ul>
          </li>
          <li>
            <h2>{{ this.GetLanguageConfig.display.setdisplay }}</h2>
            <ul>
              <li>
                <router-link :to="`/setting/screen`">
                  <strong>{{
                    this.GetLanguageConfig.display.maindisplay
                  }}</strong>
                  <em>{{
                    this.GetLanguageConfig.display.main[
                      this.GetConfig.display
                    ]
                  }}</em>
                </router-link>
              </li>
              <li>
                <router-link :to="`/setting/num`">
                  <strong>{{
                    this.GetLanguageConfig.display.listcount
                  }}</strong>
                  <em
                    >{{ this.GetConfig.listcount }}
                    <!-- 여기에 문서 수 노출 되어야함--></em
                  >
                </router-link>
              </li>
              <li>
                <router-link :to="``">
                  <strong>{{
                    this.GetLanguageConfig.display.portlet
                  }}</strong>
                </router-link>
              </li>
            </ul>
          </li>
          <li>
            <h2>{{ this.GetLanguageConfig.style.setstyle }}</h2>
            <ul>
              <li>
                <router-link :to="`/setting/font`">
                  <strong>{{
                    this.GetLanguageConfig.style.setfont
                  }}</strong>
                </router-link>
              </li>
              <li>
                <router-link :to="`/setting/dark`">
                  <strong>{{
                    this.GetLanguageConfig.style.setdark
                  }}</strong>
                  <em></em>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Header from "./header.vue";
import $ from "jquery";
export default {
  components: {
    Header,
  },
  // dom 들이 구성이 된 후 font 설정을 위해 mounted 구간에 font 변경
  mounted(){
    $(".wrap").css("font-family", this.GetConfig.font.font);
  },
  computed: {
    ...mapGetters(["GetConfig", "GetLanguageConfig"]),
    // ...mapState(["systemcolor","config"]),
    // 알람시간 tranformat XX:XX pm(am) 
    time() {
      return (time) => {
        var ampm = "pm";
        var hour = time.split(":")[0];
        if (hour < 12) {
          ampm = "am";
        } else {
          if (hour !== "12") {
            hour = parseInt(hour) - 12;
          }
        }
        return ampm + " " + String(hour) + ":" + time.split(":")[1];
      };
    },
  },
  methods: {
    // click 시 해당 설정값 db에 입력
    setConfig(menu) {
      var classarr = this.$refs[menu].getAttribute("class").split(" ");
      var value = false;
      if (classarr[classarr.length - 1] === "on") {
        value = false;
      } else {
        value = true;
      }
      this.$store.dispatch("setConfig", {
        menu: menu,
        value: value,
      });
    },
   
  },
};
</script>

<style>
</style>