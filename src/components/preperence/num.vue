<template>
  <div>
    <Header :header="this.GetDisplay.listcount" header_desc="목록 문서 수 설정"></Header>
    <div class="contents05">
      <form @submit.prevent>
        <ul class="num_menu">
          <li>
            <ul>
              <li v-for="(value, name) in this.GetDisplay.list" :key="name" @click="setConfig(Object.keys(value)[0])">
                <span>{{ value[Object.keys(value)[0]] }}</span>
                <em
                  :class="{ checked: boo(Object.keys(value)[0]) }"
                ></em>
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
    ...mapGetters("configjs",["GetConfig"]),
    ...mapGetters(["GetDisplay"]),
    // 사용자가 설정한 구성 class on
    boo() {
      return (num) => {
        if (this.GetConfig.listcount === num) {
          return true;
        }
        return false;
      };
    },
  },
  methods: {
    // click 시 해당 설정값 db에 입력
    setConfig(value) {
      // alert(event.target.value,"event.target.value")
      this.$store.dispatch("configjs/setConfig", {
        menu: "listcount",
        value,
      });
    },
  },
};
</script>

<style>
</style>