<template>
  <div class="m_calendar">
    <strong desc="일정">{{ portlet.schedule }}</strong>
    <div class="clfix">
      <span class="d_day">
        <em>{{ changeDate().yearmonth }}</em>
        <b>{{ changeDate().day }}</b>
      </span>
      <div class="ri_info">
        <div  v-for="(value, name) in sliceDate()"
            :key="name">
        <div v-if="value.allDay" class="all_cal" >
            <a href="#">
                <em>종일 일정</em>
                <p>[{{ value.category }}]{{ value.subject }}</p>
            </a>
        </div>
        </div>
        <ul class="c_list" v-if="sliceDate().length > 0">
          <li
            :class="[{ red: name === 0 }]"
            v-for="(value, name) in sliceDate()"
            :key="name"
          >
            <a v-if="!value.allDay" @click="Detail(value)">
              <em>{{value.time}}</em>
              <p>{{ value.subject }}</p>
            </a>
          </li>
        </ul>
        <ul class="c_list" v-else>
          결과가 없습니다.
        </ul>
      </div>
    </div>
    <span class="m_more"><router-link to="/schedule_more"></router-link></span>
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
    ...mapGetters("mainjs",["GetMain"]),
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
      result.yearmonth = moment().format("YYYY.MM");
      result.day = moment().format("DD");
      // }
      return result;
    },
    async Detail(value){
      this.$store.commit("calendarjs/SaveScheduleUnid",{unid:value.unid,where:"month"});
      // await this.$store.dispatch("CalDetail",{data:value.data,path:this.$route.path,which:"month"});
      this.$router.push("/schedule_more/read");

    },
  },
};
</script>

<style>
</style>