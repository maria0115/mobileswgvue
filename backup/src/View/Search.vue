<template>
  <div class="wrap btm_b" :class="{ dark: this.color }">
    <div class="se_header">
      <!-- <div class="main_header">
            <span class="ham"><img src="./img/ham_btn.png" alt=""></span>
            <h1 class="logo">
                <a href=""><img src="./img/logo.png" alt="새롬정보시스템로고"></a>
            </h1>
            <div class="allim_btn">
                <span class="allim_icon">
                    <img src="./img/allim_icon.png" alt="알림확인">
                </span>
                <span class="allim_num">2</span>
            </div>
        </div> -->
      <SearchHeader></SearchHeader>
      <div class="menu_bar">
        <div>
          <ul class="tab_menu">
            <li
              :class="[{ active: Category === value.name }]"
              v-for="(value, name) in this.form"
              :key="name"
            >
              <router-link :to="`/search/${value.name}`"
                ><a>{{ language.search.menu[value.name] }}</a></router-link
              >
            </li>
          </ul>
          <span class="se_more"></span>
        </div>
        <ul class="lst_option">
          <li class="clfix">
            <span class="active" @click="Datesearch('gte', 'default')">{{ language.search.filter.all }}</span>
            <span @click="Datesearch('gte', 'now-1d/d')">{{
              language.search.filter.day
            }}</span>
            <span @click="Datesearch('gte', 'now-7d/d')">{{
              language.search.filter.week
            }}</span>
            <span @click="Datesearch('gte', 'now-1M/d')">{{
              language.search.filter.month_1
            }}</span>
            <span @click="Datesearch('gte', 'now-6M/d')">{{
              language.search.filter.month_6
            }}</span>
          </li>
          <li>
            <form action="">
              <strong>{{ language.search.filter.select }}</strong>
              <p>
                <input
                  type="date"
                  class="on"
                  @change="Datesearch('gte', $event.target.value, 'custom')"
                />
                -
                <input
                  type="date"
                  placeholder="2021.03.31"
                  @change="Datesearch('lt', $event.target.value, 'custom')"
                />
              </p>
            </form>
          </li>
        </ul>
      </div>
    </div>
    <div class="content07">
      <router-view></router-view>
    </div>
    <ul class="btm_btn clfix">
      <router-link to="/"><li class="home"><a></a></li></router-link>
      <li class="back"><a href=""></a></li>
      <li class="go"><a href=""></a></li>
      <li class="refresh"><a href=""></a></li>
      <li class="link"><a href=""></a></li>
      <li class="btm_more"><a href=""></a></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchHeader from './SearchHeader.vue'
import $ from "jquery";
export default {
  components: {
    SearchHeader
  },
  computed: {
    ...mapState([
      "systemcolor",
      "data",
      "sortdata",
      "form",
      "config",
      "language",
    ]),
    // 사용자가 설정한 display color
    color() {
      if (this.systemcolor === "dark") {
        return true;
      }
    },
    // 현재 url에 따른 카테고리 값
    Category() {
      return this.$route.path.split("search/")[1];
    },
  },
  data() {
    return {
      oncategory: "allsearch",
    };
  },
  mounted() {
    // dom이 생성된 후 font setting
    $(".wrap").css("font-family", this.config.font.font);
  },
  created() {
    // this.$store.dispatch("GetLanguage", { app: "search" });
  },
  methods: {
    // menu 변경시 검색
    Categorysearch(cate, category) {
      this.$store.dispatch("SearchWord", { category: category });
    },
    // filter 검색
    Datesearch(what, value, kind) {
      var data = { what, value };
      if (
        typeof kind !== "undefined" ||
        typeof kind !== undefined ||
        kind !== null ||
        kind !== ""
      ) {
        data.kind = kind;
      }

      this.$store.dispatch("SearchWord", data);
    },

  },
};
</script>

<style>
</style>