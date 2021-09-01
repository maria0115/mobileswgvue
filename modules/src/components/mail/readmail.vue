<template>
  <div>
    <div class="rdmail_header">
      <em
        ><a @click="Back"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></a
      ></em>
      <div class="rdmail_icons">
        <span class="rd_reply" @click="Replay('Reply')">답장</span>
        <span class="rd_relay" @click="Replay('Relay')">전달</span>
        <span class="rd_del" @click="mailDelete">삭제</span>
        <span class="rd_more"></span>
        <ul class="more_box">
          <li class="move">이동</li>
          <li @click="SpamSet">스팸차단</li>
          <li @click="Replay('AllReply')">전체답장</li>
        </ul>
      </div>
    </div>
    <div class="m_contents04">
      <form action="">
        <div class="rd_top">
          <h2 class="mail_tit">{{ GetMailDetail.subject }}</h2>
          <div class="clfix">
            <span class="per_img">
              <em class="no_img" style="background: #aea9db"
                ><b>{{ GetMailDetail.author.name.split("")[0] }}</b></em
              >
            </span>
            <dl>
              <dt v-if="GetMailDetail.author.shortname">
                {{ GetMailDetail.author.shortname }}
              </dt>
              <dt v-else>{{ GetMailDetail.author.name }}</dt>
              <dd>{{ getTime(GetMailDetail.created) }}</dd>
            </dl>
            <em class="re_more"></em>
          </div>
          <ul class="re_refer_div">
            <li class="clfix refer01">
              <strong>받는사람</strong>
              <div>
                <span
                  v-for="(value, index) in GetMailDetail.sendTo"
                  :key="index"
                  ><p v-if="value.shortname">
                    {{ value.shortname }} {{ value.position }}
                  </p>
                  <p v-else>{{ value.name }} {{ value.position }}</p></span
                >
              </div>
            </li>
            <li class="clfix refer02">
              <strong>참조</strong>
              <div>
                <span
                  v-for="(value, index) in GetMailDetail.copyTo"
                  :key="index"
                  ><p v-if="value.shortname">
                    {{ value.shortname }} {{ value.position }}
                  </p>
                  <p v-else>{{ value.name }} {{ value.position }}</p></span
                >
              </div>
            </li>
            <li
              class="clfix refer02"
              v-if="GetMailDetail.blindCopyTo.length > 0"
            >
              <strong>숨은 참조</strong>
              <div>
                <span
                  v-for="(value, index) in GetMailDetail.blindCopyTo"
                  :key="index"
                  ><p v-if="value.shortname">
                    {{ value.shortname }} {{ value.position }}
                  </p>
                  <p v-else>{{ value.name }} {{ value.position }}</p></span
                >
              </div>
            </li>
          </ul>
          <span class="star" :class="{ active: this.GetMail.followUpInfo.use }"></span>
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
                    <input type="date" :value="this.date" />
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
                  <editor-content :editor="editor" />
                </li>
              </ul>
              <div>
                <span class="impor_mo_btn" @click="followSet">확인</span>
                <span class="modal_cancel" @click="followCancle">취소</span>
              </div>
            </div>
          </div>
        </div>
        <div class="add_file clfix">
          <strong>첨부파일</strong>
          <ul>
            <li
              v-for="(value, index) in GetMailDetail.attach"
              :key="index"
              @click="attachClick(value.url)"
              class="active"
            >
              <span><img src="../../mobile/img/test_img01.png" alt="" /></span>
              <div>
                <p>{{ value.name }}</p>
                <em>({{ value.size }})</em>
              </div>
            </li>
          </ul>
        </div>
        <div class="rdm_edit" v-html="GetMailDetail.body">
          안녕하세요. 디자인 팀 안지영 입니다. 2021년 사내업무 및 유지 보수 내역
          보내드립니다. 감사합니다.
        </div>
        <!-- <editor-content
          class="rdm_edit"
          :editor="editor"
        /> -->
      </form>
    </div>
    <MoveFile></MoveFile>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MoveFile from "./movefile.vue";
import { Editor, EditorContent } from "tiptap";
export default {
  components: {
    MoveFile,
    EditorContent,
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  data: function () {
    return {
      editor: null,
      STime: "05",
      SMin: "50",
      use: false,
      date: "",
      body: "",
    };
  },
  computed: {
    ...mapState("mailjs",["TimeOption"]),
    ...mapGetters("mailjs",["GetMailDetail", "GetMail"]),
  },
  mounted() {
    var followUpInfo = this.GetMail.followUpInfo;
    
    if (followUpInfo.use) {
      
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
      this.date = moment().format("YYYY-MM-DD");
      this.editor = new Editor({
        content: "",
      });
    }
  },
  created() {
    this.$store.dispatch("mailjs/FollowUpInfo", this.GetMailDetail.unid);
    this.$store.commit("mailjs/checkedNamesPush", this.GetMailDetail.unid);
  },
  methods: {
    Replay(value) {
      this.$store.commit("mailjs/From", value);
      this.$router.push("/maillist/write_mail");
    },
    SpamSet() {
      var data = {};
      data.title = this.GetMailDetail.subject;
      data.email = "";
      if (this.GetMailDetail.authorEmail) {
        data.email = this.GetMailDetail.authorEmail;
      }
      // 
      
      this.$store.dispatch("mailjs/SpamSet", data);
    },
    Back() {
      this.$store.commit("mailjs/Back");
      this.$router.go(-1);
    },
    getTime(date) {
      var moment = require("moment");
      var localTime = moment.utc(date).toDate();
      localTime = moment(localTime).format("YYYY-MM-DD일 HH:mm");
      return localTime;
    },
    attachClick(url) {
      window.open(url);
    },
    async mailDelete() {
      var data = {};
      data.unid = this.GetMailDetail.unid;
      var arr = [];
      arr.push(data);
      var result = await this.$store.dispatch("mailjs/MailDelete", { datas: arr });
      
      if (result) {
        this.$router.go(-1);
      }
    },
    followCancle() {},
    followSet() {
      var data = {};
      
      if (this.date) {
        data.use = this.use;
        data.date = this.date;
        data.unid = this.unid;
        data.time = `${this.STime}:${this.SMin}:00`;
        data.body = this.editor.getHTML();
        data.unid = this.GetMailDetail.unid;
        this.$store.dispatch("mailjs/FollowupSet", data);
        this.$router.push("/maillist/read_mail")
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