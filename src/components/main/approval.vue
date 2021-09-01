<template>
  <div id="app_tab">
    <div class="in_box01">
      <strong desc="결재할 문서"
        >{{ GetMainLanguage.portlet.approval.approve
        }}<em>{{ main.data.approvaltype.approve.more.cnt }}</em></strong
      >
      <div class="app_list01 clfix">
        <p v-show="main.data.approvaltype.approve.more.data.length === 0">
          결재할 문서가 없습니다.
        </p>
        <div
          v-show="main.data.approvaltype.approve.more.data.length > 0"
          v-for="(value, name) in main.data.approvaltype.approve.more.data"
          :key="name"
        >
          <div class="icons">
            <span class="opin"></span>
            <span class="clip"></span>
          </div>
          <em>{{ value.category }}</em>
          <strong>{{ value.subject }}</strong>
          <p>{{ transTime(value.created) }}</p>
          <div class="per_info clfix">
            <span class="basic_img on">
              <em class="no_img" :style="randomColor()"
                ><b>{{ value.author.split("")[0] }}</b></em
              >
            </span>
            <dl>
              <dt>{{ value.authordept }}</dt>
              <dd>
                <em>{{ value.author }}</em> {{ value.authorposition }}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <!-- <span class="load" @click="addApprove" v-if="moreList"
        ><img src="../../mobile/img/down_arrow.png" alt="더보기"
      /></span>
      
    </div> -->
      <span class="app_more"
        ><router-link to="/approval_more/approve"></router-link
      ></span>
    </div>
    <span class="load" @click="addApprove('approve')" v-if="moreList.approve"
      >결재할 문서 펼쳐보기<img
        src="../../mobile/img/down_arrow.png"
        alt="더보기"
    /></span>

    <div class="in_box02">
      <strong
        >{{ GetMainLanguage.portlet.approval.approving }}
        <em>{{ main.data.approvaltype.approving.more.cnt }}</em></strong
      >
      <div class="app_list01" v-for="(value, name) in main.data.approvaltype.approving.more.data"
          :key="name">
        <div>
          <div class="icons">
            <span class="opin"></span>
            <span
              class="clip"
              v-if="
                value.attachinfo.attachinfo.length > 0 &&
                value.attachinfo.attachinfo[0] !== ''
              "
            ></span>
          </div>
          <em>{{ value.category }}</em>
          <strong>{{ value.subject }}</strong>
          <div class="per_info clfix">
            <span class="basic_img on">
              <em class="no_img" :style="randomColor()"><b>{{ value.approvalinfo[0].author.split("")[0] }}</b></em>
            </span>
            <dl>
              <dt>
                {{ value.approvalinfo[0].authordept }}
                {{ value.approvalinfo[0].author }}
                {{ value.approvalinfo[0].authorposition }}
              </dt>
              <dd>{{ transTime(value.created) }}</dd>
            </dl>
          </div>
          <div class="counter">
            <em>{{ value.approved }}</em
            >/<span>{{ value.totalApprover }}</span>
          </div>
        </div>
      </div>
      <span class="app_more"><router-link to="/approval_more/ing"></router-link
      ></span>
    </div>
    <span
      class="load"
      @click="addApprove('approving')"
      v-if="moreList.approving"
      >결재중 문서 펼쳐보기<img
        src="../../mobile/img/down_arrow2.png"
        alt="더보기"
    /></span>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Approval } from "../../api/index.js";
import config from "../../config/config.json";
export default {
  computed: {
    ...mapState("mainjs", ["main", "moreList"]),
    ...mapGetters("mainjs", ["GetMain", "GetMyInfo"]),
    ...mapGetters(["GetMainLanguage"]),
  },
  created() {},
  mounted() {
    if ("ontouchstart" in document.documentElement !== true) {
      this.checkEvent = "mouse";
    }
  },
  data() {
    return {
      active: false,
      tooltipText: [""],
      checkEvent: "touch",
      tooltipActiveIndex: -1,
      data: {
        approve:{},
        approving:{}
      },
    };
  },
  methods: {
    // 툴팁 활성화 될 list 확인
    tooltipActive(index) {
      if (this.tooltipActiveIndex === index) {
        return true;
      }
      return false;
    },
    // 툴팁 활성화
    onOpen(e, value, index) {
      this.tooltipText = value.attachinfo.attachinfo;
      this.tooltipActiveIndex = index;
    },
    // 툴팁 비활성화
    onClose(e, value, index) {
      this.tooltipActiveIndex = -1;
    },
    // 사진 url
    url(sabun) {
      return config.main.photo.replace(/@/g, sabun);
    },
    // 결재 중 문서 진행률
    progressBar(value) {
      var percent = ((value.approved - 1) / (value.totalApprover - 1)) * 100;
      if (percent === 0) {
        percent = 1;
      }

      return percent;
    },
    // utc time to local time and transformat
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD HH:mm");
      return localTime;
    },
    // 결재 할 문서 더보기 누를 때의 현재 데이터와 다음페이지 데이터 concat
    addApprove(value) {
      // var data = {};
      var statedata = this.main.data.approvaltype[value].more;
      if (Object.keys(this.data[value]).length == 0) {
        //
        this.data[value] = this.main.data.approvaltype[value].more;
      }

      this.data[value].approvaltype = value;
      this.data[value].size = statedata.size;
      this.data[value].page = String(parseInt(this.data[value].page) + 1);
      //
      Approval(this.data[value])
        .then((response) => {
          return response.data.data;
        })
        .then((res) => {
          //
          if (res.length > 0) {
            this.main.data.approvaltype[value].more.data =
              this.main.data.approvaltype[value].more.data.concat(res);
          }
          // if(res.length < this.data.size) {
          //   this.$store.commit("MoreList", { list: false });

          // }

          this.page += 1;
          this.$store.dispatch(
            "mainjs/GetMoreList",
            { data: this.data[value] },
            { root: true }
          );
        })
        .catch((result) => {});
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
  },
};
</script>

<style>
</style>