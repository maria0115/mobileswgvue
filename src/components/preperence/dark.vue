<template>
  <div>
    <Header
      :header="this.GetStyle.setdark"
      header_desc="다크모드 설정"
    ></Header>
    <div class="contents02">
      <form @submit.prevent>
        <ul class="dark_menu">
          <li>
            <ul>
              <li
                v-for="(value, name) in this.GetStyle.dark"
                :key="name"
                @click="setConfig(name)"
              >
                <span>{{ value }}</span>
                <!-- <span
                  type="radio"
                  name="d_radio"
                  id="md01"
                  :value="name"
                  :checked="boo(name)"
                  v-on:input="setConfig($event)"
                ></span> -->

                <em :class="{ checked: boo(name) }"></em>
                <!-- <span @click="setConfig2(name)">test</span> -->
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
    ...mapGetters(["GetStyle"]),
    // 사용자가 설정한 구성 class on
    boo() {
      return (mode) => {
        if (this.GetConfig.mode === mode) {
          return true;
        }
        return false;
      };
    },
  },
  methods: {
    // click 시 해당 설정값 db에 입력
    setConfig(value, menu) {
      this.$store.dispatch("configjs/setConfig", {
        menu: "mode",
        setting: menu,
        value,
      });
    },
    setConfig2(val, menu) {
      console.log(val);
      this.$store.dispatch("configjs/setConfig", {
        menu: "mode",
        setting: menu,
        value: val,
      });
    },
  },
};
</script>

<style>
</style>