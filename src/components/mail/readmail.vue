<template>
  <div>
    <div class="rdmail_header">
      <em
        ><a @click="Back"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></a
      ></em>
      <div class="rdmail_icons">
        <span class="rd_reply fw_bold" @click="Replay('Reply')">{{
          lang.reply
        }}</span>
        <span class="rd_relay" v-if="!isDraft()" @click="Replay('Relay')">{{
          lang.fw
        }}</span>
        <span class="rd_relay fw_bold" v-else @click="Edit()">{{
          lang.edit
        }}</span>
        <span class="rd_del fw_bold" @click="mailDelete">{{
          lang.delete
        }}</span>
        <span class="rd_more"></span>
        <ul class="more_box">
          <li class="move">{{ lang.move }}</li>
          <li @click="SpamSet" v-if="!isDraft()">{{ lang.spam }}</li>
          <li @click="Replay('AllReply')">{{ lang.allreply }}</li>
          <li v-if="path.includes('trash')" @click="MailRecovery">
            {{ lang.recovery }}
          </li>
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
              <dt v-if="GetMailDetail.author.name">
                {{ GetMailDetail.author.name }}
              </dt>
              <dt v-else>{{ GetMailDetail.author.name }}</dt>
              <dd>{{ getTime(GetMailDetail.created) }}</dd>
            </dl>
            <em class="re_more"></em>
          </div>
          <ul class="re_refer_div">
            <li class="clfix refer01">
              <strong>{{ lang.sender }}</strong>
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
              <strong>{{ lang.copyto }}</strong>
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
            <!-- <li
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
            </li> -->
          </ul>
          <span
            class="star"
            @click="followUp(GetMailDetail.unid)"
            :class="{ active: this.GetMail.followUpInfo.use }"
          ></span>
          <FollowUp :unid="clickedUnid"></FollowUp>
        </div>
        <div class="add_file clfix"  v-if="GetMailDetail.attach.length>0">
          <strong>{{ lang.attach }}<em class="file_more"></em></strong>
          <Viewer
            className=""
            :attaInfo="GetMailDetail.attach"
            :attach="true"
            :unid="GetMailDetail.unid"
          />
        </div>
        <!-- <div class="rdm_edit" v-html="GetMailDetail.body">
          안녕하세요. 디자인 팀 안지영 입니다. 2021년 사내업무 및 유지 보수 내역
          보내드립니다. 감사합니다.
        </div> -->
        <div style="font-size: .93rem;color: #999;">
          <strong>본문 내의 링크 기능은 스미싱등 보안 상의 이유로 제공 하지 않습니다.</strong>
        </div>
        
        <div class="rdm_edit">
          <Body
            id="memo_t"
            style="height:100%"
            :body="GetMailDetail.body"
            ref="Body"
            :read="true"
            did="mail"
          />
        </div>
      </form>
    </div>
    <MoveFile></MoveFile>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MoveFile from "./movefile.vue";
import configjson from "../../config/config.json";
import FollowUp from "./folloup.vue";
export default {
  components: {
    MoveFile,
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
    ...mapGetters(["GetMailLanguage"]),
    path() {
      return this.$route.name;
    },
    sat() {
      return configjson.sat;
    },
  },
  mounted() {},
  created() {
    this.lang = this.GetMailLanguage.read;
    this.$store.dispatch("mailjs/FollowUpInfo", this.GetMailDetail.unid);
    this.$store.commit("mailjs/checkedNamesPush", this.GetMailDetail.unid);
  },
  methods: {
    downloadFile(value) {
      window.open(value.url, "Download");
      // const blob = new Blob([value.url], { type: "text/plain" });
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = value.url;
      // a.download = `${value.name}`;
      // a.click();
      // a.remove();
      // window.URL.revokeObjectURL(url);
    },
    isDraft() {
      if (this.GetfolderName) {
        return this.GetfolderName.indexOf("draft") !== -1;
      }
      return false;
    },
    Edit() {
      this.$router.push({ name: "WriteMail", query: { isEdit: true } });
    },
    followUp(unid) {
      this.clickedUnid = unid;
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
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
      this.$store.commit("SetBack", true);

      this.$store.commit("mailjs/Back");
      this.$router.go(-1);
    },
    getTime(date) {
      var moment = require("moment");
      var localTime = moment.utc(date).toDate();
      localTime = moment(localTime).format("YYYY-MM-DD HH:mm");
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
    MailRecovery() {
      this.$store.dispatch("mailjs/MailRecovery").then((res) => {
        if (res) {
          this.$router.go(-1);
        }
      });
    },
  },
};
</script>

<style>
</style>