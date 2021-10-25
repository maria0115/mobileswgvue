<template>
  <div class="impor_mail">
    <!--7월 29일 추가됨 -->
    <div class="impor_con">
      <strong>수행 설정</strong>
      <p>
        <span
          ><em
            class="edit_check"
            ref="edit_check"
            @click="followUse"
            :class="{ active: this.use }"
          ></em
          >수행필요로 설정</span
        >
      </p>
      <ul>
        <li>
          <em>일자</em>
          <div>
            <input type="date" v-model="date" />
          </div>
        </li>
        <li>
          <em>시간</em>
          <div>
            <select name="" id="" v-model="STime">
              <option
                :value="value"
                v-for="(value, index) in this.TimeOption.mail.hour"
                :key="index"
              >
                {{ value }}
              </option>
            </select>
            :
            <select name="" id="" v-model="SMin">
              <option
                :value="value"
                v-for="(value, index) in this.TimeOption.mail.min"
                :key="index"
              >
                {{ value }}
              </option>
            </select>
          </div>
        </li>
        <li>
          <em>수행할 내용</em>
          <div><textarea v-model="body"></textarea></div>
        </li>
      </ul>
      <div>
        <span class="impor_mo_btn" @click="followSet">확인</span>
        <span class="modal_cancel" @click="followCancle">취소</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    unid: String,
  },
  created() {
    var moment = require("moment");
    var localTime = moment.utc().toDate();
    this.date = moment(localTime).format("yyyy-MM-DD");

    this.editor = new Editor({
      content: "",
    });
  },
  components: {
    EditorContent,
  },
  computed: {
    ...mapState("mailjs", ["TimeOption"]),
    ...mapGetters("mailjs", ["GetMail"]),
  },
  data() {
    return {
      editor: null,
      enabled: true,
      STime: "05",
      SMin: "50",
      use: false,
      date: "",
      body:"",
    };
  },
  beforeDestroy() {
    if (this.editor !== null) {
      this.editor.destroy();
    }
  },
  watch: {
    async unid() {
      this.editor.destroy();
      //   this.unid = unid;
      var result = await this.$store.dispatch("mailjs/FollowUpInfo", this.unid);
      if (result) {
        if (this.GetMail.followUpInfo.use) {
          var followUpInfo = this.GetMail.followUpInfo;
          this.STime = followUpInfo.time.split(":")[0];
          this.SMin = followUpInfo.time.split(":")[1];
          this.use = followUpInfo.use;
          this.date = followUpInfo.date;
          this.body = followUpInfo.body;

          this.editor = new Editor({
            content: this.body,
          });
        } else {
          var moment = require("moment");
          var localTime = moment.utc().toDate();
          this.date = moment(localTime).format("yyyy-MM-DD");
          this.STime = "05";
          this.SMin = "50";
          this.use = false;
          this.body = "";
          this.editor = new Editor({
            content: this.body,
          });
        }
      }
    },
  },
  methods: {
    followCancle() {
      if (this.editor) {
        this.editor.destroy();
      }
    },
    async followSet() {
      if (this.editor) {
        var data = {};
        if (this.date) {
          data.use = this.use;
          data.date = this.date;
          data.unid = this.unid;
          data.time = `${this.STime}:${this.SMin}:00`;
          data.body = this.body;

          await this.$store.dispatch("mailjs/FollowupSet", data);
          this.$router.push(this.$router.currentRoute);
        }
        this.editor.destroy();
      }
    },
    followUse() {
      var classList = this.$refs.edit_check.classList.contains("active");
      this.use = !classList;
    },
  },
};
</script>

<style>
</style>