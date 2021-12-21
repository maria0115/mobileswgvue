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
        <em
          ><b class="cate">{{ calData.category }}</b>
          /
          <b class="open">{{ calData.secret }}</b></em
        >
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
        <li>
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
        <li v-if="calData.attachInfo.length > 0">
          <span>{{ lang.attach }}</span>
          <ul class="file_list" v-if="!sat">
            <li v-for="(value, index) in calData.attachInfo" :key="index">
              <a :href="value.url" download>
                {{ value.name }}
              </a>
            </li>
          </ul>
          <Viewer
            v-else
            className="file_list"
            :attaInfo="calData.attachInfo"
            :attach="true"
          ></Viewer>
        </li>
      </ul>
      <!-- <div class="cal_info" v-html="GetSchedule.calDetail[GetSaveSchedule.detail.where].body"></div> -->
      <!-- <Namo
        id="memo_t"
        :read="true"
        did="calendar"
        :editor="GetSchedule.calDetail[GetSaveSchedule.detail.where].body"
        ref="editor"
      ></Namo> -->
      <div
        class="cal_info"
        v-html="GetSchedule.calDetail[GetSaveSchedule.detail.where].body"
      ></div>
      <!-- <editor-content class="cal_info" :editor="editor" /> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Editor, EditorContent } from "tiptap";
// import Namo from "../editor/namo.vue";
import configjson from "../../config/config.json";
import Viewer from "../editor/viewer.vue";
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
  components: {
    EditorContent,
    // Namo,
    Viewer,
  },
  computed: {
    ...mapGetters("calendarjs", [
      "GetSchedule",
      "GetSaveSchedule",
      "GetSaveScheduleList",
    ]),
    ...mapGetters("mainjs", ["GetMyInfo"]),
    sat() {
      return configjson.sat;
    },
  },
  data() {
    return {
      editor: null,
      today: "",
    };
  },
  mounted() {
    this.editor = new Editor({
      content: this.calData.body,
      editable: false,
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    replaceAll(str, searchStr, replaceStr) {
      return str.split(searchStr).join(replaceStr);
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
    attachClick(url) {
      window.open(url);
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