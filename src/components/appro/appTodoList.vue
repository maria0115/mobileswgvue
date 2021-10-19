<template>
  <div>
    <Header
      desc="결재할 문서"
      :title="params.title"
      :cnt="GetApproval[this.path].data.cnt"
      @OpenHam="OpenHam"
    ></Header>
    <SubMenu :isOpen="isOpen" @CloseHam="CloseHam"></SubMenu>
    <div class="a_contents06">
      <form action="">
        <ul class="app06_list">
          <swipe-list
            v-if="GetApproval[this.path].data.data"
            ref="list"
            class="card"
            :disabled="!enabled"
            :items="GetApproval[this.path].data.data"
            item-key="id"
          >
            <template v-slot="{ item, index }">
              <li :key="index">
                <a>
                  <span class="basic_img on">
                    <!-- v-if="item.photoerror" -->
                    <img
                      :src="url(item.photo)"
                      @error="photoError(index)"
                      v-if="item.photoerror"
                      alt=""
                    />
                    <em class="no_img" :style="randomColor()" v-if="item.author"
                      ><b>{{ item.author.split("")[0] }}</b></em
                    >
                  </span>
                  <div class="s_text" @click="Read(item)">
                    <em>{{ item.category }}</em>
                    <strong>{{ item.subject }}</strong>
                    <p class="pd_0">
                      <em v-if="item.author"
                        >{{ item.author }} {{ item.authorposition }}/{{
                          item.authordept
                        }}</em
                      ><span>{{ transTime(item.created) }}</span>
                    </p>
                  </div>
                  <div class="icons">
                    <span class="opin"></span>
                    <span class="clip" v-if="item.attach"></span>
                  </div>
                </a>
              </li>
            </template>
            <template v-slot:right="{}">
              <span class="trash_can"></span>
            </template>
          </swipe-list>
          <infinite-loading
            @infinite="infiniteHandler"
            :identifier="infiniteId"
            ref="infiniteLoading"
            spinner="waveDots"
          >
            <div slot="no-more" style="padding: 10px 0px">
              목록의 끝입니다 :)
            </div>
            <div slot="no-results" style="padding: 10px 0px">
              목록의 끝입니다 :)
            </div>
            <div slot="error">
              Error message, click
              <router-link
                :to="{
                  name: `appapprove`,
                  query: {
                    data: JSON.stringify({
                      type: params.type,
                      lnbid: params.lnbid,
                      top: params.top,
                      title: params.title,
                    }),
                  },
                }"
                >here</router-link
              >
              to retry
            </div>
          </infinite-loading>
        </ul>
      </form>
    </div>
    <BtnPlus :menu="morePlus" @BtnClick="BtnClick"></BtnPlus>
    <Search @SetSearchWord="SetSearchWord"></Search>
  </div>
</template>

