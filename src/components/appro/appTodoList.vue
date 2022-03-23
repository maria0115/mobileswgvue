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
      <form @submit.prevent class="formdiv">
        <ul class="app06_list">
          <li
            v-for="(item, index) in this.GetApproval[this.path].data.data"
            :key="index"
          >
            <a>
              <span class="basic_img on" v-if="item.author">
                <!-- v-if="item.photoerror" -->
                <img
                  :src="url(item.photo)"
                  @error="photoError(index)"
                  v-if="item.photoerror"
                  alt=""
                />
                <em class="no_img" :style="randomColor()"
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
                <span class="opin" v-if="item.isComment"></span>
                <span class="clip" v-if="item.attach"></span>
              </div>
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
    <BtnPlus :menu="morePlus" @BtnClick="BtnClick"></BtnPlus>
    <Search @SetSearchWord="SetSearchWord"></Search>
  </div>
</template>

<script>
import Header from "./header.vue";
import SubMenu from "./menu.vue";
import Search from "./search.vue";
import BtnPlus from "./btnPlus.vue";
import Infinite from "@/components/common/infinite.vue";
import { mapState, mapGetters } from "vuex";
import { Approval, AppSearch } from "../../api/index.js";
import { SwipeList, SwipeOut } from "vue-swipe-actions";
import config from "../../config/config.json";
import "vue-swipe-actions/dist/vue-swipe-actions.css";
export default {
  async created() {
    const language = this.GetAppL.todolist;
    this.commonl = this.GetCommonL;
    this.morePlus = {};
    this.morePlus.write = language.morePlus.write;
    if (!this.Option().appWrite) {
      this.morePlus = {};
    }
    this.params = JSON.parse(this.$route.query.data);
    // this.params = this.GetHeader.menu;
    this.$store.commit("approjs/AppSaveFrom", this.params.type);
    this.category = this.GetCategory[this.params.top];
    this.appInit();

    if (this.back.isBacked) {
      for (var i = 0; i < this.back.page; i++) {
        this.page++;
        this.option.page = this.page;
        var result;
        if (this.option.keyword && this.option.keyword.length > 0) {
          result = await AppSearch(this.option);
          result = result.data.data;
        } else {
          this.option.approvaltype = this.option.type;
          result = await Approval(this.option);
          result = result.data.data;
        }
        this.GetApproval[this.path].data.data = this.wellconcat(
          this.GetApproval[this.path].data.data,
          result
        );
      }
      this.infiniteId++;
      this.$forceUpdate();
      // window.scroll({ top: this.back.top, behavior: "smooth" });
      var scrollentity = $("html,body");
      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        scrollentity = $("html");
      }
      scrollentity.animate({ scrollTop: this.back.top }, 500);
    }
    this.$store.commit("SetBack", false);
  },
  beforeDestroy() {
    PullToRefresh.destroyAll();
  },
  mounted() {
    this.setPullTo();
  },
  components: {
    Infinite,
    Header,
    SwipeOut,
    SwipeList,
    SubMenu,
    Search,
    BtnPlus,
  },
  beforeRouteLeave(to, from, next) {
    // this.infiniteId += 1;
    this.$store.commit(
      "SetTop",
      document.scrollingElement.scrollTop ||
        window.scrollY ||
        window.pageYOffset
    );

    next();
  },
  computed: {
    ...mapGetters(["GetCategory", "GetHeader"]),

    ...mapGetters("approjs", ["GetApproval"]),
    ...mapGetters("configjs", ["GetConfig"]),
    ...mapState(["back"]),

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
      morePlus: {
        write: "결재 작성",
      },
      isOpen: false,
      infiniteId: 0,
      enabled: true,
      option: {},
    };
  },
  methods: {
    Refresh() {
      this.appInit();
      return this.$store
        .dispatch("approjs/GetApprovalList", { type: this.path })
        .then((res) => {
          return;
        });
    },
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },

    BtnClick(value) {
      if (value == "write") {
        var caidx = this.category.findIndex((item, idx) => {
          return item.category == "formList_all";
        });
        this.category[caidx].top = this.params.top;
        this.category[caidx].type = this.category[caidx].category;
        // this.SetHeader(this.category[caidx]);
        this.$router.push({
          name: "appformList_all",
          query: { data: JSON.stringify(this.category[caidx]) },
        });
      }
    },
    Read(value) {
      value.where = "todoview";
      this.$store.commit("approjs/AppSaveUnid", {
        unid: value.unid,
        openurl: value.openurl,
      });
      // this.SetHeader(this.params);

      this.$router.push({
        name: "approveview",
        query: { data: JSON.stringify(this.params) },
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
            this.infiniteInit();
          }
        });
      } else {
        this.$store
          .dispatch("approjs/GetApprovalList", this.option)
          .then((res) => {
            if (res) {
              this.$forceUpdate();
              this.infiniteInit();
            }
          });
      }
    },
    wellconcat(me, data) {
      if (me) {
        return me.concat(data);
      } else {
        return data;
      }
    },
    // 스크롤 페이징
    infiniteHandler($state) {
      if (!this.back.isBacked) {
        this.page++;
        // this.GetMail['inbox_detail'].size+= 1;
        this.option.page = this.page;
        // this.option.type = this.path;
        // this.option.size = this.GetConfig.listcount;

        if (this.option.keyword && this.option.keyword.length > 0) {
          // this.option.type = "search";
          this.SearchData(this.option, $state);
        } else {
          // this.option.type = this.params.type;
          this.GetData(this.option, $state);
        }
      } else {
        $state.complete();
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
          this.timeout = setTimeout(() => {
            if (data) {
              if (data.length > 0) {
                this.$store.commit("SetBackPage", option.page);
              }
              // if (this.GetApproval[this.path].data.data.length > 0) {
              this.GetApproval[this.path].data.data = this.wellconcat(
                this.GetApproval[this.path].data.data,
                data
              );
              this.$forceUpdate();
              // } else {
              //   this.GetApproval[this.path].data.data = data;
              // }
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
      // console.log("여긴가")
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
          this.timeout = setTimeout(() => {
            if (data) {
              if (data.length > 0) {
                this.$store.commit("SetBackPage", option.page);
              }
              // if (this.GetApproval[this.path].data.data.length > 0) {
              this.GetApproval[this.path].data.data = this.wellconcat(
                this.GetApproval[this.path].data.data,
                data
              );

              this.$forceUpdate();
              // } else {
              //   this.GetApproval[this.path].data.data = data;
              // }
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
/* .app06_list li {
  height: 5.43rem;
  position: relative;
  padding: 0.62rem 1.06rem 0 3.93rem;
  /* border-top: 0.06rem solid #e6e6e6;
  border-bottom: 0.06rem solid #e6e6e6; 
  margin-top: -0.062rem;
} 
/* .app06_list li:nth-child(1){border-top:} */

.app06_list li a {
  display: block;
}
.swipeout-list-item + .swipeout-list-item {
  border-top: 0.06rem solid #e6e6e6;
}
</style>