<template>
  <div v-if="this.Option().boardRolling">
    <p class="m_notice">
      <em description="공지">{{ portlet.title }}</em>
      <VueSlickCarousel v-bind="settings" v-if="GetMain.boardtype['notice']['my'].data.length > 0">
        <a
          :class="{ new: boo(value) }"
          @click="Read(value, 'notice')"
          v-for="(value, name) in this.GetMain.boardtype['notice']['my'].data"
          :key="name"
          >{{ value.subject }}</a
        >
      </VueSlickCarousel>
    </p>
  </div>
  <div class="m_posts" v-else>
    <strong desc="최근게시물">{{ portlet.title }}</strong>
    <ul>
      <li v-for="(value, name) in this.GetMain.boardtype['notice']['my'].data" :key="name">
        <a @click="Read(value, 'notice')"
          ><em v-if="value.category">[{{ value.category }}]</em
          >{{ value.subject }}</a
        >
      </li>
    </ul>
    <span class="m_more">
      <!-- @click.native="
          SetHeader({
            lnbid: '',
            type: 'recent',
            top: '',
            title: portlet.board.board,
          })
        " -->
      <router-link
        :to="{
          name: `boardlist`,
          query: {
            data: JSON.stringify({
              lnbid: params.lnbid,
              type: portlet.type,
              top: portlet.lnbid,
              title: params.title,
            }),
          },
        }"
      ></router-link
    ></span>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import { mapGetters, mapState } from "vuex";
import config from "../../../config/config.json";
export default {
  async created() {
    console.log("?")
    this.params = this.portlet;
    await this.$store.dispatch("mainjs/GetBoard", {
      boardtype: "notice",
      category: "my",
    });
    this.lists = this.GetMain.boardtype["notice"]["my"].data;
    this.$forceUpdate();
  },
  mounted() {
    const ntWidth = $(".m_notice em").outerWidth(true);
    $(".m_notice .slick-slider").css("margin-left", `${ntWidth / 16}rem`);
  },
  props: ["portlet"],
  components: { VueSlickCarousel },
  computed: {
    ...mapGetters("mainjs", ["GetMain"]),
    ...mapState("mainjs", ["main"]),
  },
  data() {
    return {
      lists:[],
      settings: {
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: config.noticeSpeed * 1000,
        vertical: true,
        arrows: false,
      },
    };
  },
  methods: {
    Read(value, menu) {
      if (value.unid) {
        this.$store.commit("boardjs/BoardSaveUnid", value.unid);
        
        this.$store.dispatch("boardjs/BoardDetail", {
          menu,
          unid: value.unid,
          top: this.portlet.lnbid,
          type: "notice",
          title: this.portlet.title,
        });
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
.m_notice em {
  position: absolute;
  top: 50%;
  left: 1.25rem;
  transform: translateY(-50%);
  /* width: 2.18rem; */
  height: 1.37rem;
  background: var(--main-bg-color);
  text-align: center;
  font-size: 0.81rem;
  color: #fff;
  line-height: 1.37rem;
  border-radius: 0.12rem;
  padding: 0 0.375rem;
}
.m_notice .slick-slider {
  height: 2.5rem;
  overflow: hidden;
  margin-left: 3.75rem;
}
</style>

