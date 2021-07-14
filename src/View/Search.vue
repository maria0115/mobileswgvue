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
                ><a>{{ GetSearchLanguage.menu[value.name] }}</a></router-link
              >
            </li>
          </ul>
          <span class="se_more"></span>
        </div>
        <ul class="lst_option">
          <li class="clfix">
            <span class="active" @click="Datesearch('gte', 'default','default')">{{ GetSearchLanguage.filter.all }}</span>
            <span @click="Datesearch('gte', 'now-1d/d','default')">{{
              GetSearchLanguage.filter.day
            }}</span>
            <span @click="Datesearch('gte', 'now-7d/d','default')">{{
              GetSearchLanguage.filter.week
            }}</span>
            <span @click="Datesearch('gte', 'now-1M/d','default')">{{
              GetSearchLanguage.filter.month_1
            }}</span>
            <span @click="Datesearch('gte', 'now-6M/d','default')">{{
              GetSearchLanguage.filter.month_6
            }}</span>
          </li>
          <li>
            <form action="">
              <strong>{{ GetSearchLanguage.filter.select }}</strong>
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
      <router-link to="/"
        ><li class="home"><a></a></li
      ></router-link>
      <li class="back" @click="RouterBack"><a></a></li>
      <li class="go" @click="RouterGo"><a></a></li>
      <li class="refresh" @click="RouterRefresh"><a></a></li>
      <li class="link" @click="RouterLink"><a></a></li>
      <li class="btm_more"><a></a></li>
    </ul>
  </div>
</template>

<script>
import { mapState,mapGetters } from "vuex";
import SearchHeader from './SearchHeader.vue'
import $ from "jquery";
export default {
  components: {
    SearchHeader
  },
  computed: {
    ...mapState([
      "data",
      "sortdata",
      "form",
    ]),
    ...mapGetters(["GetSystemColor","GetConfig","GetSearchLanguage"]),
    // 사용자가 설정한 display color
    color() {
      if (this.GetSystemColor === "dark") {
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
    $(".wrap").css("font-family", this.GetConfig.font.font);
  },
  created() {
    // console.log(this.GetConfig)
    // font size setting
    if (this.GetConfig.font.size == "small") {
      $("html").addClass("small");
      $("html").removeClass("normal");
      $("html").removeClass("large");
      $("html").removeClass("mar15");
    } else if (this.GetConfig.font.size == "normal") {
      $("html").addClass("normal");
      $("html").removeClass("small");
      $("html").removeClass("large");
      $("html").removeClass("mar15");
    } else if (this.GetConfig.font.size == "large") {
      $("html").addClass("large");
      $("html").removeClass("small");
      $("html").removeClass("normal");
      $("html").addClass("mar15");
      
    }
  },
  methods: {
    // 전 url 이동
    RouterBack() {
      this.$router.go(-1);
    },
    // 후 url 이동
    RouterGo() {
      this.$router.go(1);
    },
    // 새로고침
    RouterRefresh() {
      this.$router.push(this.$route.path);
    },
    RouterLink() {
      console.log("routerlink");
    },
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