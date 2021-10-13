<template>
  <div>
    <date-header
      @ChangeDate="changeDate"
      @calMenu="CalMenu"
      :date="fulldate"
      @cNext="calendarData(1)"
      @cPrev="calendarData(-1)"
      @change="DateChange($event)"
    ></date-header>
    <Header :calmenu="this.calmenu" @calMenuOff="CalMenuOff"></Header>
    <div
      class="m_contents08"
      @touchstart="Start($event)"
      @touchmove="Move($event)"
    >
      <table>
        <thead>
          <tr>
            <th class="holiday"><em>SUN</em></th>
            <th><em>MON</em></th>
            <th><em>TUE</em></th>
            <th><em>WED</em></th>
            <th><em>THU</em></th>
            <th><em>FRI</em></th>
            <th class="sat"><em>SAT</em></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(date, idx) in dates" :key="idx">
            <td v-for="(day, secondIdx) in date" :key="secondIdx">
              <a
                ref="open"
                @click.stop="
                  Detail(
                    day,
                    dates.length - 1 === idx && nextMonthStart > day,
                    idx === 0 && day >= lastMonthStart,
                    secondIdx
                  )
                "
              >
                <div
                  :class="{
                    last_month: idx === 0 && day >= lastMonthStart,
                    next_month:
                      dates.length - 1 === idx && nextMonthStart > day,
                    t_day:
                      day === today &&
                      month === month &&
                      year === year &&
                      !(dates.length - 1 === idx && nextMonthStart > day) &&
                      !(idx === 0 && day >= lastMonthStart),
                    sat: days.length - 1 === secondIdx,
                    sun: secondIdx === 0,
                    holiday:
                      isHoliday(day).boo &&
                      !(dates.length - 1 === idx && nextMonthStart > day) &&
                      !(idx === 0 && day >= lastMonthStart),
                  }"
                >
                  <em>{{ day }}</em>
                </div>
                <span
                  v-if="
                    isHoliday(day).boo &&
                    !(dates.length - 1 === idx && nextMonthStart > day) &&
                    !(idx === 0 && day >= lastMonthStart)
                  "
                  class="hol_event"
                  >{{ isHoliday(day).name }}</span
                >
                <span
                  @click.stop="oneDetail(value.data)"
                  v-for="(value, index) in isAllday(
                    day,
                    dates.length - 1 === idx && nextMonthStart > day,
                    idx === 0 && day >= lastMonthStart
                  )"
                  :key="index"
                  :class="[
                    { all_day: value.data.allDay },
                    { time_day: !value.data.allDay },
                  ]"
                  >{{ value.data.subject }}</span
                >
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <span class="today_btn" @click="Today">Today</span>
    </div>
    <CalWrite></CalWrite>
  </div>
</template>

