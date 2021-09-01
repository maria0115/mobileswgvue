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
        <ul>
          <li>
            <div>
              <span>종일</span>
            </div>
            <div class="week_caltit">
              <div
                v-for="(value, index) in this.thisWeek"
                :key="index"
                class="sun"
                :class="{
                  active: fill(value.day, 2) === fill(today, 2),
                }"
              >
                <!--해당날짜일떄 active 생기게 해주세요-->
                <em></em>
              </div>
            </div>
          </li>
          <li
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
                  <!-- :class="{ time_day: theDayOfWeek == i }" -->
                  <!-- :class="{time_day:GetSchedule.calList.week[index][].length}" -->
                  <!-- class="time_day" -->
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
          </li>
        </ul>
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
      hour: 0,
      calmenu: false,
      thisWeek: [],
      fulldate: "",
      currentYear: 0,
      currentMonth: 0,
      currentDay: 0,
      year: 0,
      month: 0,
      lastMonthStart: 20,
      nextMonthStart: 0,
      today: 0,
      theDayOfWeek: 0,
      daysSort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
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
      check: false,
    };
  },
  created() {
    this.Init();
  },
  methods: {
    Start(e) {
      this.startX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
      this.check = true;
    },
    End(e) {},
    Move(e) {
      this.nowclientX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
      if (this.nowclientX - this.startX > 100 && this.check) {
        this.calendarData(-1);
        this.check = false;
      } else if (this.nowclientX - this.startX < -100 && this.check) {
        this.calendarData(1);
        this.check = false;
      }
      // this.nowclientY = e.touches[0].pageY - e.touches[0].target.offsetTop;
    },
    Today() {
      this.Init();
    },
    Init() {
      var currentDay = new Date();
      this.currentYear = currentDay.getFullYear();
      this.currentMonth = currentDay.getMonth() + 1;
      this.hour = currentDay.getHours(); //시간
      var min = currentDay.getMinutes(); //분
      min += this.hour * 60;
      this.now = min / 16 + 4.68;
      this.year = this.currentYear;
      this.month = this.currentMonth;
      this.today = currentDay.getDate();
      this.currentDay = this.today;
      this.theDayOfWeek = currentDay.getDay();
      this.fulldate = `${this.year}.${this.fill(2, this.month)}.${this.fill(
        2,
        this.today
      )}`;

      for (var i = 0; i < this.daysSort.length; i++) {
        var resultDay = new Date(
          this.currentYear,
          this.currentMonth,
          this.today + (i - this.theDayOfWeek)
        );
        var yyyy = resultDay.getFullYear();
        var mm = Number(resultDay.getMonth());
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
      var send = {};
      send.start = `${this.thisWeek[0].year}-${this.thisWeek[0].month}-${this.thisWeek[0].day}`;
      send.end = `${this.thisWeek[this.thisWeek.length - 1].year}-${
        this.thisWeek[this.thisWeek.length - 1].month
      }-${this.thisWeek[this.thisWeek.length - 1].day}`;
      send.today = this.fulldate;
      this.$store.dispatch("calendarjs/CalList", { data: send, which: "week" });
    },
    calendarData(arg) {
      var now = new Date();
      this.hour = now.getHours(); //시간
      var min = now.getMinutes(); //분
      min += this.hour * 60;
      this.now = min / 16 + 4.68;
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
      var redate = this.fulldate.replaceAll(".", "/");
      var currentDay = new Date(redate);
      this.theDayOfWeek = currentDay.getDay();

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
      var send = {};
      send.start = `${this.thisWeek[0].year}-${this.thisWeek[0].month}-${this.thisWeek[0].day}`;
      send.end = `${this.thisWeek[this.thisWeek.length - 1].year}-${
        this.thisWeek[this.thisWeek.length - 1].month
      }-${this.thisWeek[this.thisWeek.length - 1].day}`;
      send.today = this.fulldate;
      this.$store.dispatch("calendarjs/CalList", { data: send, which: "week" });
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
    CalMenu() {
      this.calmenu = true;
    },
    CalMenuOff() {
      this.calmenu = false;
    },
    getWeekNo(v_date_str) {
      var date = new Date();

      if (v_date_str) {
        date = new Date(v_date_str);
      }
      return Math.ceil(date.getDate() / 7);
    },
    changeDate(date) {
      this.year = parseInt(date.split(".")[0]);
      this.month = parseInt(date.split(".")[1]);
      this.today = parseInt(date.split(".")[2]);
      this.calendarData();
    },
    async Detail(value) {
      this.$store.commit("calendarjs/SaveScheduleUnid", {
        unid: value.unid,
        where: "week",
      });
      // await this.$store.dispatch("CalDetail",{data:value,path:this.$route.path,which:"week"});
      this.$router.push("/schedule_more/read");
    },
    haveem(v, index,value,i) {
      if(this.GetSchedule.calList.week[v]){
        var is = this.GetSchedule.calList.week[v][index];
        if (is.length>0) {
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