<template>
  <div>
    <div class="cal_header">
      <h2 class="today_date">{{today}}</h2>
      <em>
        <a @click="RouterBack"
          ><img src="../../mobile/img/m_edit_icon01.png" alt=""
        /></a>
      </em>
    </div>
    <div class="m_contents08">
      <ul class="cal_view" v-if="this.GetSaveScheduleList.data.length>0">
        <li @click="Detail(value)" v-for="(value,index) in this.GetSaveScheduleList.data" :key="index">
          <a>
            <dl>
              <dt v-if="value.name =='allday'">종일</dt>
              <dt v-else>{{value.data.starttime.split(":")[0]}}:{{value.data.starttime.split(":")[1]}} ~ {{value.data.endtime.split(":")[0]}}:{{value.data.endtime.split(":")[1]}}</dt>
              
              <dd>{{value.data.subject}}</dd>
            </dl>
          </a>
        </li>
      </ul>
      <div class="no_schedule" v-if="this.GetSaveScheduleList.data.length===0">
        <div>
          <span></span>
          <p>등록된 일정이 없습니다.<br />일정을 등록하세요</p>
        </div>
      </div>
    </div>
    <span class="w_cal_btn"><a href="./mob_wmail.html"></a></span>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("calendar",["GetSaveScheduleList"]),
  },
  created() {
    console.log(this.GetSaveScheduleList)
    var date = this.GetSaveScheduleList.date;

    this.today = `${date.year}.${this.fill(2, date.month)}.${this.fill(
      2,
      date.day
    )} (${this.days[date.date]})`;
  },
  data() {
    return {
      today: "",
      days: [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토",
      ],
    };
  },
  methods: {
      // 전 url 이동
    RouterBack() {
      this.$router.go(-1);
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
    async Detail(value){
      console.log(value)
      this.$store.commit("calendar/SaveScheduleUnid",{unid:value.data.unid,where:"month"});
      // await this.$store.dispatch("CalDetail",{data:value.data,path:this.$route.path,which:"month"});
      this.$router.push("/schedule/read");

    },
  },
};
</script>

<style>
</style>