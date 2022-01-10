<template>
  <div>
    <date-header
      @ChangeDate="changeDate"
      @cNext="calendarData(1)"
      @cPrev="calendarData(-1)"
      :date="fulldate"
      @calMenu="CalMenu"
    ></date-header>
    <Header @calMenuOff="CalMenuOff" :calmenu="this.calmenu"></Header>
    <div
      class="m_contents09"
      @touchstart="Start($event)"
      @touchmove="Move($event)"
    >
      <div class="day_cal_con">
        <div class="day_top">
          <div>
            <span>{{ this.daysSort[this.theDayOfWeek] }}</span>
            <b>{{ this.today }}</b>
          </div>
          <div
            v-for="(value, index) in GetSchedule.calList.day.allday"
            :key="index"
          >
            <p v-if="value.allDay">{{ value.subject }}</p>
          </div>
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
                <div class="col1">
                  <!-- :style="{ width: `calc(100% / ${isToday(GetSchedule.calList.day).length})` }" -->
                  <div class="col_wrap">
                    <div class="schedule_wrap">
                      <ul class="sec_line">
                        <li
                          v-for="(timev, timei) in 24"
                          @click="Write(timei)"
                          :key="timei"
                        ></li>
                      </ul>
                      <div>
                        <!-- <div
                          class="schedule time_schedule"
                          v-for="(v, i) in isToday(value)"
                          :key="i"
                          
                        > -->
                        <div
                          v-for="(value, index) in GetSchedule.calList.day.data"
                          :key="index"
                          class="schedule_box"
                          @click="Detail(value)"
                          :style="SetStyle(value) + Style(value)"
                        >
                          <!-- value-if="!value.allDay" -->
                          <p>
                            <em class="time" :style="fontColor()"
                              >{{ value.starttime }} ~ {{ value.endtime }}</em
                            >
                            <span class="con" :style="fontColor()">{{
                              value.subject
                            }}</span>
                          </p>
                        </div>
                        <!-- </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <ul>
          <li class="timeline" v-for="(value, index) in timeSort"
            :key="index">
            <div><div>{{ value }}</div></div>
            <div class="time_con">
              <p v-for="(v, i) in isToday(GetSchedule.calList.day[index])"
                      :key="i" :style="{ width: `calc(100% / ${isToday(GetSchedule.calList.day[index]).length})` }">
                <a  @click="Detail(v)">
                  <span class="time">{{v.starttime.split(":")[0]}}:{{v.starttime.split(":")[1]}} ~ {{v.endtime.split(":")[0]}}:{{v.endtime.split(":")[1]}}</span>
                  <span class="con">{{v.subject}}</span>.
                </a>
              </p>
            </div>
          </li>
        </ul> -->
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
  created() {
    this.Init();
    this.$store.commit("calendarjs/SaveScheduleWhere", "day");
  },
  mixins: [nowTime],
  mounted() {
    // window.scroll({ top: this.min, behavior: "smooth" });
    this.nowTimeGo();
  },
  computed: {
    ...mapGetters("calendarjs", ["GetSchedule"]),
  },
  components: {
    Header,
    DateHeader,
    CalWrite,
  },
  data() {
    return {
      days: 1,
    };
  },
  methods: {
    SetStyle(value) {
      var per = 100 / value.width;
      var left = 100 / (value.width - value.left) - per;
      return this.timeStyle(value) + `width: ${per}%;left: ${left}%;`;
    },
    Write(time) {
      this.$store.commit("calendarjs/isEdit", false);
      // var convdate = this.fulldate.replaceAll(".", "-");
      var convdate = this.replaceAll(this.fulldate, ".", "-");
      this.$router.push({
        name: "calwrite",
        query: { data: JSON.stringify({ date: convdate, starttime: time }) },
      });
    },
    isToday(value) {
      if (value && value.length > 0) {
        var str =
          this.fill(2, this.year) +
          "-" +
          this.fill(2, this.month) +
          "-" +
          this.fill(2, this.today);
        return value.filter((x) => {
          return x.startdate === str;
        });
      }
      return [];
    },
    MoveChange(arg) {
      this.dateMove(arg);
      // this.Send();
    },
    Init() {
      this.InitSet();
      // var redate = this.fulldate.replaceAll(".", "/");
      // var redate = this.replaceAll(this.fulldate, ".", "/");

      // this.Send();
    },
    calendarData(arg) {
      this.calendarDataSet(arg);
      // this.Send();
      // var redate = this.fulldate.replaceAll(".", "/");
    },
    Send() {
      var data = {};
      data.start = this.senddate;
      data.end = this.senddate;
      data.today = this.senddate;
      this.$store.dispatch("calendarjs/CalList", { data, which: "day" });
      return data;
    },
    changeDate(date) {
      if (date.length > 0) {
        var currentDay = new Date();
        var hour = currentDay.getHours(); //시간
        this.min = currentDay.getMinutes(); //분
        this.min += hour * 60;
        this.now = this.min + 74.88;
        this.SetDate(date);
        this.setFull();
        this.ReDate();
        this.Send();

        // this.calendarData();
      }
    },
    Style(value) {
      if (!this.Option().inotes) {
        return `;background: ${value.color}`;
      }
      return "";
    },
    fontColor() {
      if (!this.Option().inotes) {
        return `;color: #fff`;
      }
      return "";
    },
    async Detail(value) {
      //
      this.$store.commit("calendarjs/SaveScheduleUnid", {
        unid: value.unid,
        where: "day",
      });
      // await
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