<script>
import Header from "./header.vue";
import { mapState, mapGetters } from "vuex";
import DateHeader from "./datepicker.vue";
import CalWrite from "./calWBtn.vue";
export default {
  components: {
    Header,
    DateHeader,
    CalWrite,
  },
  created() {
    this.Init();
  },
  data() {
    return {
      calmenu: false,
      days: [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
      ],
      selectedMonth: null,
      dates: [],
      currentYear: 0,
      currentMonth: 0,
      year: 0,
      month: 0,
      premonth: 0,
      lastMonthStart: 20,
      nextMonthStart: 0,
      today: 0,
      fulldate: "",
      nowclientY: 0,
      nowclientX: 0,
      startX: 0,
      endX: 0,
      check: false,
      lastMonth: 0,
      lastYear: 0,
      islist: false,
    };
  },
  computed: {
    ...mapGetters("calendarjs", ["GetSchedule"]),
  },
  methods: {
    isAllday(day, next, last) {
      var calList = this.GetSchedule.calList.month;
      var callist = [];

      for (var i = 0; i < calList.length; i++) {
        var startdate = calList[i].startdate.replaceAll("-", "/");
        var enddate = calList[i].enddate.replaceAll("-", "/");
        let start = Math.floor(+new Date(startdate) / 1000);
        let end = Math.floor(+new Date(enddate) / 1000);

        var isOneDay = false;
        if (start - end === 0) isOneDay = true;

        var thisdate = "";
        var month = this.month;

        if (next) {
          month += 1;
        } else if (last) {
          month -= 1;
        }
        thisdate = `${this.year}/${this.fill(2, month)}/${this.fill(2, day)}`;
        let current = Math.floor(+new Date(thisdate) / 1000);
        var data = {};
        data.name = "";
        data.boo = false;
        if (isOneDay && current === start) {
          // timeday
          //
          data.name = "timeday";
          data.data = calList[i];
          data.boo = true;
          callist.push(data);
        } else {
          if (current === start || current == end) {
            //
            data.name = "timeday";
            data.boo = true;
            data.data = calList[i];
            callist.push(data);
          } else if (start < current && end > current) {
            //
            data.name = "allday";
            data.boo = true;
            data.data = calList[i];
            callist.push(data);
          }
        }
      }

      return callist;
    },
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
    CalMenu() {
      this.calmenu = true;
    },
    CalMenuOff() {
      this.calmenu = false;
    },
    isHoliday(day) {
      var data = {};
      const holiday = this.GetSchedule.holiday;

      if (Object.keys(holiday).length > 0 && Array.isArray(holiday)) {
        // 여러개일때
        for (var i = 0; i < holiday.length; i++) {
          if (parseInt(String(holiday[i].locdate).substring(6)) == day) {
            data.boo = true;
            data.name = holiday[i].dateName;
            return data;
          }
        }
        data.boo = false;
        return data;
      } else if (Object.keys(holiday).length > 0) {
        // 하나일때
        if (parseInt(String(holiday.locdate).substring(6)) == day) {
          data.boo = true;
          data.name = holiday.dateName;
          return data;
        }
        data.boo = false;
        return data;
      } else {
        data.boo = false;
        return data;
      }
    },
    showDate(date) {
      this.date = date;
    },
    async calendarData(arg) {
      // var moment = require("moment");
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
      // alert(this.fulldate)

      // this.selectedMonth = moment(`${this.year}/${this.month}`, "yyyyMM");
      await this.Rest();
      this.premonth = this.month;
      const [monthFirstDay, monthLastDate, lastMonthLastDate] =
        this.getFirstDayLastDate(this.year, this.month);
      this.dates = this.getMonthOfDays(
        monthFirstDay,
        monthLastDate,
        lastMonthLastDate
      );
    },
    getFirstDayLastDate(year, month) {
      const firstDay = new Date(year, month - 1, 1).getDay();
      const lastDate = new Date(year, month, 0).getDate();
      this.lastYear = year;
      this.lastMonth = month - 1;
      if (month === 1) {
        this.lastMonth = 12;
        this.lastYear -= 1;
      }
      const prevLastDate = new Date(this.lastYear, this.lastMonth, 0).getDate();
      return [firstDay, lastDate, prevLastDate];
    },
    getMonthOfDays(monthFirstDay, monthLastDate, prevMonthLastDate) {
      let day = 1;
      let prevDay = prevMonthLastDate - monthFirstDay + 1;
      var start = "";
      if (monthFirstDay > 0) {
        // 전달거
        start = `${this.lastYear}-${this.fill(2, this.lastMonth)}-${this.fill(
          2,
          prevDay
        )}`;
      } else {
        // 이번달거
        // start = 1;
        start = `${this.year}-${this.fill(2, this.month)}-01`;
      }
      const dates = [];
      let weekOfDays = [];
      while (day <= monthLastDate) {
        if (day === 1) {
          for (let j = 0; j < monthFirstDay; j += 1) {
            if (j === 0) this.lastMonthStart = prevDay;
            weekOfDays.push(prevDay);
            prevDay += 1;
          }
        }
        weekOfDays.push(day);
        if (weekOfDays.length === 7) {
          dates.push(weekOfDays);
          weekOfDays = [];
        }
        day += 1;
      }
      const len = weekOfDays.length;
      var last = "";
      if (len > 0 && len < 7) {
        // last = len + 1;
        last = `${this.year}-${this.fill(2, this.month + 1)}-${this.fill(
          2,
          7 - len
        )}`;
        // 다음달거
        for (let k = 1; k <= 7 - len; k += 1) {
          weekOfDays.push(k);
        }
      } else {
        // last = monthLastDate;
        last = `${this.year}-${this.fill(2, this.month)}-${this.fill(
          2,
          monthLastDate
        )}`;
        // 이번달거
      }
      var data = {};
      data.start = start;
      data.end = last;
      data.today = this.fulldate;
      this.$store.dispatch("calendarjs/CalList", { data, which: "month" });
      if (weekOfDays.length > 0) dates.push(weekOfDays);
      this.nextMonthStart = weekOfDays[0];
      return dates;
    },
    DateChange(e) {
      if (e) {
        this.year = parseInt(e["_i"].split(".")[0]);
        this.month = parseInt(e["_i"].split(".")[1]);

        this.calendarData();
      }
    },
    Today() {
      this.Init();
    },
    Init() {
      const date = new Date();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.year = this.currentYear;
      this.month = this.currentMonth;

      this.today = date.getDate();
      this.fulldate = `${this.year}.${this.fill(2, this.month)}.${this.fill(
        2,
        this.today
      )}`;

      this.calendarData();
      return;
    },
    Rest() {
      if (this.premonth !== this.month) {
        var data = {};
        data.year = this.year;
        data.month = this.fill(2, this.month);
        data.menu = "holiday";

        this.$store.dispatch("calendarjs/Holiday", data);
      }
      return;
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
    changeDate(date) {
      // alert("changeDate")
      this.year = parseInt(date.split(".")[0]);
      this.month = parseInt(date.split(".")[1]);
      this.today = parseInt(date.split(".")[2]);

      this.calendarData();
    },
    async Detail(day, next, last, yuil) {
      var data = await this.isAllday(day, next, last);
      var m = this.month;

      if (next) {
        m += 1;
      } else if (last) {
        m -= 1;
      }

      var result = {};
      result.month = m;
      result.year = this.year;
      result.day = day;
      result.date = yuil;

      var datestr = `${result.year}-${this.fill(2, result.month)}-${this.fill(
        2,
        result.day
      )}`;

      await this.$store.commit("calendarjs/SaveScheduleList", {
        data,
        date: result,
      });
      // this.$emit("calListOpen",true);
      this.$store.commit("calendarjs/calListOpen", {
        status: true,
        date: datestr,
        day: yuil,
      });

      // this.$router.push({
      //   name: "callist",
      //   params: { date: datestr, day: yuil },
      // });
    },
    oneDetail(value) {
      this.$store.commit("calendarjs/SaveScheduleUnid", {
        unid: value.unid,
        where: "month",
      });
      // await
      this.$router.push({
        name: "calread",
        query: {data:JSON.stringify({
          date: value.enddate,
          time: `${value.starttime} ~ ${value.endtime}`,
        })},
      });
    },
  },
};
</script>

<style>
</style>