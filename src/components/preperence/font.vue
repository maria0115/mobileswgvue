<template>
  <div>
    <Header
      :header="this.GetStyle.setsizefont"
      header_desc="글자 크기 / 글꼴 설정"
    ></Header>
    <div class="content04">
      <form @submit.prevent>
        <ul class="ft_menu">
          <li>
            <p>{{lang.message}}</p>
            <p>{{lang.message2}}</p>
          </li>
          <li class="font-size">
            <strong>{{this.GetStyle.setsize}}</strong>
            <ul>
              <li v-for="(value, name) in this.GetStyle.size" :key="name" @click="setConfig(name, 'size')">
                <span>{{ value }}</span>
                <em :class="{ checked: boosize(name) }"
                  ><b></b></em>
              </li>
            </ul>
          </li>
          <li class="font">
            <strong>{{this.GetStyle.setfont}}</strong>
            <ul>
              <li v-for="(value, name) in this.GetStyle.font" :key="name" @click="setConfig(name, 'font')">
                <span>{{ value }}</span>
                <em :class="{ checked: boo(name) }"
                  ><b></b></em>
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
  created(){
    this.lang = this.GetLanguageConfig.font;
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters("configjs",["GetConfig"]),
    ...mapGetters(["GetStyle","GetLanguageConfig"]),
    // 사용자가 설정한 font class on
    boo() {
      return (font) => {
        if (this.GetConfig.font.font === font) {
          return true;
        }
        return false;
      };
    },
    // 사용자가 설정한 size class on
    boosize() {
      return (size) => {
        if (this.GetConfig.font.size === size) {
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
        menu: "font",
        setting: menu,
        value,
      });
    },
  },
};
</script>

<style>
</style>