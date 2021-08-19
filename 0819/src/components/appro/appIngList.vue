<template>
  <div>
    <Header desc="결재중 문서" :title="title" @OpenHam="OpenHam"></Header>
    <SubMenu :isOpen="isOpen" @CloseHam="CloseHam"></SubMenu>
    <div class="a_contents06">
      <form action="">
        <ul class="app06_list">
          <li v-for="(value,index) in GetApproval.approving.data.data" :key="index">
            <a href="./mob_app_ingview.html">
              <span class="ing_sta">
                <em class="active" v-if="value.approved<value.approvalinfo.length">{{value.approvalinfo[value.approved].approvalKind}}</em>
                <em class="active" v-else>{{value.approvalinfo[value.approved-1].approvalKind}}</em>
              </span>
              <div class="s_text">
                <em>{{value.category}}</em>
                <strong>{{value.subject}}</strong>
                <p>{{value.approvalinfo[0].author}} {{value.approvalinfo[0].position}}/{{value.approvalinfo[0].authordept}}<span>{{transTime(value.created)}}</span></p>
              </div>
              <div class="icons">
                <span class="opin" v-if="value.coment"></span>
                <span class="clip" v-if="value.attachinfo.attach"></span>
              </div>
            </a>
            <div class="app_status">
              <ul aclass="clfix">
                <li v-for="(v,i) in value.approvalinfo" :key="i" class="active">
                  <em>{{v.approvalKind}}</em>
                  <span class="basic_img on">
                    <!-- <img src="../../mobile/img/img01.png" alt="" /> -->
                    <em class="no_img"><b>{{v.author.split("")[0]}}</b></em>
                  </span>
                  <dl>
                    <dt><b>{{v.author}}</b> {{v.authorposition}}</dt>
                    <dd>{{v.authordept}}</dd>
                  </dl>
                </li>
              </ul>
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
    ...mapGetters(["GetApproval"]),
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
      morePlus: [{ return: "회수" }, { approverchange: "결재자 변경" }],
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
      this.GetData(option, $state);
    },
    GetData(option, $state) {
      console.log(option, "option");

      Approval(option)
        .then((response) => {
          return response.data.data;
        })
        .then((data) => {
            console.log(data)
          setTimeout(() => {
              console.log(this.GetApproval.approving,"setTimeout")
            if (data) {
              if (
                Object.keys(this.GetApproval.approving.data.data).length > 0
              ) {
                this.GetApproval.approving.data.data =
                  this.GetApproval.approving.data.data.concat(data);
              } else {
                this.GetApproval.approving.data.data = data;
              }
              console.log(data)
              $state.loaded();

              // 끝 지정(No more data) - 데이터가 EACH_LEN개 미만이면

              if (data.length / this.GetApproval.approving.size < 1) {
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
  },
};
</script>

<style>
</style>