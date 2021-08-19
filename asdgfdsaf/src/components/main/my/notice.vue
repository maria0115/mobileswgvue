<template>
  <div>
    <p
    :class="{ new: boo(value) }"
      class="m_notice"
      v-for="(value, name) in this.GetMain.boardtype['notice']['my'].data"
      :key="name"
    >
      <a
        ><em description="공지">{{ portlet.announcement }}</em
        >{{ value.subject }}</a
      >
    </p>
  </div>
</template>

<script>
import { mapGetters,mapState } from "vuex";
export default {
  props: ["portlet"],
  computed: {
    ...mapGetters(["GetMain"]),
    ...mapState(["main"]),
  },
  methods: {
    // 현재 날짜와 문서의 created 시간을 비교, 안 읽은 문서이면 new icon 표시
    boo(value) {
        var moment = require("moment");
        var localTime = moment.utc(value.created).toDate();
        localTime = parseInt(moment(localTime).format("YYYYMMDD"));
        var nowTime = parseInt(moment().format("YYYYMMDD"));
        if((nowTime-localTime)===this.main.my.recentdate){
          return true;
        }
        return false;
    },
  }
};
</script>

<style>
</style>