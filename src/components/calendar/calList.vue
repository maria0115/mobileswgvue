<template>
  <div>
    <div class="cal_header">
      <h2 class="today_date">{{ dateconvert() }}</h2>
      <em>
        <a @click="RouterBack"
          ><img src="../../mobile/img/m_edit_icon01.png" alt=""
        /></a>
      </em>
    </div>
    <div class="m_contents08">
      <ul class="cal_view" v-if="this.GetSaveScheduleList.data.length > 0">
        <li
          @click="Detail(value)"
          v-for="(value, index) in this.GetSaveScheduleList.data"
          :key="index"
        >
          <a>
            <dl>
              <dt v-if="value.data.allDay">{{lang.allday}}</dt>
              <dt v-else>
                {{ value.data.starttime.split(":")[0] }}:{{
                  value.data.starttime.split(":")[1]
                }}
                ~ {{ value.data.endtime.split(":")[0] }}:{{
                  value.data.endtime.split(":")[1]
                }}
              </dt>

              <dd>{{ value.data.subject }}</dd>
            </dl>
          </a>
        </li>
      </ul>
      <div class="no_schedule" v-else>
        <div>
          <span></span>
          <p>{{lang.havenotschedule}}<br />{{lang.beregister}}</p>
        </div>
      </div>
    </div>
    <CalWrite></CalWrite>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CalWrite from "./calWBtn.vue";
export default {
  computed: {
    ...mapGetters("calendarjs", ["GetSaveScheduleList"]),
  },
  components: {
    CalWrite,
  },
  created() {
    this.lang = this.GetScheduleL.list;
    this.days = this.lang.days.split(",");

    var date = this.GetSaveScheduleList.date;

    this.today = `${date.year}.${this.fill(2, date.month)}.${this.fill(
      2,
      date.day
    )} (${this.days[date.date]})`;
  },
  mounted() {
    this.params = JSON.parse(this.$route.query.data);
  },
  data() {
    return {
      today: "",
    };
  },
  methods: {
    dateconvert() {
      return `${this.params.date} (${this.days[this.params.day]})`;
    },
    // 전 url 이동
    RouterBack() {
      this.$router.go(-1);
    },
    async Detail(value) {
      this.$store.commit("calendarjs/SaveScheduleUnid", {
        unid: value.data.unid,
        where: "month",
      });
      // await this.$store.dispatch("CalDetail",{data:value.data,path:this.$route.path,which:"month"});
      this.$router.push({
        name: "calread",
        query: {data:JSON.stringify({
          date: value.data.enddate,
          time: `${value.data.starttime} ~ ${value.data.endtime}`,
        })},
      });
    },
  },
};
</script>

<style>
</style>