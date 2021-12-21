<template>
  <div>
    <date-header
      @ChangeDate="changeDate"
      @cNext="calendarData(1)"
      @cPrev="calendarData(-1)"
      @calMenu="CalMenu"
      :date="fulldate"
    ></date-header>
    <Header :calmenu="this.calmenu" @calMenuOff="CalMenuOff"></Header>
    <div
      class="m_contents09"
      @touchstart="Start($event)"
      @touchmove="Move($event)"
    >
      <div class="week_day">
        <div
          v-for="(value, index) in this.thisWeek"
          :key="index"
          :class="{
            to_day: fill(value.day, 2) === fill(today, 2),
          }"
        >
          <span>{{ value.sort }}</span>
          <em>{{ value.day }}</em>
        </div>
      </div>
      <div class="week_cal_con">
        <div>
          <div class="week_cal_top">
            <div>
              <span>{{lang.allday}}</span>
            </div>
            <ul class="week_caltit">
              <li
                v-for="(value, index) in daysSort"
                :key="index"
                class="sun"
                :class="{
                  active: fill(value.day, 2) === fill(today, 2),
                }"
              >
                <!--해당날짜일떄 active 생기게 해주세요-->
                <p
                  v-if="
                    GetSchedule.calList.week[value] &&
                    GetSchedule.calList.week[value].allday
                  "
                >
                  <em
                    v-for="(v, i) in GetSchedule.calList.week[value].allday"
                    :key="i"
                  >
                    {{ v.subject }}
                  </em>
                </p>
              </li>
            </ul>
          </div>
          <div class="time_area">
            <div class="scrl clfix">
              <div class="timeline">
                <ul>
                  <li v-for="(value, index) in timeSort" :key="index">
                    {{ value }}
                  </li>
                </ul>
              </div>
              <div class="row_wrap">
                <div class="row">
                  <div
                    class="col1"
                    v-for="(value, index) in daysSort"
                    :key="index"
                  >
                    <div class="col_wrap">
                      <div class="schedule_wrap" day-index="0">
                        <ul class="sec_line">
                          <!--9월 30일 추가-->
                          <li
                            v-for="(timev, timei) in 24"
                            @click="Write(timei, index)"
                            :key="timei"
                          ></li>
                        </ul>
                        <div
                          v-if="
                            GetSchedule.calList.week[value] &&
                            GetSchedule.calList.week[value].timeday
                          "
                        >
                          <div
                            v-for="(v, i) in GetSchedule.calList.week[value]
                              .timeday"
                            :key="i"
                            class="schedule week_schedule"
                            :style="timeStyle(v)"
                            @click="Detail(v)"
                          >
                            <div class="schedule_box">
                              <p>
                                <span class="tit">{{ v.subject }}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <li
            class="w_timeline"
            v-for="(value, index) in timeSort"
            :key="index"
          >
            <div class="time">
              <div>{{ value }}</div>
            </div>
            <div class="time_con">
              <div class="week_caltit">
                <div
                  v-for="(v, i) in daysSort"
                  :key="i"
                  :class="{
                    time_day:
                      theDayOfWeek == i && hour == index && haveem(v, index,value,i),
                  }"
                >
                  <a v-if="GetSchedule.calList.week[v]">
                    <em
                      v-for="(va, idx) in GetSchedule.calList.week[v][index]"
                      :key="idx"
                      @click="Detail(va)"
                      >{{ va.subject }}
                    </em>
                  </a>
                </div>
              </div>
            </div>
          </li> -->
        </div>
        <span class="now_line" :style="`top:${now}px`"></span>
      </div>
      <span class="today_btn" @click="Today">Today</span>
    </div>
    <CalWrite></CalWrite>
  </div>
</template>

<script>
import Header from "./header.vue";
import DateHeader from "./datepicker.vue";
import { mapState, mapGetters } from "vuex";
import CalWrite from "./calWBtn.vue";
import nowTime from "@/mixin/nowTime";

export default {
  computed: {
    ...mapGetters("calendarjs", ["GetSchedule"]),
  },
  mixins: [nowTime],

  components: {
    Header,
    DateHeader,
    CalWrite,
  },
  data() {
    return {
      lastMonthStart: 20,
      nextMonthStart: 0,

      days: 7,
    };
  },
  created() {
    this.lang = this.GetScheduleL.week;
    this.Init();
    this.$store.commit("calendarjs/SaveScheduleWhere", "week");
  },
  mounted() {
    // window.scroll({ top: this.min, behavior: "smooth" });
    this.nowTimeGo();
  },
  methods: {
    Write(time, day) {
      var thisday = this.thisWeek[day];
      var datestr = `${thisday.year}-${thisday.month}-${thisday.day}`;
      this.$store.commit("calendarjs/isEdit", false);
      this.$router.push({
        name: "calwrite",
        query: { data: JSON.stringify({ date: datestr, starttime: time }) },
      });
    },

    MoveChange(arg) {
      this.dateMove(arg);
      this.Send();
    },
    Send() {
      this.SetthisWeek();
      this.$store.dispatch("calendarjs/CalList", {
        data: this.SendSet(),
        which: "week",
      });
    },
    Init() {
      this.InitSet();
      this.Send();

    },
    SendSet() {
      var send = {};
      send.start = `${this.thisWeek[0].year}-${this.thisWeek[0].month}-${this.thisWeek[0].day}`;
      send.end = `${this.thisWeek[this.thisWeek.length - 1].year}-${
        this.thisWeek[this.thisWeek.length - 1].month
      }-${this.thisWeek[this.thisWeek.length - 1].day}`;
      send.today = this.fulldate;
      return send;
    },
    calendarData(arg) {
      var now = new Date();
      this.hour = now.getHours(); //시간
      this.min = now.getMinutes(); //분
      this.min += this.hour * 60;
      this.now = this.min + 74.88;
      this.calendarDataSet(arg);
      this.Send();

    },
    SetthisWeek() {
      for (var i = 0; i < this.daysSort.length; i++) {
        var resultDay = new Date(
          this.year,
          this.month - 1,
          this.today + (i - this.theDayOfWeek)
        );

        var yyyy = resultDay.getFullYear();
        var mm = Number(resultDay.getMonth() + 1);
        var dd = resultDay.getDate();

        mm = String(mm).length === 1 ? "0" + mm : mm;
        dd = String(dd).length === 1 ? "0" + dd : dd;

        var data = {};
        data.sort = this.daysSort[i];
        data.day = dd;
        data.month = mm;
        data.year = yyyy;

        // thisWeek[i] = yyyy + "-" + mm + "-" + dd;
        this.thisWeek[i] = data;
      }
    },
    getWeekNo(v_date_str) {
      var date = new Date();

      if (v_date_str) {
        date = new Date(v_date_str);
      }
      return Math.ceil(date.getDate() / 7);
    },
    changeDate(date) {
      this.SetDate(date);
      this.calendarData();
    },
    async Detail(value) {
      this.$store.commit("calendarjs/SaveScheduleUnid", {
        unid: value.unid,
        where: "week",
      });
      // await this.$store.dispatch("CalDetail",{data:value,path:this.$route.path,which:"week"});
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
    haveem(v, index, value, i) {
      if (this.GetSchedule.calList.week[v]) {
        var is = this.GetSchedule.calList.week[v][index];
        if (is.length > 0) {
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