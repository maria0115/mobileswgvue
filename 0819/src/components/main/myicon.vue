<template>
  <div class="m_contents01-1">
    <div class="main_tab">
      <div id="my_tab" class="clfix">
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
            <span
              >새 메일 <em>{{ GetMyInfo.mailCount }}</em></span
            >
            <span
              >결재 <em>{{ GetMyInfo.approvalCount }}</em></span
            >
          </div>
        </div>
        <div class="top_rig">
          <div class="m_mail2">
            <router-link to="/maillist/inbox_detail">
              <span><img src="../../mobile/img/mail_icon_w.png" alt="" /></span>
              <em>받은메일</em>
            </router-link>
          </div>
          <div class="m_cal">
            <router-link to="/schedule/month">
              <span><img src="../../mobile/img/cal_icon_w.png" alt="" /></span>
              <em>일정</em>
            </router-link>
          </div>
        </div>
        <div class="m_notice2" :class="{ new: boo(this.GetMain.boardtype['notice']['my'].data) }">
          <a v-if="this.GetMain.boardtype['notice']['my'].data.length>0"><em>공지</em>{{ this.GetMain.boardtype['notice']['my'].data[0].subject }}</a>
        </div>
        <div class="mld_cen clfix">
          <div class="m_app">
            <router-link to="">
              <span
                ><img src="../../mobile/img/app_icon_p.png" alt="공지사항"
              /></span>
              <em>전자결재</em>
            </router-link>
          </div>
          <div class="m_board">
            <router-link to="">
              <span
                ><img src="../../mobile/img/board_icon_p.png" alt="공지사항"
              /></span>
              <em>게시판</em>
            </router-link>
          </div>
          <div class="m_noti">
            <router-link to="">
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
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["main"]),
    ...mapGetters(["GetMyInfo", "GetMain"]),
  },
  data() {
    return {
      notice: [],
    };
  },

  methods: {
    url(sabun) {
      return this.main.photo.replace(/@/g, sabun);
    },
    // 현재 날짜와 문서의 created 시간을 비교, 안 읽은 문서이면 new icon 표시
    boo(value) {
        if(value.length>0){
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