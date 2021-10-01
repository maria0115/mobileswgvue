<template>
  <div class="m_app_ing">
    <strong desc="결재 중 문서">{{ portlet.approval.approving }}</strong>
    <em class="tooltip" :class="{ active: active }"
      ><strong v-for="(value, name) in tooltipText" :key="name"
        ><div>{{ `${value}` }}</div></strong
      ></em
    >
    <div class="app_slide">
      <VueSlickCarousel
        v-bind="settings"
        v-if="main.data.approvaltype.approving.my.data.length > 0"
      >
        <div
          v-for="(value, name) in main.data.approvaltype.approving.my.data"
          :key="name"
          @click="Read(value, 'ingview')"
        >
          <div class="icons">
            <span class="opin"></span>
            <span
              class="clip"
              v-if="
                checkEvent === 'mouse' &&
                value.attach
              "
              @mousedown="onOpen($event, value)"
              @mouseup="onClose($event, value)"
            >
            </span>
            <span
              class="clip"
              v-else-if="
                checkEvent === 'touch' &&
                value.attach
              "
              @touchstart="onOpen($event, value)"
              @touchend="onClose($event, value)"
            >
            </span>
          </div>
          <em>{{ value.category }}</em>
          <strong>{{ value.subject }}</strong>
          <div class="per_info clfix">
            <span class="basic_img on">
              <em class="no_img" :style="randomColor()"
                ><b>{{ nowApprover(value).author.split("")[0] }}</b></em
              >
            </span>
            <dl>
              <dt>
                {{ nowApprover(value).authorposition }}
                {{ nowApprover(value).author }}
                {{ nowApprover(value).authordept }}
              </dt>
              <dd>{{ transTime(value.created) }}</dd>
            </dl>
          </div>
          <div class="counter">
            <em>{{ value.approved }}</em
            >/<span>{{ value.totalApprover }}</span>
          </div>
          <ul class="m_paying">
            <li
              :class="{ active: dotActive(value, n) }"
              v-for="(v, n) in value.approvalinfo"
              :key="n"
            >
              <span><b></b></span>
              <em>{{ v.approvalKind }}</em>
            </li>
          </ul>
        </div>
      </VueSlickCarousel>
    </div>
    <router-link :to="{name:'apping'}"
      ><span class="m_more"><a></a></span
    ></router-link>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
// import "vue-slick-carousel/dist/vue-slick-carousel.css";
// import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
// import Slick from "vue-slick";

import { mapState } from "vuex";
export default {
  created() {},
  components: { VueSlickCarousel },
  computed: {
    ...mapState("mainjs", ["main"]),
  },
  mounted() {
    // 모바일인지 확인
    if ("ontouchstart" in document.documentElement !== true) {
      this.checkEvent = "mouse";
    }
  },
  data() {
    return {
      active: false,
      tooltipText: [""],
      checkEvent: "touch",
      settings: {
        slidesToShow: 1,
        arrows: false,
        dots: true,
        touchMove: true,
      },
    };
  },
  props: ["portlet"],
  methods: {
    // 현재 결재 대상자
    nowApprover(value) {
      var info = value.approvalinfo;
      for (var i = 0; i < info.length; i++) {
        if (info[i].approval) {
          return info[i];
        }
      }
    },
    // 툴팁 활성화
    onOpen(e, value) {
      // var attachInfoArr =
      this.tooltipText = value.attachinfo.attachinfo;
      // for (var i = 0; i < attachInfoArr.length; i++) {
      //   this.tooltipText += `${attachInfoArr[i]}9999999999999999999999999999\n` ;
      // }
      this.active = true;
    },
    // 툴팁 비활성화
    onClose(e, value) {
      this.active = false;
    },
    // main 결재중문서 진행사항 active
    dotActive(value, index) {
      var active = false;
      if (value.approved - 1 === index) {
        active = true;
      }

      return active;
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
    Read(value, where) {
      value.where = where;
      this.$store.commit("approjs/AppSaveUnid", { unid: value.unid ,openurl:value.openurl});
      this.$router.push(`approval/${where}`);
    },
  },
};
</script>

<style>
/* .tooltip{white-space:pre} */

.app_slide .slick-slide {
  position: relative;
  height: 7.81rem;
  border: 0.06rem solid #e1e1e1;
  padding: 0.93rem 0.81rem 0.68rem;
  font-size: 0;
}
.app_slide .slick-slide div div > em {
  display: inline-block;
  padding: 0 0.31rem;
  height: 1.25rem;
  border-radius: 0.12rem;
  border: 0.06rem solid #ff743c;
  font-size: 0.87rem;
  color: #ff743c;
  vertical-align: top;
}
.app_slide .slick-slide div div > strong {
  display: block !important;
  font-size: 1rem !important;
  color: #000;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.2 !important;
  font-weight: 600 !important;
  white-space: nowrap;
  margin-top: 0.5rem;
}

.app_slide .slick-slide .per_info {
  margin-top: 0.62rem;
}
.app_slide .slick-slide .per_info > span {
  position: static;
  top: auto;
  left: 0;
  transform: translateY(0);
  float: left;
  width: 2.37rem;
  height: 2.37rem;
  border-radius: 50%;
  overflow: hidden;
}
.app_slide .slick-slide .per_info dl {
  margin-left: 3rem;
  padding-top: 0.25rem;
}
.app_slide .slick-slide .per_info dl dt {
  font-size: 0.81rem;
  color: #575757;
  word-break: break-all;
  letter-spacing: -0.06rem;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.app_slide .slick-slide .per_info dl dd {
  font-size: 0.81rem;
  color: #655da7;
  line-height: 1;
  margin-top: 0.31rem;
}
.app_slide .slick-slide .per_info dl dd em {
  font-size: 0.87rem;
}
</style>