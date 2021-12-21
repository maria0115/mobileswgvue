<template>
  <div>
    <Header
      :header="this.GetDisplay.maindisplay"
      header_desc="메인 화면 설정"
    ></Header>
    <div class="contents06">
      <form @submit.prevent>
        <ul class="sc_menu">
          <li>
            <ul>
              <li
                v-for="(value, name) in this.GetDisplay.main"
                :key="name"
                @click="setConfig(name)"
              >
                <span>{{ value }}</span>
                <em :class="{ checked: boo(name) }"></em>
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
  components: {
    Header,
  },
  computed: {
    ...mapGetters("configjs", ["GetConfig"]),
    ...mapGetters(["GetDisplay"]),
    // 사용자가 설정한 구성 class on
    boo() {
      return (display) => {
        if (this.GetConfig.display === display) {
          return true;
        }
        return false;
      };
    },
  },
  methods: {
    // click 시 해당 설정값 db에 입력
    setConfig(value) {
      this.$store.dispatch("configjs/setConfig", {
        menu: "display",
        value: value,
      });
    },
  },
};
</script>

<style>
</style>