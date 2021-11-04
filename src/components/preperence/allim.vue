<template>
  <div>
    <Header :header="this.GetAllim.menuallim" header_desc="메뉴별 알림 설정"></Header>
    <div class="content">
      <form @submit.prevent>
        <ul class="allim_menu">
          <li>
            <ul>
              <li v-for="(value, name) in this.GetAllim.menu" :key="name">
                <strong>{{ value }}</strong>
                <span
                  class="toggle_btn"
                  :ref="name"
                  :class="{ on: boo(name) }"
                  @click="setConfig(name)"
                ></span>
              </li>
            </ul>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./header.vue";
export default {
  computed: {
    ...mapGetters("configjs",["GetConfig"]),
    ...mapGetters(["GetAllim"]),
    // 사용자가 설정한 구성 class on
    boo() {
      return (key) => {
        return this.GetConfig.alarm[key];
      };
    },
  },
  components: {
    Header,
  },
  methods: {
    // click 시 해당 설정 true값 db에 입력
    setConfig(menu) {
      var classList = this.$refs[menu][0].classList;
      var value = false;
      for (var i = 0; i < classList.length; i++) {
        if (classList[i] !== "on") {
          value = true;
        }else{
          value = false;
        }
      }
      this.$store.dispatch("configjs/setConfig", {
        menu: "alarm",
        setting: menu,
        value: value,
      });
    },
  },
};
</script>

<style>
</style>