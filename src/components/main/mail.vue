<template>
  <div id="mail_tab">
    <div class="re_mail">
      <strong desc="받은 메일">{{ GetMainLanguage.portlet.receive }}</strong>
      <ul>
        <li
          :class="{ new: value.unread }"
          v-for="(value, name) in main.data.mailtype.inbox_detail.more.data
            .data"
          :key="name"
        >
          <a
            ><dl @click="MailDetail(value.unid)">
              <dt>
                {{ value.sender }}
                <div>
                  <em
                    class="rece"
                    v-if="value.tostuff !== undefined"
                    :class="{ on: value.tostuff.receive }"
                    >수신</em
                  ><em
                    class="refer"
                    v-if="value.tostuff !== undefined"
                    :class="{ on: value.tostuff.ref }"
                    >참조</em
                  >
                </div>
              </dt>
              <!-- 7월 5일 div태그 추가됨 -->
              <dd>
                <b :class="{ impor_icon: value.importance }"></b
                >{{ value.subject }}
              </dd>
              <!-- 7월 05일 중요메일 느낌표 태그 추가됨-->
            </dl>
            <div class="impor">
              <p>
                {{ transTime(value.created) }}
                <span
                  @click="followUp(value.unid)"
                  class="star"
                  :class="{ active: value.followup }"
                ></span>
              </p>
              <span :class="[{ clip: haveClip(value.attach) }]"></span></div
          ></a>
        </li>
      </ul>
      <router-link :to="{name:'mail'}"
        ><span class="m_more"><a></a></span
      ></router-link>
    </div>
    <div class="se_mail">
      <strong desc="보낸 메일">{{ GetMainLanguage.portlet.send }}</strong>
      <ul>
        <li
          @click="MailDetail(value.unid)"
          v-for="(value, name) in main.data.mailtype.sent_main.more.data"
          :key="name"
        >
          <a>{{ value.subject }}</a>
        </li>
      </ul>
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
      <router-link :to="{name:'sent'}"
        ><span class="m_more"><a></a></span
      ></router-link>
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
  data() {
    return {
      // path:this.path,
      editor: null,
      STime: "05",
      SMin: "50",
      use: false,
      date: "",
      body: "",
      unid: "",
    };
  },
  computed: {
    ...mapState("mainjs", ["main"]),
    ...mapState("mailjs", ["TimeOption"]),
    ...mapGetters("mailjs", ["GetMail"]),
    ...mapGetters("mainjs", ["GetMyInfo", , "GetMain"]),
    ...mapGetters(["GetMainLanguage"]),
  },
  created() {
    this.editor = new Editor({
      content: "",
    });
  },
  beforeDestroy() {
    if (this.editor !== null) {
      this.editor.destroy();
    }
  },
  methods: {
    MailDetail(unid) {
      this.$router.push({ name: "ReadMail", params: { unid } });
    },
    // 현재 날짜와 문서의 created 시간을 비교, 안 읽은 문서이면 new icon 표시
    boo(value) {
      var moment = require("moment");
      var localTime = moment.utc(value.created).toDate();
      localTime = parseInt(moment(localTime).format("YYYYMMDD"));
      var nowTime = parseInt(moment().format("YYYYMMDD"));

      if (nowTime - localTime === this.main.my.recentdate && value.unread) {
        return true;
      }
      return false;
    },
    // 첨부파일이 있는지
    haveClip(value) {
      // if (value.attachinfo.length > 0 && value.attachinfo[0] !== "") {
      //   return true;
      // }
      // return false;
      if (value !== undefined) {
        return value;
      } else {
        return false;
      }
    },
    // 중요메일
    important(boo) {
      if (boo) {
        return "_on";
      }
      return "";
    },
    // utc 시간 to local 시간
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD HH:mm");
      return localTime;
    },
    async followUp(unid) {
      this.editor.destroy();
      this.unid = unid;
      var result = await this.$store.dispatch("mailjs/FollowUpInfo", unid);
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
          this.STime = "05";
          this.SMin = "50";
          this.use = false;
          var moment = require("moment");
          this.date = moment().format("YYYY-MM-DD");
          this.body = "";
          this.editor = new Editor({
            content: this.body,
          });
        }
      }
    },
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
          data.body = this.editor.getHTML();
          await this.$store.dispatch("mailjs/FollowupSet", data);
          this.$router.push({name:'mail'});
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