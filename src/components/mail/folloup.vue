<template>
  <div class="impor_mail" :class="{active:isClick}">
    <!--7월 29일 추가됨 -->
    <div class="impor_con">
      <strong>{{ lang.title }}</strong>
      <p>
        <span
          ><em
            class="edit_check"
            ref="edit_check"
            @click="followUse"
            :class="{ active: this.use }"
          ></em
          >{{ lang.subtitle }}</span
        >
      </p>
      <ul>
        <li>
          <em>{{ lang.day }}</em>
          <div>
            <!-- <input type="date" v-model="date" /> -->
            <Date v-model="date"></Date>
          </div>
        </li>
        <li>
          <em>{{ lang.time }}</em>
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
          <em>{{ lang.body }}</em>
          <div><textarea v-model="body"></textarea></div>
          <!-- <editor-content
          :editor="editor"
        /> -->
        </li>
      </ul>
      <div>
        {{ lang }}
        <span class="impor_mo_btn" @click="followSet">{{ lang.success }}</span>
        <span class="modal_cancel" @click="followCancle">{{
          lang.cancle
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { Editor, EditorContent } from "tiptap";
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    unid: String,
    isClick:Boolean,
  },
  created() {
    this.lang = this.GetMailLanguage.followup;
    var moment = require("moment");
    var localTime = moment.utc().toDate();
    this.date = moment(localTime).format("YYYY-MM-DD");
    this.setTime();
    // this.editor = new Editor({
    //   content: "",
    // });
  },
  components: {
    // EditorContent,
  },
  computed: {
    ...mapState("mailjs", ["TimeOption"]),
    ...mapGetters("mailjs", ["GetMail"]),
    ...mapGetters(["GetMailLanguage"]),
  },
  data() {
    return {
      editor: null,
      enabled: true,
      STime: "05",
      SMin: "50",
      use: false,
      date: "",
      body: "",
    };
  },
  // beforeDestroy() {
  //   if (this.editor !== null) {
  //     this.editor.destroy();
  //   }
  // },
  watch: {
    async unid() {
      // this.editor.destroy();
      // this.unid = unid;
      // console.log(this.unid)
      var result = await this.$store.dispatch("mailjs/FollowUpInfo", this.unid);
      if (result) {
        if (this.GetMail.followUpInfo.use) {
          var followUpInfo = this.GetMail.followUpInfo;
          this.STime = followUpInfo.time.split(":")[0];
          this.SMin = followUpInfo.time.split(":")[1];
          this.use = followUpInfo.use;
          this.date = followUpInfo.date;
          this.body = followUpInfo.body;

          // this.editor = new Editor({
          //   content: this.body,
          // });
        } else {
          var moment = require("moment");
          var localTime = moment.utc().toDate();
          this.date = moment(localTime).format("YYYY-MM-DD");
          this.setTime();
          this.use = false;
          this.body = "";
          // this.editor = new Editor({
          //   content: this.body,
          // });
        }
      }
    },
  },
  methods: {
    setTime() {
      var moment = require("moment");
      var nowmin = moment().format("mm");
      var upmin = parseInt(nowmin.split("")[0]) + 1 + "0";
      var cha = upmin - nowmin;
      this.STime = moment().add(cha, "m").format("HH");
      this.SMin = moment().add(cha, "m").format("mm");
    },
    followCancle() {
      // if (this.editor) {
      //   this.editor.destroy();
      // }
      this.$emit("isnClick");
    },
    async followSet() {
      // if (this.editor) {
        
        var data = {};
      if (this.date) {
        this.$emit("isnClick");
        data.use = this.use;
        data.date = this.date;
        data.unid = this.unid;
        data.time = `${this.STime}:${this.SMin}:00`;
        // data.body = this.editor.getHTML();
        data.body = this.body;

        await this.$store.dispatch("mailjs/FollowupSet", data);
        this.$router.push(this.$router.currentRoute);
      }

      // this.editor.destroy();
      // }
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