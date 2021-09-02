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
      <form action="">
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
                  }}<span>{{ transTime(value.created) }}</span>
                </p>
              </div>
              <div class="icons">
                <span class="opin" v-if="value.coment"></span>
                <span class="clip" v-if="value.attachinfo.attach"></span>
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
                    <span class="basic_img on">
                      <img src="../../mobile/img/img01.png" alt="" />
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
                        {{ v.approvalKind }}<i>(결재중)</i>
                      </p>
                      <em v-else-if="v.created.length>0">
                        <p>{{transDate(v.created)}}</p>
                        <p>{{transTime(v.created)}}</p></em
                      >
                      <p v-else>{{ v.approvalKind }}<i>(대기중)</i></p>
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
              <router-link to="/app/ing">here</router-link> to retry
            </div>
          </infinite-loading>
        </ul>
      </form>
    </div>
    <BtnPlus :menu="morePlus"></BtnPlus>
    <Search></Search>
  </div>
</template>

<script>
import Header from "./header.vue";
import SubMenu from "./menu.vue";
import Search from "./search.vue";
import BtnPlus from "./btnPlus.vue";
import { mapState, mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import { Approval } from "../../api/index.js";
export default {
  created() {
    this.infiniteId += 1;
  },
  beforeRouteLeave(to, from, next) {
    this.infiniteId += 1;
    next();
  },
  computed: {
    ...mapGetters("approjs", ["GetApproval"]),
    ...mapGetters("configjs", ["GetConfig"]),

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
      morePlus: [
        { return: "회수" },
        { view: "원문 보기" },
        { write: "결재 작성" },
      ],
      isOpen: false,
      title: "결재중 문서",
      infiniteId: 0,
    };
  },
  methods: {
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
      this.GetApproval.approving.page = String(
        parseInt(this.GetApproval.approving.page) + 1
      );
      // this.GetMail['inbox_detail'].size+= 1;
      var option = {};

      option = this.GetApproval.approving;
      option.approvaltype = "approving";
      option.size = this.GetConfig.listcount;
      this.GetData(option, $state);
    },
    GetData(option, $state) {
      Approval(option)
        .then((response) => {
          return response.data.data;
        })
        .then((data) => {
          setTimeout(() => {
            if (data) {
              if (
                Object.keys(this.GetApproval.approving.data.data).length > 0
              ) {
                this.GetApproval.approving.data.data =
                  this.GetApproval.approving.data.data.concat(data);
              } else {
                this.GetApproval.approving.data.data = data;
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
    transDate(created){
      var moment = require("moment");
      var localTime = moment.utc(created).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD");
      return localTime;
    },
    transTime(created){
      var moment = require("moment");
      var localTime = moment.utc(created).toDate();
      localTime = moment(localTime).format("HH:mm:ss");
      return localTime;
    },
    Read(value) {
      value.where = "ingview";
      this.$store.commit("approjs/AppSaveUnid",{unid:value.unid});
      this.$router.push("/approval_more/ingview");

    },
  },
};
</script>

<style>
</style>