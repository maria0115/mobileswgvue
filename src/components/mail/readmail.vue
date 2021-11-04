<template>
  <div>
    <div class="rdmail_header">
      <em
        ><a @click="Back"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></a
      ></em>
      <div class="rdmail_icons">
        <span class="rd_reply" @click="Replay('Reply')">답장</span>
        <span
          class="rd_relay"
          v-if="!isDraft()"
          @click="Replay('Relay')"
          >전달</span
        >
        <span class="rd_relay" v-else @click="Edit()">편집</span>
        <span class="rd_del" @click="mailDelete">삭제</span>
        <span class="rd_more"></span>
        <ul class="more_box">
          <li class="move">이동</li>
          <li @click="SpamSet" v-if="!isDraft()">
            스팸차단
          </li>
          <li @click="Replay('AllReply')">전체답장</li>
        </ul>
      </div>
    </div>
    <div class="m_contents04">
      <form @submit.prevent>
        <div class="rd_top">
          <h2 class="mail_tit">{{ GetMailDetail.subject }}</h2>
          <div class="clfix">
            <span class="per_img">
              <em class="no_img" :style="randomColor()"
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
          <span
            class="star"
            @click="followUp(GetMailDetail.unid)"
            :class="{ active: this.GetMail.followUpInfo.use }"
          ></span>
          <FollowUp :unid="clickedUnid"></FollowUp>
        </div>
        <div class="add_file clfix">
          <strong>첨부파일</strong>
          <ul>
            <li
              v-for="(value, index) in GetMailDetail.attach"
              :key="index"
              class="active"
            >
              <span
                ><img
                  :src="`../../mobile/img/icon_${fileImg(value.name)}.png`"
                  alt=""
              /></span>
              <div>
                <a :href="value.url" download>
                  <p>{{ value.name }}</p>
                  <em>({{ value.size }})</em>
                </a>
              </div>
            </li>
          </ul>
          <!-- <Viewer
            className=""
            :attaInfo="GetMailDetail.attach"
            :attach="true"
          ></Viewer> -->
        </div>
        <!-- <div class="rdm_edit" v-html="GetMailDetail.body">
          안녕하세요. 디자인 팀 안지영 입니다. 2021년 사내업무 및 유지 보수 내역
          보내드립니다. 감사합니다.
        </div> -->
        <div class="rdm_edit">
          <!-- <Namo
            id="memo_t"
            :read="true"
            :editor="GetMailDetail.body"
            did="mail"
            ref="editor"
          ></Namo> -->
          <div v-html="GetMailDetail.body"></div>
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
import configjson from "../../config/config.json";
// import Namo from "../editor/namo.vue";
import Viewer from "../editor/viewer.vue";
import FollowUp from "./folloup.vue";
export default {
  components: {
    MoveFile,
    EditorContent,
    // Namo,
    Viewer,
    FollowUp,
  },
  data: function () {
    return {
      clickedUnid: "",
      body: "",
    };
  },
  computed: {
    ...mapState("mailjs", ["TimeOption"]),
    ...mapGetters("mailjs", ["GetMailDetail", "GetMail", "GetfolderName"]),
    path() {
      return this.$route.name;
    },
  },
  mounted() {},
  created() {
    this.$store.dispatch("mailjs/FollowUpInfo", this.GetMailDetail.unid);
    this.$store.commit("mailjs/checkedNamesPush", this.GetMailDetail.unid);
  },
  methods: {
    isDraft(){
      return this.GetfolderName.indexOf('draft') !== -1;
    },
    Edit() {
      this.$router.push({ name: "WriteMail",query:{isEdit:true} });
    },
    followUp(unid) {
      this.clickedUnid = unid;
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    getExtensionOfFilename(filename) {
      var _fileLen = filename.length;
      var _lastDot = filename.lastIndexOf(".");
      var _fileExt = filename.substring(_lastDot + 1, _fileLen).toLowerCase();

      return _fileExt;
    },
    fileImg(name) {
      var dot = this.getExtensionOfFilename(name);

      if (configjson.extension.indexOf(dot) !== -1) {
        return dot;
      }
      return "etc";
    },
    Replay(value) {
      this.$store.commit("mailjs/From", value);
      this.$router.push({ name: "WriteMail" });
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
      var result = await this.$store.dispatch("mailjs/MailDelete", {
        datas: arr,
      });

      if (result) {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style>
</style>