<template>
  <div>
    <div class="wnoti_header">
      <h2>
        <a @click="Back()"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></a
        >{{ this.params.title }}
      </h2>
      <div>
        <span class="save fw_bold" @click="Send">{{ lang.save }}</span>
        <span class="cancel fw_bold" @click="Cancel">{{ lang.cancel }}</span>
      </div>
    </div>
    <div class="m_contents03">
      <form @submit.prevent>
        <ul class="wn_top">
          <li class="tit_line clfix">
            <strong>{{ lang.author }}</strong>
            <div>
              {{ this.GetMyInfo.info.name }}
              {{ this.GetMyInfo.info.position }} /
              {{ this.GetMyInfo.info.dept }}
            </div>
          </li>
          <li class="tit_line clfix">
            <strong>{{ lang.created }}</strong>
            <div>
              {{ nowTime() }}
            </div>
          </li>
          <!-- v-if="GetStoreBoard.path!=='education'&&GetStoreBoard.path!=='congratulate'" -->
          <li class="tit_line date_ch_t clfix" v-if="this.options.isUseTerm">
            <strong>{{ lang.term }}</strong>
            <div class="clfix">
              <select v-model="term">
                <option value="1M">{{ lang["M1"] }}</option>
                <option value="3M">{{ lang["M3"] }}</option>
                <option value="6M">{{ lang["M6"] }}</option>
                <option value="1Y">{{ lang["Y1"] }}</option>
                <option value="all">{{ lang.everlasting }}</option>
              </select>
            </div>
          </li>
          <li class="tit_line com_line clfix" v-if="this.options.isUseReply">
            <strong>{{ lang.comment }}</strong>
            <div>
              <span @click="Reply(0)"
                ><em
                  class="sv_radio"
                  :class="{ active: isAllowReply == 0 }"
                ></em
                >{{ lang.notallow }}</span
              >
              <span @click="Reply(1)"
                ><em
                  class="sv_radio"
                  :class="{ active: isAllowReply == 1 }"
                ></em
                >{{ lang.allow }}</span
              >
            </div>
          </li>
          <li
            class="tit_line bullet clfix"
            v-if="Object.keys(this.options.categoryall).length > 0"
          >
            <!--교육,업무게시판은 클래스bullet display:none;해주세요-->
            <strong>{{ lang.head }}<font class="f_red">*</font></strong>
            <!-- <div class="notice" style="display: none">
              <select>
                <option value="전체">전체</option>
                <option value="상시공지">상시공지</option>
                <option value="안내">안내</option>
                <option value="인사">인사</option>
              </select>
            </div> -->
            <div class="free_board" style="display: block">
              <select v-model="category">
                <option value="">{{ lang.all }}</option>
                <option
                  v-for="(value, index) in options.categoryall"
                  :key="index"
                  :value="index"
                >
                  {{ value.categoryall_val }}
                </option>
              </select>
            </div>
          </li>
          <li class="tit_line tit_input clfix">
            <strong>{{ lang.title }}</strong>
            <div>
              <input type="text" v-model="Subject" />
            </div>
          </li>
          <li class="tit_line att_file active">
            <strong>{{ lang.attach }}</strong>
            <span class="tit_clip" @click="submitFile()"></span>
            <input
              multiple
              style="display: none"
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFileUpload()"
            />
            <div>
              <ul class="file_list">
                <li v-for="(value, index) in this.file" :key="index">
                  {{ value.name
                  }}<span @click="FileDel(value)" class="att_del"></span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="noti_con" style="padding: 0">
          <Body
            :body="Body_Text"
            :bodyurl="GetStoreBoard.detail.bodyurl"
            style="height: 100%"
            ref="Body"
            :read="false"
            did="board"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapGetters("boardjs", ["GetStoreBoard", "options"]),
    ...mapGetters(["GetHeader"]),
  },
  async created() {
    this.lang = this.GetBoardL.write;
    // this.params = this.GetHeader.menu;
    this.params = JSON.parse(this.$route.query.data);
    // this.options = await this.$store.dispatch("boardjs/GetBoardSet",{lnbid:this.params.lnbid,type:this.params.type});
    // .then((res)=>{
    //   this.options = res;
    // })
    if (this.GetStoreBoard.path === "congratulate") {
      this.category = "congratulate";
    }

    if (this.GetStoreBoard.edit) {
      this.file = this.GetStoreBoard.detail.attach;
      // this.Body = this.GetStoreBoard.detail.body;
      this.Body_Text = this.GetStoreBoard.detail.body;
      // this.bodyurl = this.GetStoreBoard.detail.bodyurl;

      // if (this.Body_Text && this.isOpenFiled(this.Body_Text)) {
      //   await this.getUrlBody();
      // }
      // await this.getUrlBody();
      this.Subject = this.GetStoreBoard.detail.subject;
      this.GetStoreBoard.detail.isAllowReply
        ? (this.isAllowReply = "1")
        : (this.isAllowReply = "0");
      if (this.GetStoreBoard.detail.startDate) {
        var moment = require("moment");
        var startDate = moment(this.GetStoreBoard.detail.startDate);
        var endDate = moment(this.GetStoreBoard.detail.endDate);
        var re = endDate.diff(startDate, "months");
        if (re == 1) {
          this.term = "1M";
        } else if (re == 3) {
          this.term = "3M";
        } else if (re == 6) {
          this.term = "6M";
        } else if (re == 12) {
          this.term = "1Y";
        } else {
          this.term = "all";
        }
        // this.term
      }
    }
  },
  mounted() {
    this.fileinit = this.$refs.file.files;
  },
  beforeDestroy() {
    this.$store.commit("boardjs/EditMode", false);
  },
  data: function () {
    return {
      file: [],
      Subject: "",
      Body_Text: "",
      isAllowReply: 1,
      category: "",
      term: "1M",
      Detach: [],
      addAttach: [],
    };
  },
  methods: {
    Back() {
      this.$store.commit("SetBack", true);

      this.$router.go(-1);
    },
    nowTime() {
      var moment = require("moment");
      var localTime = moment.utc().toDate();
      localTime = moment(localTime).format("YYYY.MM.DD HH:mm:ss");
      return localTime;
    },
    submitFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      if (this.$refs.file.files[0]) {
        var result = this.file.findIndex((element) => {
          return (
            element.size === this.$refs.file.files[0].size &&
            element.name === this.$refs.file.files[0].name
          );
        });
        if (result == -1) {
          this.file.push(this.$refs.file.files[0]);
        }
        if (this.GetStoreBoard.edit) {
          this.addAttach.push(this.$refs.file.files[0]);
        }
      }
      this.$refs.file.files = this.fileinit;
    },
    FileDel(value) {
      var result = this.file.filter((element) => {
        return element !== value;
      });
      if (result[0]) {
        this.file = result;
      }
      if (result.length == 0) {
        this.file = [];
      }
      this.Detach.push(value);
    },
    Send() {
      let formData = new FormData();
      formData.append("subject", this.Subject);
      formData.append("lnbid", this.params.lnbid);

      let editorData = this.$refs.Body.getBody();
      formData.append("body", editorData);
      // formData.append("body", this.editor.getHTML());

      // if (this.GetStoreBoard.path === "congratulate") {
      formData.append("category1", this.category);
      var categoryall_nm = "";

      if (
        Object.keys(this.options.categoryall).length > 0 &&
        this.category !== ""
      ) {
        categoryall_nm = this.options.categoryall[this.category].categoryall_nm;
      }

      formData.append("categoryall", this.category);
      formData.append("categoryall_nm", categoryall_nm);

      // }
      // if (this.GetStoreBoard.path === "notice") {
      //   this.term;

      var now = new Date(); //2021-08-23 00:00:00 ZE9 오늘날짜
      var y = now.getFullYear();
      const nowMonth = now.getMonth() + 1;
      var m = this.fill(2, nowMonth);
      var d = this.fill(2, now.getDate());

      var FromDate = `${y}-${m}-${d} 00:00:00`; //2021-08-23 00:00:00 ZE9 오늘날짜
      var ToDate = null;
      var isEtermity = "";
      if (this.term == "1M") {
        now.setMonth(nowMonth + 1);
      } else if (this.term == "3M") {
        now.setMonth(nowMonth + 3);
      } else if (this.term == "6M") {
        now.setMonth(nowMonth + 6);
      } else if (this.term == "1Y") {
        now.setFullYear(y + 1);
      } else {
        isEtermity = 1;
      }

      var y = now.getFullYear();
      var m = this.fill(2, now.getMonth());
      var d = this.fill(2, now.getDate());
      if (m == "00") {
        m = "01";
      }
      ToDate = `${y}-${m}-${d} 00:00:00`; //2021-08-23 00:00:00 ZE9 오늘날짜

      formData.append("isEternity", isEtermity);
      formData.append("FromDate", FromDate);
      formData.append("ToDate", ToDate);
      // }
      formData.append("isAllowReply", this.isAllowReply);

      if (this.GetStoreBoard.edit) {
        for (var i = 0; i < this.addAttach.length; i++) {
          formData.append("attach", this.addAttach[i]);
        }
        var Detachstr = "";
        for (var i = 0; i < this.Detach.length; i++) {
          if (i == this.Detach.length - 1) {
            Detachstr += this.Detach[i].name;
          } else {
            Detachstr += this.Detach[i].name + ";";
          }
        }
        formData.append("Detach", Detachstr);
        formData.append("unid", this.GetStoreBoard.detail.unid);
      } else {
        for (var i = 0; i < this.file.length; i++) {
          formData.append("attach", this.file[i]);
        }
      }

      var result = {};
      result.data = formData;
      result.path = this.GetStoreBoard.path;
      if (this.GetStoreBoard.edit) {
        this.$store.dispatch("boardjs/BoardEdit", result).then((res) => {
          if (res) {
            this.GoList();
          }
        });
      } else {
        this.$store.dispatch("boardjs/BoardWrite", result).then((res) => {
          if (res) {
            this.GoList();
          }
        });
      }
    },
    GoList() {
      // this.SetHeader(this.params);
      // this.$store.commit("SetBack", true);

      this.$router.push({
        name: "boardlist",
        query: { data: JSON.stringify(this.params) },
      });
    },
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
    Reply(value) {
      this.isAllowReply = value;
    },
    Cancel() {
      this.$store.commit("SetBack", true);

      this.GoList();
    },
  },
};
</script>

<style>
.ProseMirror {
  resize: none;
  width: 100%;
  height: 100%;
  font-size: 0.93rem;
  color: #444;
  word-break: break-all;
} /*8월 9일 수정*/
</style>