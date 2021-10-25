<template>
  <div class="m_contents01-1">
    <div class="main_tab">
      <div id="my_tab" class="clfix">
        <div
          class="m_notice2"
          :class="{ new: boo(this.GetMain.boardtype['notice']['my'].data) }"
        >
          <em>공지</em>
          <div class="nt_slide">
            <VueSlickCarousel
              v-bind="settings"
              v-if="GetMain.boardtype['notice']['my'].data.length > 0"
            >
              <div
                v-for="(value, name) in this.GetMain.boardtype['notice']['my']
                  .data"
                :key="name"
                @click="Read(value, 'notice')"
              >
                <a>{{ value.subject }}</a>
              </div>
            </VueSlickCarousel>
          </div>
          <span class="nt_more"><a href="mob_noti_list.html"></a></span>
        </div>

        <div class="my_info2">
          <div class="info_top">
            <span>
              <em
                ><img
                  v-if="GetMyInfo.photo !== undefined"
                  :src="url(GetMyInfo.photo)"
                  alt=""
                  @error="$event.target.src = '../../mobile/img/img03.png'"
              /></em>
            </span>
            <dl>
              <dt>{{ GetMyInfo.info.name }}</dt>
              <dd class="mar30">
                {{ GetMyInfo.info.position }} / {{ GetMyInfo.info.dept }}
              </dd>
            </dl>
          </div>
          <div class="info_btm">
            <router-link :to="{ name: 'mailfirst' }">
              <span
                >새 메일 <em>{{ GetMyInfo.mailCount }}</em></span
              ></router-link
            >
            <a @click="MeneGo"
              ><span
                >결재 <em>{{ GetMyInfo.approvalCount }}</em></span
              ></a
            >
          </div>
        </div>
        <div class="top_rig">
          <div class="m_mail2">
            <router-link :to="{ name: 'mail' }">
              <span><img src="../../mobile/img/mail_icon_w.png" alt="" /></span>
              <em>받은메일</em>
            </router-link>
          </div>
          <div class="m_cal">
            <router-link
              :to="{
                name: 'appapproving',
                query: {
                  data: JSON.stringify({
                    type: 'approving',
                    lnbid: ThisCategory('approving').lnbid,
                    top: params.lnbid,
                    title: ThisCategory('approving').title,
                  }),
                },
              }"
            >
              <span><img src="../../mobile/img/app_icon_p.png" alt="" /></span>
              <em>전자결재</em>
            </router-link>
          </div>
        </div>
        <div class="mld_cen clfix">
          <div class="m_app">
            <router-link :to="{ name: 'calmonth' }">
              <span
                ><img src="../../mobile/img/cal_icon_w.png" alt="일정"
              /></span>
              <em>일정</em>
            </router-link>
          </div>
          <div class="m_board">
            <router-link
              :to="{
                name: `boardlist`,
                query: {
                  data: JSON.stringify(board),
                },
              }"
            >
              <span
                ><img src="../../mobile/img/board_icon_p.png" alt="공지사항"
              /></span>
              <em>게시판</em>
            </router-link>
          </div>
          <div class="m_noti">
            <router-link
              :to="{
                name: `boardlist`,
                query: {
                  data: JSON.stringify(notice),
                },
              }"
            >
              <span
                ><img src="../../mobile/img/noti_icon_p.png" alt="공지사항"
              /></span>
              <em>공지사항</em>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import config from "../../config/config.json";
import { mapState, mapGetters } from "vuex";
export default {
  async created() {
    // this.params = JSON.parse(this.$route.query.data);
    // this.params = this.GetHeader.menu;
    var main = this.GetCategory["main"];
    var appidx = main.findIndex(function (item, idx) {
      return item.category == "approval";
    });
    this.params = main[appidx];
    console.log(main);
    var boardidx = main.findIndex(function (item, idx) {
      return item.type == "board";
    });
    var noticeidx = main.findIndex(function (item, idx) {
      return item.type == "notice";
    });
    this.board = main[boardidx];
    this.notice = main[noticeidx];

    // this.categorys.findIndex(function (item, idx) {
    //       return item.category == menu;
    //     });

    this.categorys = await this.$store.dispatch(
      "CategoryList",
      this.params.lnbid
    );
    this.$forceUpdate();
  },
  components: { VueSlickCarousel },
  computed: {
    ...mapState("mainjs", ["main"]),
    ...mapGetters("mainjs", ["GetMyInfo", "GetMain"]),
    ...mapGetters(["GetMainLanguage", "GetCategory"]),
  },
  data() {
    return {
      notice: [],
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
    menuOfCategoryIdx(menu) {
      if (this.categorys) {
        return this.categorys.findIndex(function (item, idx) {
          return item.category == menu;
        });
      }
      return -1;
    },
    ThisCategory(menu) {
      if (this.categorys) {
        return this.categorys[this.menuOfCategoryIdx(menu)];
      }
      return [];
    },
    MeneGo() {
      this.$router.push({
        name: `approvalfirst`,
        query: {
          data: JSON.stringify({
            type: this.ThisCategory("approve").category,
            lnbid: this.ThisCategory("approve").lnbid,
            top: this.params.lnbid,
            title: this.ThisCategory("approve").title,
          }),
        },
      });

      // });
    },
    Read(value, menu) {
      if (value.unid) {
        this.$store.commit("boardjs/BoardSaveUnid", value.unid);
        this.$store.dispatch("boardjs/BoardDetail", {
          menu,
          unid: value.unid,
          type: "notice",
          title: this.GetMainLanguage.portlet.announcement,
        });
      }
    },
    url(sabun) {
      return this.main.photo.replace(/@/g, sabun);
    },
    // 현재 날짜와 문서의 created 시간을 비교, 안 읽은 문서이면 new icon 표시
    boo(value) {
      if (value.length > 0) {
        var moment = require("moment");
        var localTime = moment.utc(value.created).toDate();
        localTime = parseInt(moment(localTime).format("YYYYMMDD"));
        var nowTime = parseInt(moment().format("YYYYMMDD"));
        if (nowTime - localTime === this.main.my.recentdate) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style>
</style>