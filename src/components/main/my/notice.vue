<template>
  <div>
      <p 
      class="m_notice"
      >
      <em description="공지">{{ portlet.announcement }}</em
        >
    <VueSlickCarousel
    
        v-bind="settings"
       v-if="GetMain.boardtype['notice']['my'].data.length > 0"
      >
      <a :class="{ new: boo(value) }"
       @click="Read(value, 'notice')"
       v-for="(value, name) in this.GetMain.boardtype['notice']['my'].data"
      :key="name"
        >{{ value.subject }}</a
      >

      </VueSlickCarousel>
      </p>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import { mapGetters, mapState } from "vuex";
import config from "../../../config/config.json";
export default {
  props: ["portlet"],
  components: { VueSlickCarousel },
  computed: {
    ...mapGetters("mainjs", ["GetMain"]),
    ...mapState("mainjs", ["main"]),
  },
  data() {
    return {
      settings: {
        slidesToShow: 1,
        autoplay : true,	
        autoplaySpeed : config.noticeSpeed*1000,
        vertical : true,	
        arrows: false,
      },
    };
  },
  methods: {
    Read(value, menu) {
      if (value.unid) {
        this.$store.dispatch("boardjs/BoardDetail", { menu, unid: value.unid });
      }
    },
    // 현재 날짜와 문서의 created 시간을 비교, 안 읽은 문서이면 new icon 표시
    boo(value) {
      var moment = require("moment");
      var localTime = moment.utc(value.created).toDate();
      localTime = parseInt(moment(localTime).format("YYYYMMDD"));
      var nowTime = parseInt(moment().format("YYYYMMDD"));

      if (nowTime - localTime < this.main.my.recentdate) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>

</style>