<template>
  <div class="m_calendar">
    <strong desc="일정">{{ portlet.schedule }}</strong>
    <div class="clfix">
      <span class="d_day">
        <em>{{ changeDate().yearmonth }}</em>
        <b>{{ changeDate().day }}</b>
      </span>
      <ul class="c_list" v-if="sliceDate().length > 0">
        <li
          :class="[{ red: name === 0 }]"
          v-for="(value, name) in sliceDate()"
          :key="name"
        >
          <a>
            <em>{{value.time}}</em>
            <p>{{ value.subject }}</p>
          </a>
        </li>
      </ul>
      <ul class="c_list" v-else>
        결과가 없습니다.
      </ul>
    </div>
    <span class="m_more"><a></a></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["portlet"],
  data() {
    return {
      yearmonth: "",
      day: "",
    };
  },
  computed: {
    ...mapGetters(["GetMain"]),
  },
  methods: {
    // 오늘의 모든 일정을 노드에서 가져온 후의 현재 시간 이후의 데이터를 색출
    sliceDate() {
      var moment = require("moment");
      // 오늘의 모든 일정
      const date = this.GetMain.scheduletype.recent.my.data;
      var result = [];
      for (var i = 0; i < date.length; i++) {
        // 지금시간보다 일정의 끝나는 시간이 늦을경우 출력
        if (
          parseInt(
            moment(date[i].startdate + "T" + date[i].endtime).format("HHmmss")
          ) > parseInt(moment().format("HHmmss"))
        ) {
          
          var time = `${moment(
            date[i].startdate + "T" + date[i].starttime
          ).format("HH:mm")}~${moment(
            date[i].startdate + "T" + date[i].endtime
          ).format("HH:mm")}`;

          time = `${moment(date[i].startdate + "T" + date[i].starttime).format(
            "HH:mm"
          )}~${moment(date[i].startdate + "T" + date[i].endtime).format(
            "HH:mm"
          )}`;

          date[i].time = time;
          result.push(date[i]);
          if(result.length === this.GetMain.scheduletype.recent.my.size){
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
      // var now = moment().format("YYYYMMDDTHHmmss");
      // moment(now).format("YYYYMMDD");
      // if (date.length > 0) {
      //   var start = parseInt(moment(date[0].startdate).format("YYYYMMDD"));
      //   var end = parseInt(moment(date[0].enddate).format("YYYYMMDD"));
      //   var nowTime = parseInt(moment().format("YYYYMMDD"));
      //   // 일정이 하루에서 끝나지 않는다면
      //   if (start !== end) {
      //     console.log("일정이 하루에서 끝나지 않는다면");
      //     var starttime = parseInt(moment(start).format("YYYYMMDD"));
      //     var enddate = parseInt(moment(end).format("YYYYMMDD"));
      //     // 일정 중간이 오늘이면 오늘 빨간색
      //     if (starttime <= nowTime || nowTime <= enddate) {
      //       console.log("일정 중간이 오늘이면 오늘 빨간색");
      //       result.yearmonth = moment().format("YYYY.MM");
      //       result.day = moment().format("DD");
      //     }
      //   } else {
      //     // 오늘 날짜와 같다면 startdate 빨간색
      //     // 오늘 날짜와 다르다면 startdate 빨간색
      //     console.log("오늘날짜와 같거나 다름")
      //     result.yearmonth = moment(date[0].startdate).format("YYYY.MM");
      //     result.day = moment(date[0].startdate).format("DD");
      //   }
      // } else {
      result.yearmonth = moment().format("YYYY.MM");
      result.day = moment().format("DD");
      // }
      return result;
    },
  },
};
</script>

<style>
</style>