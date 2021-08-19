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
              <em class="no_img" :style="randomColor()"><b>{{ value.author.split("")[0] }}</b></em>
            </span>
            <dl>
              <dt>{{ value.authordept }}</dt>
              <dd><em>{{ value.author }}</em> {{ value.authorposition }}</dd>
            </dl>
          </div>
        </div>
      </div>
      <!-- <span class="load" @click="addApprove" v-if="moreList"
        ><img src="../../mobile/img/down_arrow.png" alt="더보기"
      /></span>
      
    </div> -->
      <span class="app_more"><router-link to="/app/approve"></router-link></span>
    </div>
    <span class="load" @click="addApprove" v-if="moreList"
      >결재할 문서 펼쳐보기<img
        src="../../mobile/img/down_arrow.png"
        alt="더보기"
    /></span>

    <div class="in_box02">
      <strong desc="결재 중 문서"
        >{{ GetMainLanguage.portlet.approval.approving }}
        <em>{{ main.data.approvaltype.approving.more.cnt }}</em></strong
      >
      <div>
        <div
          v-for="(value, name) in main.data.approvaltype.approving.more.data"
          :key="name"
        >
          <div class="s_text">
            <em>{{ value.category }}</em>
            <strong>{{ value.subject }}</strong>
            <p>
              {{ value.approvalinfo[0].author }}
              {{ value.approvalinfo[0].authorposition }}/{{
                value.approvalinfo[0].authordept
              }}
              <span>{{ transTime(value.created) }}</span>
            </p>
            <div class="icons">
              <span class="opin"></span>
              <span
                class="clip"
                v-if="
                  checkEvent === 'mouse' &&
                  value.attachinfo.attachinfo.length > 0 &&
                  value.attachinfo.attachinfo[0] !== ''
                "
                @mousedown="onOpen($event, value, name)"
                @mouseup="onClose($event, value, name)"
              >
              </span>
              <span
                class="clip"
                v-else-if="
                  checkEvent === 'touch' &&
                  value.attachinfo.attachinfo.length > 0 &&
                  value.attachinfo.attachinfo[0] !== ''
                "
                @touchstart="onOpen($event, value, name)"
                @touchend="onClose($event, value, name)"
              >
              </span>
              <em class="tooltip" :class="{ active: tooltipActive(name) }"
                ><strong v-for="(v, i) in tooltipText" :key="i"
                  ><div>{{ `${v}` }}</div></strong
                ></em
              >
            </div>
          </div>
          <div class="paying">
            <div class="pro_bar">
              <span
                class="in_bar"
                :style="{ width: progressBar(value) + '%' }"
              ></span>
            </div>
            <div class="ing">
              <em
                :class="{ active: v.approval }"
                v-for="(v, n) in value.approvalinfo"
                :key="n"
                >{{ v.approvalKind }}</em
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Approval } from "../../api/index.js";
import config from "../../config/config.json";
export default {
  computed: {
    ...mapState(["main", "moreList"]),
    ...mapGetters(["GetMain", "GetMyInfo", "GetMainLanguage"]),
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
      data: {},
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
    addApprove() {
      // var data = {};
      var statedata = this.main.data.approvaltype.approve.more;
      if (Object.keys(this.data).length == 0) {
        // console.log("계속 데이터 넣어주나")
        this.data = this.main.data.approvaltype.approve.more;
      }

      this.data.approvaltype = "approve";
      this.data.size = statedata.size;
      this.data.page = String(parseInt(this.data.page) + 1);
      // console.log(this.data,"여긴 뷰페이지");
      Approval(this.data)
        .then((response) => {
          return response.data.data;
        })
        .then((res) => {
          // console.log(res);
          if (res.length > 0) {
            this.main.data.approvaltype.approve.more.data =
              this.main.data.approvaltype.approve.more.data.concat(res);
          }
          // if(res.length < this.data.size) {
          //   this.$store.commit("MoreList", { list: false });

          // }

          this.page += 1;
          this.$store.dispatch("GetMoreList", { data: this.data });
        })
        .catch((result) => {
          console.log("catch");
        });
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