<template>
  <div>
    <date-header
      @ChangeDate="changeDate"
      @calMenu="CalMenu"
      :date="fulldate"
      @cNext="MoveChange(1)"
      @cPrev="MoveChange(-1)"
      @change="DateChange($event)"
    ></date-header>
    <Header :calmenu="this.calmenu" @calMenuOff="CalMenuOff"></Header>
    <div
      class="m_contents08"
      @touchstart="Start($event)"
      @touchmove="Move($event)"
      style="top: 0 !important;"
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
                :style="TopHeight"
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
                      day === currentDay &&
                      month === currentMonth &&
                      year === currentYear &&
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
                  v-for="(value, index) in alphaSize(
                    isAllday(
                      day,
                      dates.length - 1 === idx && nextMonthStart > day,
                      idx === 0 && day >= lastMonthStart
                    )
                  )"
                  :style="Style(value)"
                  :key="index"
                  :class="[
                    { all_day: value.data.allDay },
                    { time_day: !value.data.allDay },
                  ]"
                  >{{ value.data.subject }}</span
                >
                <span
                  v-if="
                    Option().alpha &&
                    isAllday(
                      day,
                      dates.length - 1 === idx && nextMonthStart > day,
                      idx === 0 && day >= lastMonthStart
                    ).length > Config().alphaSize
                  "
                  @click.stop="
                    Detail(
                      day,
                      dates.length - 1 === idx && nextMonthStart > day,
                      idx === 0 && day >= lastMonthStart,
                      secondIdx
                    )
                  "
                  class="time_day"
                  >+{{
                    isAllday(
                      day,
                      dates.length - 1 === idx && nextMonthStart > day,
                      idx === 0 && day >= lastMonthStart
                    ).length - Config().alphaSize
                  }}</span
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
import nowTime from "@/mixin/nowTime";
import CalWrite from "./calWBtn.vue";
export default {
  components: {
    Header,
    DateHeader,
    CalWrite,
  },
  created() {
    var language = this.GetScheduleL.cal;
    this.days = language.days.split(",");
    this.Init();
    this.$store.commit("calendarjs/SaveScheduleWhere", "month");
  },
  data() {
    return {
      selectedMonth: null,
      dates: [],
      premonth: 0,
      lastMonthStart: 20,
      nextMonthStart: 0,
      nowclientY: 0,
      nowclientX: 0,
      startX: 0,
      endX: 0,
      lastMonth: 0,
      lastYear: 0,
      islist: false,
      toprem: 2.187,
    };
  },
  mixins: [nowTime],

  computed: {
    ...mapGetters("calendarjs", ["GetSchedule"]),
    TopHeight() {
      var style = "";
      if (this.Option().alpha) {
        style = `height:${
          ((this.Config().alphaSize + 1) * 20) / 16 + this.toprem
        }rem`;
      }
      return style;
    },
  },
  methods: {
    isAllday(day, next, last) {
      var calList = this.GetSchedule.calList.month;
      var callist = [];

      for (var i = 0; i < calList.length; i++) {
        // var startdate = calList[i].startdate.replaceAll("-", "/");
        var startdate = this.replaceAll(calList[i].startdate, "-", "/");
        // var enddate = calList[i].enddate.replaceAll("-", "/");
        var enddate = this.replaceAll(calList[i].enddate, "-", "/");

        var start = Math.floor(+new Date(startdate) / 1000);
        var end = Math.floor(+new Date(enddate) / 1000);

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
        var current = Math.floor(+new Date(thisdate) / 1000);
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
    alphaSize(data) {
      if (this.Option().alpha) {
        data = data.slice(0, this.Config().alphaSize);
      }
      return data;
    },
    isHoliday(day) {
      var data = {};
      const holiday = this.GetSchedule.holiday;
      for (var i = 0; i < holiday.length; i++) {
        var harr = holiday[i].startdate.split("-");
        if (harr[harr.length - 1] == day) {
          data.boo = true;
          data.name = holiday[i].subject;
          return data;
        }
      }
      data.boo = false;
      return data;
    },
    showDate(date) {
      this.date = date;
    },
    MoveChange(arg) {
      this.fullSetting(arg);
      this.setFull();

      // this.Setting();
    },
    Setting() {
      this.setFull();
      this.Rest();
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
      const nextDate = new Date(year, month + 1, 0).getDate();

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
      var day = 1;
      var prevDay = prevMonthLastDate - monthFirstDay + 1;
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
      var weekOfDays = [];
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
      var nextmonth = this.month;
      var nextyear = this.year;

      if (len > 0 && len < 7) {
        if (this.month + 1 > 12) {
          nextmonth = 1;
          nextyear += 1;
        } else {
          nextmonth = this.month + 1;
        }
        // last = len + 1;
        last = `${nextyear}-${this.fill(2, nextmonth)}-${this.fill(
          2,
          7 - len
        )}`;
        // 다음달거
        for (let k = 1; k <= 7 - len; k += 1) {
          weekOfDays.push(k);
        }
      } else {
        // last = monthLastDate;
        last = `${nextyear}-${this.fill(2, nextmonth)}-${this.fill(
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

        this.Setting();
      }
    },
    Today() {
      this.Init();
    },
    Init() {
      this.InitForm();
      return;
    },
    Rest() {
      if (this.premonth !== this.month) {
        this.GetHoliday();
      }
      return;
    },
    changeDate(date) {
      this.SetDate(date);

      this.Setting();
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
        query: {
          data: JSON.stringify({
            date: value.enddate,
            time: `${value.starttime} ~ ${value.endtime}`,
          }),
        },
      });
    },
    Style(value) {
      if (!this.Option().inotes) {
        return { background: value.data.color, color: "#fff" };
      }
      return "";
    },
  },
};
</script>

<style>
</style>