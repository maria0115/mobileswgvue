<template>
  <div>
    <Header
      desc="결재중 문서"
      :title="this.params.title"
      :cnt="GetApproval.approving.data.cnt"
      @OpenHam="OpenHam"
    ></Header>
    <SubMenu :isOpen="isOpen" @CloseHam="CloseHam"></SubMenu>
    <div class="a_contents06">
      <form @submit.prevent class="formdiv">
        <ul class="app06_list">
          <li
            v-for="(value, index) in GetApproval.approving.data.data"
            :key="index"
          >
            <div>
              <a>
                <span class="ing_sta">
                  <em
                    class="active"
                    v-if="value.approved < value.approvalinfo.length"
                    >{{ value.approvalinfo[value.approved].approvalKind }}</em
                  >
                  <em class="active" v-else>{{
                    value.approvalinfo[value.approved - 1].approvalKind
                  }}</em>
                </span>
                <div class="s_text" @click="Read(value)">
                  <em>{{ value.category }}</em>
                  <strong>{{ value.subject }}</strong>
                  <p>
                    {{ value.approvalinfo[0].author }}
                    {{ value.approvalinfo[0].position }}/{{
                      value.approvalinfo[0].authordept
                    }}<span>{{ transDate(value.created) }}</span>
                  </p>
                </div>
                <div class="icons">
                  <span class="opin" v-if="value.coment"></span>
                  <span class="clip" v-if="value.attach"></span>
                </div>
              </a>
              <b class="st_more"></b>
            </div>
            <div class="app_status">
              <div class="status">
                <div class="status_slide">
                  <div
                    v-for="(v, i) in value.approvalinfo"
                    :key="i"
                    :class="{ active: v.approval }"
                  >
                    <em>{{ v.approvalKind }}</em>
                    <span class="basic_img on"
                      >{{ v }}
                      <img
                        :src="v.photo"
                        @error="
                          $event.target.src = '../../mobile/img/img03.png'
                        "
                        alt=""
                      />
                      <!-- :src="v.photo"
                    @error="$event.target.src = '../../mobile/img/img03.png'"
                    alt="" -->
                      <!-- <img :src="url(item.photo)"
                @error="photoError(index)"
                v-if="item.photoerror" alt="" /> -->
                      <em class="no_img"
                        ><b>{{ v.author.split("")[0] }}</b></em
                      >
                    </span>
                    <dl>
                      <dt>
                        <b>{{ v.author }}</b> {{ v.authorposition }}
                      </dt>
                      <dd>{{ v.authordept }}</dd>
                    </dl>
                    <div>
                      <p v-if="v.approval">
                        <i>({{ language.apping }})</i>
                      </p>
                      <em v-else-if="v.created && v.created.length > 0">
                        <p>{{ transDate(v.created) }}</p>
                        <p>{{ transTime(v.created) }}</p></em
                      >
                      <p v-else>
                        <i>({{ language.wating }})</i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <span class="close_btn"></span>
            </div>
          </li>
          <Infinite
            @infiniteHandler="infiniteHandler"
            :infiniteId="infiniteId"
          ></Infinite>
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
import { mapState, mapGetters } from "vuex";
import Infinite from "@/components/common/infinite.vue";
import { Approval, AppSearch } from "../../api/index.js";
export default {
  async created() {
    this.commonl = this.GetCommonL;
    this.language = this.GetAppL.inglist;
    this.morePlus = this.language.morePlus;
    this.title = this.language.title;
    if (!this.Option().appWrite) {
      this.morePlus = {};
    }
    this.params = JSON.parse(this.$route.query.data);
    // this.params = this.GetHeader.menu;
    this.$store.commit("approjs/AppSaveFrom", this.params.type);
    // this.GetApproval.approving.data.data = this.GetApproval.approving.data.data;
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
        this.GetApproval.approving.data.data = this.wellconcat(
          this.GetApproval.approving.data.data,
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
      return this.$route.path.substring(this.$route.path.indexOf("/", 1) + 1);
      // } else {
      //   return "custom";
      // }
    },
  },
  components: {
    Header,
    SubMenu,
    Search,
    BtnPlus,
    Infinite,
  },
  data() {
    return {
      isOpen: false,
      infiniteId: 0,
      option: {},
    };
  },
  methods: {
    Refresh() {
      return this.$store
        .dispatch("approjs/GetApprovalList", { type: "approving" })
        .then((res) => {
          this.appInit();
          return;
        });
    },
    wellconcat(me, data) {
      if (me) {
        return me.concat(data);
      } else {
        return data;
      }
    },
    SetSearchWord(data) {
      this.option = data;
      // this.option.searchType = searchfield;
      this.option.page = 0;
      this.option.type = "approving";
      if (data.keyword.length > 0) {
        this.$store.dispatch("approjs/AppSearch", this.option).then((res) => {
          if (res) {
            this.infiniteInit();
            this.$forceUpdate();
          }
        });
      } else {
        this.$store
          .dispatch("approjs/GetApprovalList", this.option)
          .then((res) => {
            if (res) {
              this.infiniteInit();
              this.$forceUpdate();
            }
          });
      }
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
    // utc 시간 to local 시간
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD HH:mm");
      return localTime;
    },
    OpenHam() {
      this.isOpen = true;
    },
    CloseHam() {
      this.isOpen = false;
    },
    // 스크롤 페이징
    infiniteHandler($state) {
      console.log(this.option)
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
      // option.approvaltype = option.type;
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
              this.GetApproval.approving.data.data = this.wellconcat(
                this.GetApproval.approving.data.data,
                data
              );

              this.$forceUpdate();

              // } else {
              //   this.GetApproval.approving.data.data = data;
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
              this.GetApproval.approving.data.data = this.wellconcat(
                this.GetApproval.approving.data.data,
                data
              );

              this.$forceUpdate();

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
    transDate(created) {
      var moment = require("moment");
      var localTime = moment.utc(created).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD");
      return localTime;
    },
    transTime(created) {
      var moment = require("moment");
      var localTime = moment.utc(created).toDate();
      localTime = moment(localTime).format("HH:mm");
      return localTime;
    },
    Read(value) {
      value.where = "ingview";

      this.$store.commit("approjs/AppSaveUnid", {
        unid: value.unid,
        openurl: value.openurl,
      });
      // console.log(this.params)
      // this.SetHeader(this.params);
      this.$router.push({
        name: "approvingview",
        query: { data: JSON.stringify(this.params) },
      });
    },
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
  },
};
</script>

<style scoped>
.app06_list li {
  padding: 0 !important;
  height: auto !important;
}
.app06_list li > div:nth-child(1) {
  height: 5.43rem;
  position: relative;
  padding: 0.62rem 1.06rem 0 3.93rem;
}
.app_status {
  position: relative;
  width: 100%;
  height: 0;
  background: #ebebeb;
  z-index: 2;
  overflow: hidden;
  padding: 0 1.87rem;
}
.app_status.active {
  height: 100%;
}

.dark .app_status {
  background: #232323;
}
.dark .status_slide > div > em:after {
  border-color: #959595;
}
.dark .status_slide > div.active > em:after {
  border-color: #ff743c;
}
.dark .status_slide > div dt {
  color: #c4c7ca;
}
.dark .status_slide > div dt b {
  color: #f2f2f2;
}
.dark .status_slide > div dd {
  color: #c4c7ca;
}
.dark .status_slide > div p {
  color: #c4c7ca;
}
.dark .status_slide > div p i {
  color: #c4c7ca;
}
.dark .close_btn {
  background: url(/mobile/img/main_sub_close_d.png) center no-repeat;
  background-size: 100% 100%;
}
</style>