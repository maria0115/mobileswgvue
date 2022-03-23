<template>
  <div class="m_mail">
    <strong desc="메일">{{ portlet.title }}</strong>
    <ul>
      <li
        :class="{ new: value.unread }"
        v-for="(value, name) in main.data.mailtype.inbox_detail.my.data.data"
        :key="name"
      >
        <a>
          <dl @click="MailDetail(value.unid)">
            <dt>
              {{ value.sender }}
              <div>
                <em
                  class="rece"
                  v-if="value.tostuff !== undefined"
                  :class="{ on: value.tostuff.receive }"
                  >{{ lang.to }}</em
                ><em
                  class="refer"
                  v-if="value.tostuff !== undefined"
                  :class="{ on: value.tostuff.ref }"
                  >{{ lang.cc }}</em
                >
              </div>
              <span>{{ transTime(value.created)
              }}</span>
            </dt>
            <!-- 7월 5일 div태그 추가됨 -->
            <dd>
              <b :class="{ impor_icon: value.importance }"></b
              >{{ value.subject }}
            </dd>
            <!-- 7월 05일 중요메일 느낌표 태그 추가됨-->
          </dl>
          <div class="impor">
            <p @click="followUp(value.unid)">
              <span
                class="star"
                :class="{ active: value.followup }"
                :src="`/mobile/img/star${important(value.followup)}.png`"
                alt="중요메일"
              />
            </p>
            <span :class="[{ clip: haveClip(value.attach) }]"></span>
          </div>
        </a>
      </li>
    </ul>
    <FollowUp :unid="clickedUnid"></FollowUp>
    <router-link :to="{ name: 'mail' }"
      ><span class="m_more"><a></a></span
    ></router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import FollowUp from "../../../components/mail/folloup.vue";
export default {
  created() {
    this.lang = this.GetMailLanguage.list;
  },
  props: ["portlet"],
  data() {
    return {
      // path:this.path,
      clickedUnid: "",
      body: "",
      unid: "",
    };
  },
  computed: {
    ...mapState("mainjs", ["main"]),
    ...mapState("mailjs", ["TimeOption"]),
    ...mapGetters("mailjs", ["GetMail"]),
    ...mapGetters(["GetMailLanguage"]),
  },
  components: {
    FollowUp,
  },
  methods: {
    MailDetail(unid) {
      this.$router.push({ name: "ReadMail", params: { unid } });
    },
    // 현재 날짜와 문서의 created 시간을 비교, 안 읽은 문서이면 new icon 표시
    boo(value) {
      var moment = require("moment");
      var localTime = moment.utc(value.created).toDate();
      localTime = parseInt(moment(localTime).format("YYYYMMDD"));
      var nowTime = parseInt(moment().format("YYYYMMDD"));
      if (nowTime - localTime === this.main.my.recentdate && value.unread) {
        return true;
      }
      return false;
    },
    // 첨부파일이 있는지
    haveClip(value) {
      // if (value.attachinfo.length > 0 && value.attachinfo[0] !== "") {
      //   return true;
      // }
      // return false;
      if (value !== undefined) {
        return value;
      } else {
        return false;
      }
    },
    // 중요메일
    important(boo) {
      if (boo) {
        return "_on";
      }
      return "";
    },
    // utc 시간 to local 시간
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD HH:mm");
      return localTime;
    },
    followUp(unid) {
      this.clickedUnid = unid;
    },
  },
};
</script>

<style>
</style>