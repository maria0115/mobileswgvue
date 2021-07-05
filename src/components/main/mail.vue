<template>
  <div id="mail_tab">
    <div class="re_mail">
      <strong desc="받은 메일">{{ GetMainLanguage.portlet.receive }}</strong>
      <ul>
        <li :class="{ new: boo(value) }"
        v-for="(value, name) in main.data.mailtype.inbox_main.more.data"
        :key="name"><a href="">{{ value.subject }}</a></li>
      </ul>
      <router-link to="/maillist"><span class="m_more"><a></a></span></router-link>
    </div>
    <div class="se_mail">
      <strong desc="보낸 메일">{{ GetMainLanguage.portlet.send }}</strong>
      <ul>
        <li v-for="(value, name) in main.data.mailtype.sent_main.more.data"
        :key="name"><a>{{ value.subject }}</a></li>
      </ul>
      <router-link to="/maillist/sent_detail"><span class="m_more"><a></a></span></router-link>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["main"]),
    ...mapGetters(["GetMain","GetMyInfo","GetMainLanguage"]),
    
  },
  created() {
    // this.$store.dispatch("GetMail", { mailtype: "receive", category: "more" });
  },
  methods: {
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