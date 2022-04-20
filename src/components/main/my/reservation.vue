<template>
  <div class="m_calendar">
    <strong desc="자원예약">{{ portlet.title }}</strong>
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
          <!-- <div v-for="(value, name) in sliceDate()" :key="name">
          <div v-if="value.allDay" class="all_cal">
            <a @click="Detail(value)">
              <em>종일 일정</em>
              <p>[{{ value.category }}]{{ value.subject }}</p>
            </a>
          </div>
        </div> -->
          <ul class="c_list" v-if="sliceDate().length > 0">
            <li :class="[{ red: name === 0 }]">
              <a @click="Detail(value)">
                <em>{{ value.time }}</em>
                <p>[{{ value.roomName }}] {{ value.subject }}</p>
              </a>
            </li>
          </ul>
          <!-- <ul class="c_list" v-else>
          <li><p>{{lang.result}}</p></li>
        </ul> -->
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
      ><router-link :to="{ name: 'reservation' }"></router-link
    ></span>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

import { mapGetters, mapState } from "vuex";
export default {
  created() {
    var moment = require("moment");
    var today = moment().format("YYYY-MM-DD");
    this.$store.dispatch("bookjs/MyreservationList", today);
    this.lang = this.GetMainLanguage.main;
  },
  components: { VueSlickCarousel },

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
  computed: {
    ...mapGetters("mainjs", ["GetMain"]),
    ...mapState("bookjs", ["MyreservationList"]),
    ...mapGetters(["GetMainLanguage"]),
  },
  methods: {
    sliceDate() {
      // 오늘의 모든 일정
      var moment = require("moment");
      var date = this.MyreservationList;
      for (var i = 0; i < date.length; i++) {
        for (var j = i + 1; j < date.length; j++) {
          let aend = parseInt(
            moment("2000-01-01T" + date[i].endTime).format("HHmmss")
          );
          let bend = parseInt(
            moment("2000-01-01T" + date[j].endTime).format("HHmmss")
          );
          if (aend > bend) {
            //내림차순
            var tmp = date[i];
            date[i] = date[j];
            date[j] = tmp;
          }
        }
      }
      var result = [];
      for (var i = 0; i < date.length; i++) {
        // 지금시간보다 일정의 끝나는 시간이 늦을경우 출력
        var enddate = moment(date[i].endDate).format("YYYY-MM-DD");
        if (
          parseInt(moment(enddate + "T" + date[i].endTime).format("HHmmss")) >
          parseInt(moment().format("HHmmss"))
        ) {
          var time = `${moment("2000-01-01T" + date[i].startTime).format(
            "HH:mm"
          )}~${moment("2000-01-01T" + date[i].endTime).format("HH:mm")}`;
          date[i].time = time;
          result.push(date[i]);
          if (result.length === this.GetMain.scheduletype.recent.my.size) {
            break;
          }
        }
      }
      return result;
    },
    // sliceDate() {
    //   var moment = require("moment");
    //   // 오늘의 모든 일정
    //   var date = this.MyreservationList;
    //   var today = moment().format("YYYY-MM-DD");
    //   date = date.filter((item, idx) => {
    //     var start = moment(item.startDate);
    //     var end = moment(item.endDate);

    //     if (start === end && start === today) {
    //       return true;
    //     }
    //     var diff = end.diff(start, "days");
    //     for (var i = 0; i < diff; i++) {
    //       var d = moment(start).add(i, "days").format("YYYY-MM-DD");
    //       if (d === today) {
    //         return true;
    //       }
    //     }
    //     return false;
    //   });
    //     var result = [];
    //     for (var i = 0; i < date.length; i++) {
    //       // 지금시간보다 일정의 끝나는 시간이 늦을경우 출력
    //       if (
    //         parseInt(
    //           moment(date[i].startDate + "T" + date[i].endTime).format("HHmmss")
    //         ) > parseInt(moment().format("HHmmss"))
    //       ) {

    //         var time = `${moment(date[i].startDate + "T" + date[i].startTime).format(
    //           "HH:mm"
    //         )}~${moment(date[i].startDate + "T" + date[i].endTime).format(
    //           "HH:mm"
    //         )}`;

    //         date[i].time = time;
    //         result.push(date[i]);
    //         if (result.length === this.GetMain.scheduletype.recent.my.size) {
    //           break;
    //         }
    //       }
    //     }
    //   return result;
    // },
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
      this.$store.commit("bookjs/SaveUnid", value.unid);
      this.$router.push({ name: "reservationRead" });
    },
  },
};
</script>

<style>
</style>