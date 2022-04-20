

<template>
  <div class="main_tab">
    <div id="cal_tab">
      <div :class="`m_calendar`">
        <strong>{{ params.title }}</strong>
        <div class="clfix">
          <span class="d_day">
            <em>{{ changeDate().yearmonth }}</em>
            <b>{{ changeDate().day }}</b>
          </span>
          <div class="ri_info">
            <div v-for="(value, name) in sliceDate()" :key="name">
              <div v-if="value.allDay" class="all_cal">
                <a @click="Detail(value)">
                  <em>{{ lang.allday }}</em>
                  <p>[{{ value.category }}]{{ value.subject }}</p>
                </a>
              </div>
            </div>
            <ul class="c_list" v-if="sliceDate().length > 0">
              <li
                :class="[{ red: value.now }]"
                v-for="(value, name) in sliceDate()"
                :key="name"
              >
                <a v-if="!value.allDay" @click="Detail(value)">
                  <em>{{ value.time }}</em>
                  <p>{{ value.subject }}</p>
                </a>
              </li>
            </ul>
            <ul class="c_list" v-else>
              <li>
                <p>{{ lang.result }}</p>
              </li>
            </ul>
          </div>
        </div>

        <span class="m_more">
          <!-- @click.native="
            SetHeader({
              lnbid: key.lnbid,
              type: key.type,
              top: top,
              title: key.title,
            })
          " -->
          <router-link :to="{ name: 'schedule' }"></router-link
        ></span>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  created() {
    this.$store.dispatch("mainjs/GetSchedule", {
      scheduletype: "recent",
      category: "my",
    });
    this.params = JSON.parse(this.$route.query.data);

    this.lang = this.GetMainLanguage.main;
  },
  data() {
    return {
      yearmonth: "",
      day: "",
    };
  },
  computed: {
    ...mapGetters("mainjs", ["GetMain"]),
    ...mapGetters(["GetMainLanguage"]),
  },
  methods: {
    // 오늘의 모든 일정을 노드에서 가져온 후의 현재 시간 이후의 데이터를 색출
    sliceDate() {
      var moment = require("moment");
      let today = moment().format("YYYY-MM-DD");
      var now = true;

      // 오늘의 모든 일정
      const date = this.GetMain.scheduletype.recent.my.data;
      var result = [];
      for (var i = 0; i < date.length; i++) {
        // 지금시간보다 일정의 끝나는 시간이 늦을경우 출력
        var end = date[i].enddate + "T" + date[i].endtime;
        var start = date[i].startdate + "T" + date[i].starttime;
        if (today == moment(start).format("YYYY-MM-DD")) {
          if (
            parseInt(moment(end).format("HHmmss")) >
            parseInt(moment().format("HHmmss"))
          ) {
            now ? (date[i].now = true) : "";
            now = false;
          }
          var time = `${moment(start).format("HH:mm")}~${moment(end).format(
            "HH:mm"
          )}`;
          date[i].time = time;
          result.push(date[i]);
          //   if (result.length === this.GetMain.scheduletype.recent.my.size) {
          //     break;
          //   }
        }
      }
      return result;
    },
    // 오늘의 년월, 일
    changeDate() {
      // const date = this.GetMain.scheduletype.recent.my.data;
      var result = {};
      var moment = require("moment");
      result.yearmonth = moment().format("YYYY.MM");
      result.day = moment().format("DD");
      // }
      return result;
    },
    async Detail(value) {
      this.$store.commit("calendarjs/SaveScheduleUnid", {
        unid: value.unid,
        where: "month",
      });
      // await this.$store.dispatch("CalDetail",{data:value.data,path:this.$route.path,which:"month"});
      this.$router.push({
        name: "calread",
        query: {
          data: JSON.stringify({
            date: value.enddate,
            time: `${value.starttime} ~ ${value.endtime}`,
          }),
        },
      });
    },
  },
};
</script>

<style>
</style>