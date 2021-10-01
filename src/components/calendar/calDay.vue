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
          <div v-for="(value, index) in (GetSchedule.calList.day.allday)" :key="index">
            <p v-if="value.allDay">{{value.subject}}</p>
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
                <div
                  class="col1"
                  v-for="(value, index) in (GetSchedule.calList.day.data)"
                  :key="index"
                >
                  <!-- :style="{ width: `calc(100% / ${isToday(GetSchedule.calList.day).length})` }" -->
                  <div class="col_wrap" >
                    <div class="schedule_wrap">
                      <div class="schedule time_schedule" v-for="(v, i) in isToday(value)"
                  :key="i" :style="SetStyle(v)">
                        <div class="schedule_box" v-if="!v.allDay" @click="Detail(v)">
                          <p>
                            <em class="time"
                              >{{ v.starttime.split(":")[0] }}:{{
                                v.starttime.split(":")[1]
                              }}
                              ~ {{ v.endtime.split(":")[0] }}:{{
                                v.endtime.split(":")[1]
                              }}</em
                            >
                            <span class="con">{{ v.subject }}</span>
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
        <span class="now_line" :style="`top:${now}rem`"></span>
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
export default {
  created() {
    this.Init();
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
      now: 4.68,
      timeSort: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
      ],
      calmenu: false,
      fulldate: "",
      currentYear: 0,
      currentMonth: 0,
      currentDay: 0,
      year: 0,
      month: 0,
      today: 0,
      theDayOfWeek: 0,
      daysSort: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      check: false,
    };
  },
  methods: {
    SetStyle(value) {
      // style="top: 60px; height: 90px"
      if (!value.allDay) {
        var start = new Date(`${value.startdate}T${value.starttime}`);
        var end = new Date(`${value.enddate}T${value.endtime}`);
        var elapsed = (end.getTime() - start.getTime()) / 1000 / 60;
        return `top: ${
          start.getMinutes() + start.getHours() * 60
        }px;height: ${elapsed}px`;
      }
      return "";
      // style="top: 60px; height: 70px"
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
    Start(e) {
      this.startX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
      this.check = true;
    },
    End(e) {},
    Move(e) {
      this.nowclientX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
      if (this.nowclientX - this.startX > 100 && this.check) {
        this.DayChange(-1);
        this.check = false;
      } else if (this.nowclientX - this.startX < -100 && this.check) {
        this.DayChange(1);
        this.check = false;
      }
      // this.nowclientY = e.touches[0].pageY - e.touches[0].target.offsetTop;
    },
    DayChange(arg) {
      var moment = require("moment");
      var redate = this.fulldate.replaceAll(".", "/");
      if (arg > 0) {
        this.fulldate = moment(redate).add("1", "d").format("YYYY.MM.DD");
      } else if (arg < 0) {
        // -1
        this.fulldate = moment(redate).subtract("1", "d").format("YYYY.MM.DD");
      }

      this.year = parseInt(this.fulldate.split(".")[0]);
      this.month = parseInt(this.fulldate.split(".")[1]);
      this.today = parseInt(this.fulldate.split(".")[2]);

      var data = {};
      data.start = `${this.year}-${this.fill(2, this.month)}-${this.fill(
        2,
        this.today
      )}`;
      data.end = data.start;
      data.today = data.start;
      this.$store.dispatch("calendarjs/CalList", { data, which: "day" });
      var redate = this.fulldate.replaceAll(".", "/");
      var currentDay = new Date(redate);
      this.theDayOfWeek = currentDay.getDay();
    },
    Today() {
      this.Init();
    },
    CalMenu() {
      this.calmenu = true;
    },
    CalMenuOff() {
      this.calmenu = false;
    },
    Init() {
      var currentDay = new Date();
      this.currentYear = currentDay.getFullYear();
      this.currentMonth = currentDay.getMonth() + 1;
      var hour = currentDay.getHours(); //시간
      var min = currentDay.getMinutes(); //분
      min += hour * 60;
      this.now = min / 16 + 4.68;
      this.year = this.currentYear;
      this.month = this.currentMonth;
      this.today = currentDay.getDate();
      this.currentDay = this.today;
      this.fulldate = `${this.year}.${this.fill(2, this.month)}.${this.fill(
        2,
        this.today
      )}`;

      var data = {};
      data.start = this.fulldate;
      data.end = this.fulldate;
      data.today = this.fulldate;
      this.$store.dispatch("calendarjs/CalList", { data, which: "day" });
    },
    calendarData(arg) {
      if (arg < 0) {
        this.month -= 1;
      } else if (arg === 1) {
        this.month += 1;
      }
      if (this.month === 0) {
        this.year -= 1;
        this.month = 12;
      } else if (this.month > 12) {
        this.year += 1;
        this.month = 1;
      }
      this.fulldate = `${this.year}.${this.fill(2, this.month)}.${this.fill(
        2,
        this.today
      )}`;
      var data = {};
      data.start = `${this.year}-${this.fill(2, this.month)}-${this.fill(
        2,
        this.today
      )}`;
      data.end = data.start;
      data.today = data.start;
      this.$store.dispatch("calendarjs/CalList", { data, which: "day" });
      var redate = this.fulldate.replaceAll(".", "/");
      var currentDay = new Date(redate);
      this.theDayOfWeek = currentDay.getDay();
    },
    changeDate(date) {
      var currentDay = new Date();
      var hour = currentDay.getHours(); //시간
      var min = currentDay.getMinutes(); //분
      min += hour * 60;
      this.now = min / 16 + 4.68;
      this.year = parseInt(date.split(".")[0]);
      this.month = parseInt(date.split(".")[1]);
      this.today = parseInt(date.split(".")[2]);
      this.calendarData();
    },
    fill(width, number) {
      number = number + ""; //number를 문자열로 변환하는 작업
      var str = "";
      for (var i = 0; i < width - number.length; i++) {
        str = str + "0";
      }
      str = str + number;
      return str;
    },
    async Detail(value) {
      this.$store.commit("calendarjs/SaveScheduleUnid", {
        unid: value.unid,
        where: "day",
      });
      // await
      this.$router.push({name:'calread'});
    },
  },
};
</script>

<style>
</style>