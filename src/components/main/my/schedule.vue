<template>
  <div class="m_calendar">
    <strong desc="일정">{{ portlet.title }}</strong>

    <div class="clfix">
      <span class="d_day">
        <em>{{ changeDate().yearmonth }}</em>
        <b>{{ changeDate().day }}</b>
      </span>

      <VueSlickCarousel
        class="ScheduleCarousel"
        v-bind="settings"
        v-if="sliceDate().length > 0"
      >
        <div class="ri_info" v-for="(value, name) in sliceDate()" :key="name">
          <div>
            <div v-if="value.allDay" class="all_cal">
              <a @click="Detail(value)">
                <em>{{ lang.allday }}</em>
                <p>[{{ value.category }}]{{ value.subject }}</p>
              </a>
            </div>
          </div>
          <ul class="c_list" v-if="!value.allDay">
            <li :class="[{ red: name === 0 }]">
              <a v-if="!value.allDay" @click="Detail(value)">
                <em>{{ value.time }}</em>
                <p>{{ value.subject }}</p>
              </a>
            </li>
          </ul>
        </div>
      </VueSlickCarousel>
      <div class="ri_info" v-if="sliceDate().length == 0">
        <ul class="c_list">
          <li>
            <p>{{ lang.result }}</p>
          </li>
        </ul>
      </div>
    </div>

    <span class="m_more"
      ><router-link :to="{ name: 'schedule' }"></router-link
    ></span>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import cjson from "@/config/cal.json"
import { mapGetters } from "vuex";
export default {
  created() {
    this.$store.dispatch("mainjs/GetSchedule", {
      scheduletype: "recent",
      category: "my",
    });

    this.lang = this.GetMainLanguage.main;
  },
  props: ["portlet"],
  data() {
    return {
      yearmonth: "",
      day: "",
      settings: {
        slidesToShow: 1,
        arrows: false,
        dots: true,
        touchMove: true,
      },
    };
  },
  components: { VueSlickCarousel },
  computed: {
    ...mapGetters("mainjs", ["GetMain"]),
    ...mapGetters(["GetMainLanguage"]),
  },
  methods: {
    // 오늘의 모든 일정을 노드에서 가져온 후의 현재 시간 이후의 데이터를 색출
    sliceDate() {
      var moment = require("moment");
      let today = moment().format("YYYY-MM-DD");

      // 오늘의 모든 일정
      const date = this.GetMain.scheduletype.recent.my.data;
      var result = [];
      for (var i = 0; i < date.length; i++) {
        var end = date[i].enddate + "T" + date[i].endtime;
        var start = date[i].startdate + "T" + date[i].starttime;
          // && parseInt(moment(end).format("HHmmss")) >
          //   parseInt(moment().format("HHmmss"))
        if (
          today == moment(start).format("YYYY-MM-DD") 
        ) {
          var time = `${moment(start).format("HH:mm")}~${moment(end).format(
            "HH:mm"
          )}`;
          date[i].time = time;
          result.push(date[i]);
          if(result.length>cjson.size){
            break;
          }
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
.ScheduleCarousel .slick-dots {
  text-align: center;
  font-size: 0;
  margin-top: 1.56rem;
}
.ScheduleCarousel .slick-dots li {
  display: inline-block;
  width: 0.56rem;
  height: 0.56rem;
  border-radius: 50%;
  background: #dadadd;
}
.ScheduleCarousel .slick-dots li.slick-active {
  background: var(--main-bg-color);
}
.ScheduleCarousel .slick-dots li + li {
  margin-left: 0.31rem;
}
.ScheduleCarousel .slick-dots li button {
  font-size: 0;
  border: 0;
  outline: 0;
}
</style>