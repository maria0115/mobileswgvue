<template>
  <div>
    <div class="rdcal_header">
      <em
        ><a @click="RouterBack"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></a
        >일정</em
      >
      <div class="rdcal_icons">
        <span class="rdcal_edit"><a @click="Edit()">편집</a></span>
        <span class="rdcal_edit_del" @click="Del">삭제</span>
      </div>
    </div>
    <div class="m_contents08 srl">
      <div class="con_body_top">
        <span>{{
          GetSchedule.calDetail[this.GetSaveSchedule.detail.where].subject
        }}</span>
        <em
          ><b class="cate">{{
            GetSchedule.calDetail[this.GetSaveSchedule.detail.where].category
          }}</b>
          /
          <b class="open">{{
            GetSchedule.calDetail[this.GetSaveSchedule.detail.where].secret
          }}</b></em
        >
      </div>
      <ul class="rd_list">
        <li>
          <span>일자</span>
          <div>{{ today }}</div>
        </li>
        <li
          v-if="
            !(
              GetSchedule.calDetail[this.GetSaveSchedule.detail.where]
                .category == '기념일' ||
              GetSchedule.calDetail[this.GetSaveSchedule.detail.where]
                .category == '행사'
            )
          "
        >
          <span>시간</span>
          <div>{{ TransTime() }}</div>
        </li>
        <li>
          <span>위치</span>
          <div>
            {{
              this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where]
                .place
            }}
          </div>
        </li>
        <li
          v-if="
            GetSchedule.calDetail[this.GetSaveSchedule.detail.where].attachInfo
              .length > 0
          "
        >
          <span>첨부파일</span>
          <ul class="file_list">
            <li
              @click="attachClick(value.url)"
              v-for="(value, index) in GetSchedule.calDetail[
                this.GetSaveSchedule.detail.where
              ].attachInfo"
              :key="index"
            >
              {{ value.name }}
            </li>
          </ul>
        </li>
      </ul>
      <!-- <div class="cal_info" v-html="GetSchedule.calDetail[GetSaveSchedule.detail.where].body"></div> -->
      <Namo id="memo_t" :read="true" :editor="GetSchedule.calDetail[GetSaveSchedule.detail.where].body" ref="editor"></Namo>
      <!-- <editor-content class="cal_info" :editor="editor" /> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Editor, EditorContent } from "tiptap";
import Namo from '../editor/namo.vue';
export default {
  created() {
    var date =
      this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where].startdate;
    var currentDay = new Date(date.replaceAll("-", "/"));
    var theDayOfWeek = currentDay.getDay();

    this.today = date.replaceAll("-", ".") + `(${this.daysSort[theDayOfWeek]})`;
  },
  components: {
    EditorContent,Namo
  },
  computed: {
    ...mapGetters("calendarjs", [
      "GetSchedule",
      "GetSaveSchedule",
      "GetSaveScheduleList",
    ]),
  },
  data() {
    return {
      editor: null,
      daysSort: ["일", "월", "화", "수", "목", "금", "토"],
      today: "",
    };
  },
  mounted() {
    this.editor = new Editor({
      content:
        this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where].body,
      editable: false,
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
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
      this.$router.push(`schedule_more/${this.GetSaveSchedule.detail.where}`);
    },
    // 전 url 이동
    RouterBack() {
      this.$router.replace(`${this.GetSaveSchedule.detail.where}`);
    },
    TransTime() {
      // 15:00 ~ 16:00
      var end =
        this.GetSchedule.calDetail[
          this.GetSaveSchedule.detail.where
        ].endtime.split(":")[0] +
        ":" +
        this.GetSchedule.calDetail[
          this.GetSaveSchedule.detail.where
        ].endtime.split(":")[1];
      var start =
        this.GetSchedule.calDetail[
          this.GetSaveSchedule.detail.where
        ].starttime.split(":")[0] +
        ":" +
        this.GetSchedule.calDetail[
          this.GetSaveSchedule.detail.where
        ].starttime.split(":")[1];
      return `${start} ~ ${end}`;
    },
    TransDate() {
      // 2021-05-24(월)
      var end =
        this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where].enddate;
      var start =
        this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where].startdate;

      var day = "";

      var arrend = end.split("-");
      if (end === start) {
        day =
          end +
          `(${
            this.daysSort[
              new Date(arrend[0], arrend[1] - 1, arrend[2],0,0,0).getDay()
            ]
          })`;
      } else {
        var arrstart = start.split("-");
        day =
          start +
          `(${
            this.daysSort[
              new Date(arrstart[0], arrstart[1] - 1, arrstart[2],0,0,0).getDay()
            ]
          })` +
          end +
          `(${
            this.daysSort[
              new Date(arrend[0], arrend[1] - 1, arrend[2],0,0,0).getDay()
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
      this.$router.push({name:'calwrite'});
    },
  },
};
</script>

<style>
</style>