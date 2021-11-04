<template>
  <div>
    <Header
      desc="결재중 문서"
      :title="title"
      :cnt="GetApproval.approving.data.cnt"
      @OpenHam="OpenHam"
    ></Header>
    <SubMenu :isOpen="isOpen" @CloseHam="CloseHam"></SubMenu>
    <div class="a_contents06">
      <form @submit.prevent>
        <ul class="app06_list">
          <li
            v-for="(value, index) in GetApproval.approving.data.data"
            :key="index"
          >
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
                        <i>(결재중)</i>
                      </p>
                      <em v-else-if="v.created && v.created.length > 0">
                        <p>{{ transDate(v.created) }}</p>
                        <p>{{ transTime(v.created) }}</p></em
                      >
                      <p v-else><i>(대기중)</i></p>
                    </div>
                  </div>
                </div>
              </div>
              <span class="close_btn"></span>
            </div>
            <b class="st_more"></b>
          </li>
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
              <!-- @click.native="SetHeader(params)" -->
              <router-link
                :to="{
                  name: `appapproving`,
                  query: { data: JSON.stringify(this.params) },
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
import { mapState, mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import { Approval, AppSearch } from "../../api/index.js";
export default {
  async created() {
    this.params = JSON.parse(this.$route.query.data);
    // this.params = this.GetHeader.menu;
    this.$store.commit("approjs/AppSaveFrom", this.params.type);
    this.lists = this.GetApproval.approving.data.data;
    this.category = this.GetCategory[this.params.top];
    this.Init();

    this.option.page = this.page;
    this.option.type = "approving";
    this.option.size = this.GetConfig.listcount;
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
        this.lists = this.wellconcat(this.lists, result);
      }
      this.infiniteId++;
      this.$store.commit("SetBack", false);
      console.log(this.back.top);
      window.scroll({ top: this.back.top, behavior: "smooth" });
      this.$forceUpdate();
    }
  },
  beforeRouteLeave(to, from, next) {
    // this.infiniteId += 1;
    this.$store.commit("SetTop", document.documentElement.scrollTop);

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
    InfiniteLoading,
  },
  data() {
    return {
      checkbox: [
        { title: "제목" },
        { doc: "서식명" },
        { author: "기안자" },
        { currentapprover: "현재결재자" },
        { date: "기안일자" },
      ],
      morePlus: { write: "결재 작성" },
      isOpen: false,
      title: "결재중 문서",
      infiniteId: 0,
      option: {},
    };
  },
  methods: {
    wellconcat(me, data) {
      if (me) {
        return me.concat(data);
      } else {
        return data;
      }
    },
    Init() {
      this.infiniteId += 1;
      this.page = 0;
      return;
    },
    SetSearchWord(data) {
      this.option = data;
      // this.option.searchType = searchfield;
      this.option.page = 0;
      if (data.keyword.length > 0) {
        this.$store.dispatch("approjs/AppSearch", this.option).then((res) => {
          if (res) {
            this.$forceUpdate();
            this.Init();
          }
        });
      } else {
        this.$store
          .dispatch("approjs/GetApprovalList", this.option)
          .then((res) => {
            if (res) {
              this.$forceUpdate();
              this.Init();
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
          setTimeout(() => {
            if (data) {
              if (data.length > 0) {
                this.$store.commit("SetBackPage", option.page);
              }
              this.lists = this.wellconcat(this.lists, data);

              this.$forceUpdate();

              // } else {
              //   this.lists = data;
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
          setTimeout(() => {
            if (data) {
              if (data.length > 0) {
                this.$store.commit("SetBackPage", option.page);
              }
              this.lists = this.wellconcat(this.lists, data);

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

<style>
</style>