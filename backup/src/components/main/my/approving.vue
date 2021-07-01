<template>
  <div class="app_ing">
    <strong desc="결재 중 문서">{{ portlet.approval.approving }}</strong>
    <em class="tooltip" :class="{active : active}"><strong v-for="(value, name) in tooltipText" :key="name"><div>{{`${value}`}}</div></strong></em>
    <div class="app_slide">
      <VueSlickCarousel
        v-bind="settings"
        v-if="main.data.approvaltype.approving.my.data.length > 0"
      >
        <div
          v-for="(value, name) in main.data.approvaltype.approving.my.data"
          :key="name"
        >
          <div class="s_text">
            <em>{{ value.category }}</em>
            <strong>{{ value.subject }}</strong>
            <p>
              {{nowApprover(value).author}}
              {{nowApprover(value).authorposition}}/{{nowApprover(value).authordept}}
              <span>{{ transTime(value.created) }}</span>
            </p>
            <div class="icons">
              <span class="opin"><a></a></span>
              <span
                class="clip"
                v-if="
                  checkEvent === 'mouse' &&
                  value.attachinfo.attachinfo.length > 0 &&
                  value.attachinfo.attachinfo[0] !== ''
                "
                @mousedown="onOpen($event, value)"
                @mouseup="onClose($event, value)"
              >
                <a></a>
              </span>
              <span
                class="clip"
                v-else-if="
                  checkEvent === 'touch' &&
                  value.attachinfo.attachinfo.length > 0 &&
                  value.attachinfo.attachinfo[0] !== ''
                "
                @touchstart="onOpen($event, value)"
                @touchend="onClose($event, value)"
              >
                <a></a>
              </span>
            </div>
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
    <router-link to="/approval"
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
  components: {  VueSlickCarousel },
  computed: {
    ...mapState(["main"]),
  },
  mounted() {
    if ("ontouchstart" in document.documentElement !== true) {
      this.checkEvent = "mouse";
    }
  },
  data() {
    return {
      active:false,
      tooltipText:[""],
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
    nowApprover(value) {
      var info = value.approvalinfo;
      for(var i = 0; i <info.length; i++) {
        if(info[i].approval){
          return info[i]
        }

      }
      
    },
    onOpen(e, value) {
      // var attachInfoArr = 
      this.tooltipText =value.attachinfo.attachinfo;
      // for (var i = 0; i < attachInfoArr.length; i++) {
      //   this.tooltipText += `${attachInfoArr[i]}9999999999999999999999999999\n` ;
      // }
      this.active = true;
    },
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
  },
};
</script>

<style>
/* .tooltip{white-space:pre} */
</style>