<script>
import Header from "./header.vue";
import SubMenu from "./menu.vue";
import Search from "./search.vue";
import BtnPlus from "./btnPlus.vue";
import InfiniteLoading from "vue-infinite-loading";
import { mapState, mapGetters } from "vuex";
import { Approval, AppSearch } from "../../api/index.js";
import { SwipeList, SwipeOut } from "vue-swipe-actions";
import config from "../../config/config.json";
import "vue-swipe-actions/dist/vue-swipe-actions.css";
export default {
  created() {
    this.params = JSON.parse(this.$route.query.data);
    this.category = this.GetCategory[this.params.top];
    this.Init();
  },
  components: {
    InfiniteLoading,
    Header,
    SwipeOut,
    SwipeList,
    SubMenu,
    Search,
    BtnPlus,
  },
  beforeRouteLeave(to, from, next) {
    // this.infiniteId += 1;
    next();
  },
  computed: {
    ...mapGetters(["GetCategory"]),

    ...mapGetters("approjs", ["GetApproval"]),
    ...mapGetters("configjs", ["GetConfig"]),
    path() {
      // if (this.$route.path.indexOf("custom") === -1) {

      return this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1);
      // } else {
      //   return "custom";
      // }
    },
  },
  data() {
    return {
      checkbox: [
        { title: "제목" },
        { doc: "서식명" },
        { author: "기안자" },
        { dept: "기안부서" },
        { date: "기안일자" },
      ],
      morePlus: { write: "결재 작성" },
      isOpen: false,
      infiniteId: 0,
      enabled: true,
      title: "결재할 문서",
      option: {},
    };
  },
  methods: {
    Init() {
      this.infiniteId += 1;
      this.page = 0;
      return;
    },
    BtnClick(value) {
      if (value == "write") {
        var caidx = this.category.findIndex((item, idx) => {
          return item.category == "formList_all";
        });
        this.category[caidx].top = this.params.top;
        this.category[caidx].type = this.category[caidx].category;
        this.$router.push({
          name: "appformList_all",
          query: {
            data: JSON.stringify(this.category[caidx]),
          },
        });
      }
    },
    Read(value) {
      value.where = "todoview";
      this.$store.commit("approjs/AppSaveUnid", {
        unid: value.unid,
        openurl: value.openurl,
      });
      this.$router.push({
        name: "approveview",
        query: {
          data: JSON.stringify(this.params),
        },
      });
    },
    SetSearchWord(data) {
      this.option = data;
      // this.option.searchType = searchfield;
      this.option.page = 0;
      this.option.type = this.path;
      if (data.keyword.length > 0) {
        this.$store.dispatch("approjs/AppSearch", this.option).then((res) => {
          if (res) {
            this.$forceUpdate();
            this.Init();
          }
        });
      } else {

        this.$store.dispatch("approjs/GetApprovalList", this.option).then((res) => {
          if (res) {
            this.$forceUpdate();
            this.Init();
          }
        });
      }
    },
    // 스크롤 페이징
    infiniteHandler($state) {
      this.page++;
      // this.GetMail['inbox_detail'].size+= 1;
      this.option.page = this.page;
      this.option.type = this.path;
      this.option.size = this.GetConfig.listcount;

      if (this.option.keyword && this.option.keyword.length > 0) {
        // this.option.type = "search";
        this.SearchData(this.option, $state);
      } else {
        // this.option.type = this.params.type;
        this.GetData(this.option, $state);
      }
    },
    SearchData(option, $state) {
      AppSearch(option)
        .then((response) => {
          if (response.data.data) {
            return response.data.data;
          } else {
            return [];
          }
        })
        .then((data) => {
          setTimeout(() => {
            if (
              this.GetApproval[this.path] &&
              this.GetApproval[this.path].data.data
            ) {
              if (
                Object.keys(this.GetApproval[this.path].data.data).length > 0
              ) {
                this.GetApproval[this.path].data.data =
                  this.GetApproval[this.path].data.data.concat(data);
              } else {
                this.GetApproval[this.path].data.data = data;
              }
              $state.loaded();

              // 끝 지정(No more data) - 데이터가 EACH_LEN개 미만이면

              if (data.length / this.GetConfig.listcount < 1) {
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
      option.approvaltype = option.type;
      Approval(option)
        .then((response) => {
          if (response.data.data) {
            return response.data.data;
          } else {
            return [];
          }
        })
        .then((data) => {
          setTimeout(() => {
            if (
              this.GetApproval[this.path] &&
              this.GetApproval[this.path].data.data
            ) {
              if (
                Object.keys(this.GetApproval[this.path].data.data).length > 0
              ) {
                this.GetApproval[this.path].data.data =
                  this.GetApproval[this.path].data.data.concat(data);
              } else {
                this.GetApproval[this.path].data.data = data;
              }
              $state.loaded();

              // 끝 지정(No more data) - 데이터가 EACH_LEN개 미만이면

              if (data.length / this.GetConfig.listcount < 1) {
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
    // 사진 url
    url(sabun) {
      if (sabun !== undefined && sabun.length > 0) {
        return config.main.photo.replace(/@/g, sabun);
      }
    },
  },
};
</script>

<style>
.trash_can {
  background: #ff743c url(/mobile/img/edit_check.png) center no-repeat;
  background-size: 1.5rem 0.87rem;
}
.app06_list li {
  height: 5.43rem;
  position: relative;
  padding: 0.62rem 1.06rem 0 3.93rem;
}
.app06_list li a {
  display: block;
}
.swipeout-list-item + .swipeout-list-item {
  border-top: 0.06rem solid #e6e6e6;
}
</style>