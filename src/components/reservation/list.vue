<template>
  <div>
    <DateHeader
      :thisWeek="thisWeek"
      :today="today"
      @ChangeDate="changeDate"
      @cNext="calendarData(1)"
      @cPrev="calendarData(-1)"
      @calMenu="CalMenu"
      :date="fulldate"
      @GetRoom="GetRoom"
    ></DateHeader>
    <Menu
      :calmenu="this.calmenu"
      @calMenuOff="CalMenuOff"
      @GetRoom="GetRoom"
      @GetClass="GetClass"
    ></Menu>
    <div
      class="m_contents09 cf09"
      @touchstart="Start($event)"
      @touchmove="Move($event)"
    >
      <div class="week_cal_con">
        <div>
          <div class="week_cal_top"></div>
          <div class="time_area">
            <div class="scrl clfix">
              <div class="timeline">
                <ul>
                  <li v-for="(value, index) in range(0, 24)" :key="index">
                    {{ fill(2, value) }}:00
                  </li>
                </ul>
              </div>
              <div class="row_wrap">
                <div class="row">
                  <!-- v-for="(value, index) in daysSort"
                    :key="index" -->
                  <div class="col1">
                    <div class="col_wrap">
                      <div class="schedule_wrap" day-index="0">
                        <ul class="sec_line">
                          <li
                            v-for="(timev, timei) in 24"
                            @click="Write(timei)"
                            :key="timei"
                          ></li>
                        </ul>
                        <!-- <div
                          v-if="
                            GetSchedule.calList.week[value] &&
                            GetSchedule.calList.week[value].timeday
                          "
                        > -->
                        <div v-if="reservationList">
                          <div
                            v-for="(v, i) in reservationList"
                            :key="i"
                            class="schedule time_schedule"
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
        </div>
        <span class="now_line" :style="`top:${now}px`"></span>
      </div>
      <span class="today_btn" @click="Today">Today</span>
    </div>
    <div>
      <div class="ac_btns">
        <span class="more_plus"></span>
        <ul>
          <li class="top"><a>{{GetCommonL.up}}</a></li>
          <li @click="Write('')">
            <a class="agree">{{ lang.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import DateHeader from "./datepicker.vue";

import Menu from "./menu.vue";
import { mapState, mapGetters } from "vuex";
import moment from "moment";
export default {
  created() {
    this.lang = this.GetBookL.list;
    this.data = {};
    this.data.type = "reservationList";
    this.data.category = this.classList[0].code;
    this.data.roomId = this.roomList[0].code;
    this.Init();
  },
  mounted() {
    // window.scroll({ top: this.min, behavior: "smooth" });
    var scrollentity = $("html,body");
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      scrollentity = $("html");
    }
    scrollentity.animate({ scrollTop: this.min }, 500);
  },
  computed: {
    ...mapGetters("calendarjs", ["GetSchedule"]),
    ...mapState("bookjs", ["roomList", "classList", "reservationList"]),
  },
  components: {
    Menu,
    DateHeader,
  },
  data() {
    return {
      now: 74.88,
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
      check: false,
    };
  },
  methods: {
    range(min, max) {
      var array = [],
        j = 0;
      for (var i = min; i <= max; i++) {
        array[j] = i;
        j++;
      }
      return array;
    },
    Write(time) {
      this.$store.commit("bookjs/isEdit", false);
      var datestr = this.replaceAll(this.fulldate, ".", "-");
      //   this.$store.commit("calendarjs/isEdit", false);
      this.$router.push({
        name: "reservationWrite",
        query: { data: JSON.stringify({ date: datestr, starttime: time }) },
      });
    },
    timeStyle(value) {
      var s = moment(`2000-01-01 ${value.startTime}`,"YYYYMMDDHHmmss");
      var start = s.valueOf();
      var startmin = s.minutes();
      var starth = s.hours();
      var end = moment(`2000-01-01 ${value.endTime}`,"YYYYMMDDHHmmss").valueOf();
      var elapsed = (end - start) / 1000 / 60;
      return `top: ${
        startmin+starth*60
      }px;height: ${elapsed}px`;
    },
    Start(e) {
      this.startX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
      this.check = true;
    },
    Move(e) {
      this.nowclientX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
      if (this.nowclientX - this.startX > 100 && this.check) {
        this.MoveChange(-1);
        this.check = false;
      } else if (this.nowclientX - this.startX < -100 && this.check) {
        this.MoveChange(1);
        this.check = false;
      }
      // this.nowclientY = e.touches[0].pageY - e.touches[0].target.offsetTop;
    },
    MoveChange(arg) {
      var moment = require("moment");
      // var redate = this.fulldate.replaceAll(".", "/");
      var redate = this.replaceAll(this.fulldate, ".", "/");
      if (arg > 0) {
        this.fulldate = moment(redate).add("7", "d").format("YYYY.MM.DD");
      } else {
        // -1
        this.fulldate = moment(redate).subtract("7", "d").format("YYYY.MM.DD");
      }
      this.year = parseInt(this.fulldate.split(".")[0]);
      this.month = parseInt(this.fulldate.split(".")[1]);
      this.today = parseInt(this.fulldate.split(".")[2]);

      // redate = this.fulldate.replaceAll(".", "/");
      redate = this.replaceAll(this.fulldate, ".", "/");
      var currentDay = new Date(redate);
      this.theDayOfWeek = currentDay.getDay();

      this.SetthisWeek();
      // ***************
      this.data.date = this.replaceAll(this.fulldate, ".", "-");
      this.$store.dispatch("bookjs/reservationList", this.data);
    },
    Today() {
      this.Init();
    },
    Init() {
      var currentDay = new Date();
      this.currentYear = currentDay.getFullYear();
      this.currentMonth = currentDay.getMonth() + 1;
      this.hour = currentDay.getHours(); //시간
      this.min = currentDay.getMinutes(); //분
      this.min += this.hour * 60;
      this.now = this.min + 74.88;

      this.year = this.currentYear;
      this.month = this.currentMonth;
      this.today = currentDay.getDate();
      this.currentDay = this.today;
      this.theDayOfWeek = currentDay.getDay();
      this.fulldate = `${this.year}.${this.fill(2, this.month)}.${this.fill(
        2,
        this.today
      )}`;

      this.SetthisWeek();

      //   ****************************
      this.data.date = this.replaceAll(this.fulldate, ".", "-");
      // this.$store.dispatch("bookjs/reservationList", this.data);
    },
    calendarData(arg) {
      var now = new Date();
      this.hour = now.getHours(); //시간
      this.min = now.getMinutes(); //분
      this.min += this.hour * 60;
      this.now = this.min + 74.88;
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
      // var redate = this.fulldate.replaceAll(".", "/");
      var redate = this.replaceAll(this.fulldate, ".", "/");
      var currentDay = new Date(redate);
      this.theDayOfWeek = currentDay.getDay();
      this.SetthisWeek();

      //   ******************

      this.data.date = this.replaceAll(this.fulldate, ".", "-");
      this.$store.dispatch("bookjs/reservationList", this.data);
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
    CalMenu() {
      this.calmenu = true;
    },
    CalMenuOff() {
      this.calmenu = false;
    },
    changeDate(date) {
      this.year = parseInt(date.split(".")[0]);
      this.month = parseInt(date.split(".")[1]);
      this.today = parseInt(date.split(".")[2]);
      this.calendarData();
    },
    async Detail(value) {
      this.$store.commit("bookjs/SaveUnid", value.unid);
      this.$router.push({ name: "reservationRead" });
    },
    GetRoom(value) {
      if (value && value.length > 0) {
        this.data.roomId = value[0].code;
      }
      this.$store.dispatch("bookjs/reservationList", this.data);
    },
    GetClass({data,type}) {
      type=="floorList"?this.data.category = data.code:this.data.category=this.classList[0].code;
    },
  },
};
</script>

<style scoped>
.m_contents09{margin-top:12.605rem;}
</style>