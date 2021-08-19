<template>
  <div class="m_mail">
    <strong desc="메일">{{ portlet.mail }}</strong>
    <ul>
      <li
      @click="MailDetail(value.unid)"
        :class="{ new: boo(value) }"
        v-for="(value, name) in main.data.mailtype.inbox_main.my.data"
        :key="name"
      >
        <a>{{ value.subject }}</a>
      </li>
    </ul>
    <router-link to="/maillist"><span class="m_more"><a></a></span></router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["portlet"],
  computed: {
    ...mapState(["main"]),
  },
  methods: {
    MailDetail(unid) {
      console.log(unid)
      this.$router.push({ name: "ReadMail", params: { unid } });
    },
    // 현재 날짜와 문서의 created 시간을 비교, 안 읽은 문서이면 new icon 표시
    boo(value) {
        var moment = require("moment");
        var localTime = moment.utc(value.created).toDate();
        localTime = parseInt(moment(localTime).format("YYYYMMDD"));
        var nowTime = parseInt(moment().format("YYYYMMDD"));
        if((nowTime-localTime)===this.main.my.recentdate&&value.unread){
          return true;
        }
        return false;
    },
  }
};
</script>

<style>
</style>