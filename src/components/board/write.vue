<template>
  <div>
    <div class="wnoti_header">
      <h2>
        <a @click="Back()"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></a
        >{{ GetStoreBoard.path }}
      </h2>
      <div>
        <span class="save" @click="Send">저장</span>
        <span class="cancel" @click="Cancel">취소</span>
      </div>
    </div>
    <div class="m_contents03">
      <form action="">
        <ul class="wn_top">
          <li class="tit_line clfix">
            <strong>작성자</strong>
            <div>
              {{ this.GetMyInfo.info.name }}
              {{ this.GetMyInfo.info.position }} /
              {{ this.GetMyInfo.info.dept }}
            </div>
          </li>
          <li class="tit_line clfix">
            <strong>작성일</strong>
            <div>
              {{ nowTime() }}
            </div>
          </li>
          <!-- v-if="GetStoreBoard.path!=='education'&&GetStoreBoard.path!=='congratulate'" -->
          <li
            class="tit_line date_ch_t clfix"
            v-if="
              GetStoreBoard.path !== 'education' &&
              GetStoreBoard.path !== 'congratulate'
            "
          >
            <strong>게시기간</strong>
            <div class="clfix">
              <select v-model="term">
                <option value="1M">1개월</option>
                <option value="3M">3개월</option>
                <option value="6M">6개월</option>
                <option value="1Y">1년</option>
                <option value="all">영구</option>
              </select>
            </div>
          </li>
          <li class="tit_line com_line clfix">
            <strong>댓글</strong>
            <div>
              <span @click="Reply(0)"
                ><em
                  class="sv_radio"
                  :class="{ active: isAllowReply == 0 }"
                ></em
                >허용안함</span
              >
              <span @click="Reply(1)"
                ><em
                  class="sv_radio"
                  :class="{ active: isAllowReply == 1 }"
                ></em
                >허용</span
              >
            </div>
          </li>
          <li
            class="tit_line bullet clfix"
            v-if="
              GetStoreBoard.path !== 'education' &&
              GetStoreBoard.path !== 'notice'
            "
          >
            <!--교육,업무게시판은 클래스bullet display:none;해주세요-->
            <strong>글머리</strong>
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
                <option value="congratulate">경사</option>
                <option value="condolences">조사</option>
              </select>
            </div>
          </li>
          <li class="tit_line tit_input clfix">
            <strong>제목</strong>
            <div>
              <input type="text" v-model="Subject" />
              <span class="tit_clip" @click="submitFile()"></span>
              <input
                multiple
                style="display: none"
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
              />
            </div>
          </li>
          <li class="tit_line att_file active" v-if="file.length > 0">
            <strong>첨부파일</strong>
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
        <div class="noti_con">
          <editor-content :editor="editor" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Editor, EditorContent } from "tiptap";
export default {
  computed: {
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapGetters("boardjs", ["GetStoreBoard"]),
  },
  created() {
    if (this.GetStoreBoard.path === "congratulate") {
      this.category = "congratulate";
    }

    if (this.GetStoreBoard.edit) {
      this.file = this.GetStoreBoard.detail.attach;
      this.Body_Text = this.GetStoreBoard.detail.body;
      this.Subject = this.GetStoreBoard.detail.subject;
      this.isAllowReply = "0";

      if (this.GetStoreBoard.detail.isAllowReply) {
        this.isAllowReply = "1";
      }
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
    this.editor = new Editor({
      content: this.Body_Text,
    });
  },
  beforeDestroy() {
    this.editor.destroy();
    this.$store.commit("boardjs/EditMode", false);
  },
  components: {
    EditorContent,
  },
  data: function () {
    return {
      file: [],
      editor: null,
      Subject: "",
      Body_Text: "",
      isAllowReply: 1,
      category: "",
      term: "1M",
    };
  },
  methods: {
    Back() {
      this.$router.replace(`${this.GetStoreBoard.path}`);
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
      this.file.push(this.$refs.file.files[0]);

      // }
    },
    FileDel(value) {
      this.file = this.file.filter((element) => element !== value);
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
    Send() {
      let formData = new FormData();
      formData.append("subject", this.Subject);

      formData.append("body", this.editor.getHTML());

      if (this.GetStoreBoard.path === "congratulate") {
        formData.append("category1", this.category);
      }
      if (this.GetStoreBoard.path === "notice") {
        //   this.term;

        var now = new Date(); //2021-08-23 00:00:00 ZE9 오늘날짜
        now.setMonth(now.getMonth() + 1);
        var y = now.getFullYear();
        var m = this.fill(2,now.getMonth());
        var d = this.fill(2,now.getDate());

        var FromDate = `${y}-${m}-${d} 00:00:00 ZE9`; //2021-08-23 00:00:00 ZE9 오늘날짜
        var ToDate = null;
        var isEtermity = "";
        if (this.term == "1M") {
          now.setMonth(now.getMonth() + 1);
        } else if (this.term == "3M") {
          now.setMonth(now.getMonth() + 3);
        } else if (this.term == "6M") {
          now.setMonth(now.getMonth() + 6);
        } else if (this.term == "1Y") {
          now.setFullYear(now.getFullYear() + 1);
        } else {
          isEtermity = 1;
        }

        var y = now.getFullYear();
        var m = this.fill(2,now.getMonth());
        var d = this.fill(2,now.getDate());
        if(m=="00"){
          m = "01";
        }
        ToDate = `${y}-${m}-${d} 00:00:00 ZE9`; //2021-08-23 00:00:00 ZE9 오늘날짜

        formData.append("isEternity", isEtermity);
        formData.append("FromDate", FromDate);
        formData.append("ToDate", ToDate);
        console.log(FromDate,ToDate)
      }
      formData.append("isAllowReply", this.isAllowReply);

      for (var i = 0; i < this.file.length; i++) {
        formData.append("attach", this.file[i]);
      }

      if (this.GetStoreBoard.edit) {
        formData.append("unid", this.GetStoreBoard.detail.unid);
      }

      var result = {};
      result.data = formData;
      result.path = this.GetStoreBoard.path;
      if (this.GetStoreBoard.edit) {
        this.$store.dispatch("boardjs/BoardEdit", result);
      } else {
        this.$store.dispatch("boardjs/BoardWrite", result);
      }
    },
    Reply(value) {
      this.isAllowReply = value;
    },
    Cancel() {
      this.$router.replace(this.GetStoreBoard.path);
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