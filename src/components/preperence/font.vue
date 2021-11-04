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
            <p>메신저 로그인 화면 개선안</p>
            <p>BI와 ERP데이터 정합성 모니터링 리포트</p>
          </li>
          <li class="font-size">
            <strong>{{this.GetStyle.setsize}}</strong>
            <ul>
              <li v-for="(value, name) in this.GetStyle.size" :key="name">
                <label for="f01" :class="name">{{ value }}</label>
                <span
                  ><input
                    type="radio"
                    name="radio"
                    id="f01"
                    :value="name"
                    :checked="boosize(name)"
                    v-on:input="setConfig($event, 'size')"
                /></span>
              </li>
            </ul>
          </li>
          <li class="font">
            <strong>{{this.GetStyle.setfont}}</strong>
            <ul>
              <li v-for="(value, name) in this.GetStyle.font" :key="name">
                <label for="f04" class="f_s01">{{ value }}</label>
                <span
                  ><input
                    type="radio"
                    name="f_radio"
                    id="f04"
                    :value="name"
                    :checked="boo(name)"
                    v-on:input="setConfig($event, 'font')"
                /></span>
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
    ...mapGetters(["GetStyle"]),
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
    setConfig(event, menu) {
      this.$store.dispatch("configjs/setConfig", {
        menu: "font",
        setting: menu,
        value: event.target.value,
      });
    },
  },
};
</script>

<style>
</style>