<template>
  <div>
    <div class="rdcal_header">
      <em
        ><a @click="RouterBack"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></a
        >{{ lang.schedule }}</em
      >
      <div
        v-if="this.GetMyInfo.info.notesid == this.calData.authorId"
        class="rdcal_icons"
      >
        <span class="rdcal_edit fw_bold"
          ><a @click="Edit()">{{ lang.modify }}</a></span
        >
        <span class="rdcal_edit_del fw_bold" @click="Del">{{
          lang.remove
        }}</span>
      </div>
    </div>
    <div class="m_contents08 srl">
      <div class="con_body_top">
        <span>{{ calData.subject }}</span>
        <em v-if="Option().inotes"
          ><b class="cate">{{ calData.category }}</b>  &nbsp;
          <b class="open" v-if="calData.dispAuthor">
          {{calData.dispAuthor}}</b>
          <b class="open" v-else>{{ calData.secret }}</b></em
        ><em v-else>
          <b class="cate">{{ calData.category }}</b>  &nbsp;
          <b class="open" v-if="calData.dispAuthor">
          {{calData.dispAuthor}}</b>
        </em>
      </div>
      <ul class="rd_list">
        <li>
          <span>{{ lang.date }}</span>
          <div>{{ this.params.date }}</div>
        </li>
        <li
          v-if="!(calData.category == '기념일' || calData.category == '행사')"
        >
          <span>{{ lang.time }}</span>
          <div>{{ this.params.time }}</div>
        </li>
        <li v-if="Option().inotes">
          <span>{{ lang.where }}</span>
          <div>
            {{ this.calData.place }}
          </div>
        </li>
        <li v-if="calData.sendTo.length > 0">
          <span>{{ lang.send }}</span>
          <div>
            <em
              class="per_item"
              v-for="(value, index) in calData.sendTo"
              :key="index"
              >{{ value.name }}</em
            >
          </div>
        </li>
        <li v-if="calData.copyTo.length > 0">
          <span>{{ lang.copy }}</span>
          <div>
            <em
              class="per_item"
              v-for="(value, index) in calData.copyTo"
              :key="index"
              >{{ value.name }}</em
            >
          </div>
        </li>
        <li v-if="calData.attachInfo.length > 0" class="cal_add_file">
          <span>{{ lang.attach }}<em class="file_more"></em></span>
          <Viewer
            className=""
            :attaInfo="calData.attachInfo"
            :attach="true"
            :unid="calData.unid"
          ></Viewer>
        </li>
      </ul>
      <div class="rdm_edit">
        <Body
          class="cal_info"
          style="height: 100%"
          id="memo_t"
          :body="GetSchedule.calDetail[GetSaveSchedule.detail.where].body"
          :bodyurl="GetSchedule.calDetail[GetSaveSchedule.detail.where].bodyurl"
          ref="Body"
          :read="true"
          did="calendar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  created() {
    this.lang = this.GetScheduleL.read;
    this.daysSort = this.lang.daySort.split(",");

    this.calData =
      this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where];
    var date = this.calData.startdate;
    var redate = this.replaceAll(date, "-", "/");
    var currentDay = new Date(redate);
    var theDayOfWeek = currentDay.getDay();
    this.params = JSON.parse(this.$route.query.data);

    this.today =
      this.replaceAll(date, "-", ".") + `(${this.daysSort[theDayOfWeek]})`;
  },
  computed: {
    ...mapGetters("calendarjs", [
      "GetSchedule",
      "GetSaveSchedule",
      "GetSaveScheduleList",
    ]),
    ...mapGetters("mainjs", ["GetMyInfo"]),
  },
  data() {
    return {
      today: "",
    };
  },
  methods: {
    async Del() {
      var data = {};
      data.unid = this.GetSaveSchedule.detail.unid;

      await this.$store.dispatch("calendarjs/CalDelete", data);
      this.$router.push({ name: `cal${this.GetSaveSchedule.detail.where}` });
    },
    // 전 url 이동
    RouterBack() {
      this.$router.go(-1);
    },
    TransTime() {
      // 15:00 ~ 16:00
      var end =
        this.calData.endtime.split(":")[0] +
        ":" +
        this.calData.endtime.split(":")[1];
      var start =
        this.calData.starttime.split(":")[0] +
        ":" +
        this.calData.starttime.split(":")[1];
      return `${start} ~ ${end}`;
    },
    TransDate() {
      // 2021-05-24(월)
      var end = this.calData.enddate;
      var start = this.calData.startdate;

      var day = "";

      var arrend = end.split("-");
      if (end === start) {
        day =
          end +
          `(${
            this.daysSort[
              new Date(arrend[0], arrend[1] - 1, arrend[2], 0, 0, 0).getDay()
            ]
          })`;
      } else {
        var arrstart = start.split("-");
        day =
          start +
          `(${
            this.daysSort[
              new Date(
                arrstart[0],
                arrstart[1] - 1,
                arrstart[2],
                0,
                0,
                0
              ).getDay()
            ]
          })` +
          end +
          `(${
            this.daysSort[
              new Date(arrend[0], arrend[1] - 1, arrend[2], 0, 0, 0).getDay()
            ]
          })`;
      }
      return day;
    },
    Edit() {
      this.$store.commit("calendarjs/isEdit", true);
      this.$router.push({
        name: "calwrite",
        query: {
          data: JSON.stringify({
            date: this.params.date,
            starttime: this.calData.starttime.split(":")[0],
          }),
        },
      });
    },
  },
};
</script>

<style>
.rd_list > li div .per_item {
  display: inline-block;
  position: relative;
  font-size: 0.93rem;
  color: #444;
  background: #f3f3f3;
  border-radius: 0.93rem;
  text-align: center;
  padding: 0 0.56rem;
  line-height: 1.81rem;
  margin: 0 0.18rem;
}
</style>