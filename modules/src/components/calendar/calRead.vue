<template>
  <div>
    <div class="rdcal_header">
      <em
        ><a @click="RouterBack"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></a
        >일정</em
      >
      <div class="rdcal_icons">
        <span class="rdcal_edit"><a href="./mob_cal_edit.html">편집</a></span>
        <span class="rdcal_edit_del" @click="Del">삭제</span>
      </div>
    </div>
    <div class="m_contents08 srl">
      <div class="con_body_top">
        <span>{{ GetSchedule.calDetail[this.GetSaveSchedule.detail.where].subject }}</span>
        <em
          ><b class="cate">{{ GetSchedule.calDetail[this.GetSaveSchedule.detail.where].category }}</b> /
          <b class="open">{{ GetSchedule.calDetail[this.GetSaveSchedule.detail.where].secret }}</b></em
        >
      </div>
      <ul class="rd_list">
        <li>
          <span>일자</span>
          <div>{{ TransDate() }}</div>
        </li>
        <li>
          <span>시간</span>
          <div>{{ TransTime() }}</div>
        </li>
        <li>
          <span>위치</span>
          <div>{{ GetSchedule.calDetail.place }}</div>
        </li>
        <li>
          <span>첨부파일</span>
          <ul class="file_list">
            <li
            @click="attachClick(value.url)"
              v-for="(value, index) in GetSchedule.calDetail[this.GetSaveSchedule.detail.where].attachInfo"
              :key="index"
            >
              {{ value.name }}
            </li>
          </ul>
        </li>
      </ul>
      <editor-content class="cal_info" :editor="editor" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Editor, EditorContent } from "tiptap";
export default {
  components: {
    EditorContent,
  },
  computed: {
    ...mapGetters("calendar",["GetSchedule","GetSaveSchedule"]),
  },
  data() {
    return {
      editor: null,
      daysSort: ["일", "월", "화", "수", "목", "금", "토"],
    };
  },
  mounted() {
    console.log(this.GetSaveSchedule.detail.where)
    this.editor = new Editor({
      content: this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where].body,
      editable: false,
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    async Del(){
      var data = {};
      data.unid = this.GetSaveSchedule.detail.unid;
      
      await this.$store.dispatch("calendar/CalDelete",data);
      this.$router.push(`/schedule/${this.GetSaveSchedule.detail.where}`);
    },
    // 전 url 이동
    RouterBack() {
      this.$store.commit("Back");
      this.$router.go(-1);
    },
    TransTime() {
      // 15:00 ~ 16:00
      var end =
        this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where].endtime.split(":")[0] +
        ":" +
        this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where].endtime.split(":")[1];
      var start =
        this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where].starttime.split(":")[0] +
        ":" +
        this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where].starttime.split(":")[1];
      return `${start} ~ ${end}`;
    },
    TransDate() {
      // 2021-05-24(월)
      var end = this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where].enddate;
      var start = this.GetSchedule.calDetail[this.GetSaveSchedule.detail.where].startdate;
      console.log(end, start);
      var day = "";

      var arrend = end.split("-");
      if (end === start) {
        day =
          end +
          `(${
            this.daysSort[
              new Date(arrend[0], arrend[1] - 1, arrend[2]).getDay()
            ]
          })`;
      } else {
        var arrstart = start.split("-");
        day =
          start +
          `(${
            this.daysSort[
              new Date(arrstart[0], arrstart[1] - 1, arrstart[2]).getDay()
            ]
          })` +
          end +
          `(${
            this.daysSort[
              new Date(arrend[0], arrend[1] - 1, arrend[2]).getDay()
            ]
          })`;
      }
      return day;
    },
    attachClick(url) {
      window.open(url);
    },
  },
};
</script>

<style>
</style>