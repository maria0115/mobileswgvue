<template>
  <div>
    <div class="sub_header noti">
      <div class="basic_header on">
        <h2>{{ Title }}</h2>
        <div>
          <!-- <span class="e_edit"></span> -->
          <!--관리자 모드일때 노출되어야함-->
          <span class="sub_search"></span>
        </div>
        <span class="sub_ham" @click="OpenHam"></span>
      </div>
      <!--관리자 모드일때 노출되어야함-->
      <!-- <div class="edit_header">
        <h2>
          <img
            class="mail_back"
            src="../../mobile/img/m_edit_icon01.png"
            alt=""
          /><em>1</em>개
        </h2>
        <div>
          <span class="all_btn"></span>
          <span class="trash_btn"></span>
        </div>
      </div> -->
    </div>
    <div class="m_contents02">
      <form @submit.prevent class="formdiv">
        <ul class="board_list">
          <li v-for="(value, index) in lists" :key="index">
            <a @click="Read(value)">
              <!-- <img src="../../mobile/img/img01.png" alt=""> -->
              <span class="basic_img on" v-if="value.author">
                <em class="no_img" :style="randomColor()"
                  ><b>{{ value.author.split("")[0] }}</b></em
                >
              </span>
              <input type="checkbox" class="edit_check" />
              <dl>
                <dt>
                  <span :class="{ new: boo(value) }"></span
                  ><em class="bul_tit" v-if="value.category">{{
                    value.category
                  }}</em
                  >{{ value.subject }}
                </dt>
                <dd>
                  {{ value.author }}<span>{{ transTime(value.created) }}</span
                  ><em class="like" v-if="options.isUseLike">{{
                    value.likecnt
                  }}</em>
                </dd>
              </dl>
              <span :class="{ clip: value.attach }"></span>
            </a>
          </li>
          <Infinite
            @infiniteHandler="infiniteHandler"
            :infiniteId="infiniteId"
          ></Infinite>
        </ul>
      </form>
      <!-- </pull-to> -->
    </div>
    <SubMenu
      :isOpen="isOpen"
      @CloseHam="CloseHam"
      :params="this.params"
    ></SubMenu>
    <Search @SetSearchWord="SetSearchWord"></Search>
    <WBtn :path="path"></WBtn>
    <div class="ac_btns">
      <span class="more_plus"></span>
      <ul>
        <li class="top">
          <a>{{ commonl.up }}</a>
        </li>
        <li v-if="this.Option().boardwrite">
          <!-- @click.native="SetHeader(params)" -->
          <router-link
            class="agree"
            :to="{
              name: 'boardwrite',
              query: { data: JSON.stringify(params) },
            }"
            >{{ lang.write }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SubMenu from "./menu.vue";
import Search from "./search.vue";
import WBtn from "./BtnW.vue";
import { BoardSearch, ListOfCategory } from "../../api/index.js";
import { mapState, mapGetters } from "vuex";

import Infinite from "@/components/common/infinite.vue";

export default {
  async created() {
    this.commonl = this.GetCommonL;

    this.lang = this.GetBoardL.list;
    this.params = JSON.parse(this.$route.query.data);
    this.$store.commit("boardjs/BoardWritePath", this.params.type);

    this.Init();
    if (this.back.isBacked) {
      var res = await this.$store.dispatch("ListOfCategory", this.option);
      // this.$store.dispatch("ListOfCategory", this.option).then((res) => {
      this.lists = res;
      for (var i = 0; i < this.back.page; i++) {
        this.page++;
        this.option.page = this.page;
        var result = await this.$store.dispatch("ListOfCategory", this.option);
        this.lists = this.lists.concat(result);
      }
      this.infiniteId++;
      // window.scroll({ top: this.back.top, behavior: "smooth" });
      this.$forceUpdate();
      var scrollentity = $("html,body");
      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        scrollentity = $("html");
      }
      scrollentity.animate({ scrollTop: this.back.top }, 500);
    } else {
      this.$store.dispatch("ListOfCategory", this.option).then((res) => {
        // this.Init();
        this.lists = res;
        this.$forceUpdate();
      });
    }
    this.$store.commit("SetBack", false);
  },
  beforeDestroy() {
    PullToRefresh.destroyAll();
  },
  mounted() {
    this.setPullTo();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(
      "SetTop",
      document.scrollingElement.scrollTop ||
        window.scrollY ||
        window.pageYOffset
    );

    next();
  },
  components: {
    Infinite,
    SubMenu,
    Search,
    WBtn,
  },
  data() {
    return {
      isOpen: false,
      infiniteId: 0,
      lists: [],
      page: 0,
      option: {},
    };
  },
  computed: {
    ...mapState("mainjs", ["main"]),
    ...mapGetters("boardjs", ["GetBoard", "options"]),
    ...mapGetters("configjs", ["GetConfig"]),
    ...mapGetters(["GetCategory", "GetHeader"]),
    ...mapState(["listOfCategory", "back"]),

    path() {
      // if (this.$route.path.indexOf("custom") === -1) {
      return this.params.type;
      // } else {
      //   return "custom";
      // }
    },
    Title() {
      return this.params.title;
    },
  },
  methods: {
    // TopBtn(){
    //   $('html, body').animate({ scrollTop: 0 }, 400);
    // },
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
    Refresh() {
      this.Init();
      return this.$store.dispatch("ListOfCategory", this.option).then((res) => {
        // this.Init();
        this.lists = res;
        this.$forceUpdate();
        return;
      });
    },
    Init() {
      this.page = 0;
      this.option.page = this.page;
      this.option.category = "board";
      this.option.size = this.GetConfig.listcount;
      this.option.type = this.params.type;
      this.option.lnbid = this.params.lnbid;
      this.option.boardType = this.params.type;
      this.option.searchword = "";
      this.option.searchType = "0";
      this.infiniteId += 1;
      return;
    },
    SetSearchWord({ searchfield, searchword }) {
      this.option.searchword = searchword;
      this.option.searchType = searchfield;
      this.option.page = 0;
      if (searchword.length > 0) {
        this.option.type = "search";

        this.$store.dispatch("boardjs/BoardSearch", this.option).then((res) => {
          this.lists = res;
          this.$forceUpdate();
          this.infiniteInit();
        });
      } else {
        this.option.type = this.params.type;

        this.$store.dispatch("ListOfCategory", this.option).then((res) => {
          this.lists = res;
          this.$forceUpdate();
          this.infiniteId += 1;
          // this.Init();
        });
      }
    },
    Read(value) {
      if (value.unid) {
        var type = this.params.type;
        var menu = undefined;
        if (type == "recent") {
          type = value.boardType;
          menu = value.boardType;
        }
        this.$store.dispatch("boardjs/BoardDetail", {
          menu: menu,
          unid: value.unid,
          type: type,
          lnbid: this.params.lnbid,
          title: this.params.title,
          top: this.params.top,
        });
      }
    },
    // utc 시간 to local 시간
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD HH:mm");
      return localTime;
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    boo(value) {
      var moment = require("moment");
      var localTime = moment.utc(value.created).toDate();
      localTime = parseInt(moment(localTime).format("YYYYMMDD"));
      var nowTime = parseInt(moment().format("YYYYMMDD"));
      if (nowTime - localTime < this.main.my.recentdate) {
        return true;
      }
      return false;
    },
    // 스크롤 페이징
    infiniteHandler($state) {
      if (!this.back.isBacked) {
        this.page++;
        // this.GetMail['inbox_detail'].size+= 1;
        this.option.page = this.page;
        if (this.option.searchword.length > 0) {
          this.option.type = "search";

          this.SearchData(this.option, $state);
        } else {
          this.option.type = this.params.type;

          this.GetData(this.option, $state);
        }
      } else {
        $state.complete();
      }
    },
    SearchData(option, $state) {
      BoardSearch(option)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.timeout = setTimeout(() => {
            if (data) {
              if (data.length > 0) {
                this.$store.commit("SetBackPage", option.page);
              }
              if (this.lists.length > 0) {
                this.lists = this.lists.concat(data);
              } else {
                this.lists = data;
              }
              $state.loaded();

              // 끝 지정(No more data) - 데이터가 EACH_LEN개 미만이면

              if (data / option.size < 1) {
                $state.complete();
              }
            } else {
              // 끝 지정(No more data)

              $state.complete();
            }
          }, 1000);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    GetData(option, $state) {
      ListOfCategory(option)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.timeout = setTimeout(() => {
            if (data) {
              if (data.length > 0) {
                this.$store.commit("SetBackPage", option.page);
              }
              if (this.lists.length > 0) {
                this.lists = this.lists.concat(data);
              } else {
                this.lists = data;
              }
              $state.loaded();

              // 끝 지정(No more data) - 데이터가 EACH_LEN개 미만이면

              if (data / option.size < 1) {
                $state.complete();
              }
            } else {
              // 끝 지정(No more data)

              $state.complete();
            }
          }, 1000);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    OpenHam() {
      this.isOpen = true;
    },
    CloseHam() {
      this.isOpen = false;
    },
    // 사진이 없으면 기본 이미지
    photoError(index) {
      this.GetApproval[this.path].data.data[index].photoerror = false;
    },
  },
};
</script>

<style>
</style>