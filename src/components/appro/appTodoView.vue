<template>
  <div>
    <BackHeader
      desc="결재할 문서"
      :title="`${this.params.title} ${title}`"
    ></BackHeader>
    <div class="a_contents02">
      <div>
        <div class="line01">
          <em>{{ this.detail.category }}</em>
          <strong>{{ this.detail.subject }}</strong>
          <div class="clfix">
            <em v-for="(value, index) in this.detail.approvalInfo" :key="index">
              <span v-if="value.approval">{{ value.approvalKind }}</span>
            </em>
            <dl>
              <dt>
                {{ this.detail.authorName }} {{ this.detail.authorGradeName }} /
                {{ this.detail.authorOrgName }}
              </dt>
              <dd>{{ transTime(this.detail.created) }}</dd>
            </dl>
          </div>
        </div>
        <ul class="line02">
          <li v-if="detail.approvalInfo">
            <h3 :class="{ active: appActive }">
              <a @click="isOpenApp"
                >{{lang.appinfo}} <em>({{ this.detail.approvalInfo.length }})</em></a
              >
            </h3>
            <div :class="{ active: appActive }">
              <ul>
                <li
                  v-for="(value, index) in this.detail.approvalInfo"
                  :key="index"
                >
                  <span>{{ value.approvalKind }}</span>
                  <div>
                    <strong
                      >{{ value.author }} {{ value.authorposition }} /
                      {{ value.authordept }}</strong
                    >
                    <em v-if="value.created.length > 0">{{
                      transTime(value.created)
                    }}</em>
                    <P
                      v-if="value.body && value.body !== 'undefined'"
                      v-html="value.body"
                    ></P>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li class="app_file" v-if="this.detail.attachInfo.length > 0">
            <h3 :class="{ active: attActive }">
              <a @click="isOpenAtt"
                >{{lang.attach}} <em>({{ this.detail.attachInfo.length }})</em></a
              >
            </h3>
            <div :class="{ active: attActive }">
              <ul v-if="!sat">
                <li
                  v-for="(value, index) in this.detail.attachInfo"
                  :key="index"
                >
                  <a :href="value.url" download>{{ value.name }}</a>
                  <!-- <div class="file_btn">
                    <span class="open_btn" @click="attOpen(value.path)"
                      >열기</span
                    >
                    <span class="save_btn">저장</span>
                  </div> -->
                </li>
              </ul>
              <Viewer
                v-else
                className=""
                :attaInfo="this.detail.attachInfo"
                :attach="true"
              ></Viewer>
            </div>
          </li>
        </ul>
        <div class="line03">
          <a v-html="detail.body" style="overflow-x: auto"></a>
        </div>
        <!-- <div class="line04 clfix">
          <form @submit.prevent>
            <strong>결재의견</strong>
            <div>
              <input type="text" v-on:input="comment = $event.target.value" />
            </div>
          </form>
        </div> -->
      </div>
      <BtnPlus :menu="morePlus" @BtnClick="BtnClick"></BtnPlus>
      <Viewer className="" :attach="false" ref="viewer"></Viewer>
    </div>
    <Comment
      :isOpen="agreeNreject"
      @ModalOff="ModalOff"
      @AgreeNReject="AgreeNReject"
    ></Comment>
  </div>
</template>

<script>
import BackHeader from "./backheader.vue";
import SubMenu from "./menu.vue";
import BtnPlus from "./btnPlus.vue";
import Comment from "./Comment.vue";
import { mapState, mapGetters } from "vuex";
import Viewer from "../editor/viewer.vue";

import config from "@/config/config.json";
export default {
  created() {
    const language = this.GetAppL.todolist;
    // this.commonl = this.GetCommonL;
    this.lang = language;

    var more = language.morePlus;
    this.morePlus.agree = more.agree;
    this.morePlus.reject = more.reject;
    this.morePlus.view = more.view;
    this.title = language.title;
    this.params = JSON.parse(this.$route.query.data);
    // this.params = this.GetHeader.menu;
    if (!this.detail.agreeBtn) {
      // this.morePlus = { view: "원문 보기",deleteItem: "삭제", };
      this.morePlus = { view: more.view };
    }
    if (this.detail.status == "mutualing") {
      this.morePlus = {
        agree: more.mutualing.agree,
        reject: more.mutualing.agree,
        view: more.view,
      };
    }
  },
  computed: {
    // ...mapGetters("approjs", ["GetApproval"]),
    ...mapState("approjs", ["detail"]),
    ...mapGetters(["GetHeader"]),
    ...mapGetters("approjs", ["GetSaveApproval"]),
    sat() {
      return config.sat;
    },
  },
  components: {
    BackHeader,
    SubMenu,
    BtnPlus,
    Viewer,
    Comment,
  },
  data() {
    return {
      morePlus: { agree: "승인", reject: "반려", view: "원문 보기" },
      title: "보기",
      appActive: false,
      attActive: false,
      agreeNreject: false,
    };
  },
  methods: {
    ModalOff() {
      this.agreeNreject = false;
    },
    path() {
      return this.$route.name;
    },
    BtnClick(e) {
      if (e === "deleteItem") {
        var data = this.detail;
        data.unid = this.GetSaveApproval.unid;
        data.deleteType = "draft";
        this.$store.dispatch(`approjs/${e}`, data).then((res) => {
          if (res) {
            // this.SetHeader(this.params);
            this.$router.go(-1);
          }
        });
        return;
      } else if (e == "view") {
        this.OriginView();
        return;
      }

      this.agreeNreject = true;
      this.nowBtn = e;
    },
    AgreeNReject(comment) {
      let formData = new FormData();
      formData.append("openurl", this.detail.openurl);
      formData.append("comment", comment);
      formData.append("approve", this.nowBtn);

      this.$store.dispatch("approjs/agreeNreject", formData).then((res) => {
        if (res) {
          this.$router.go(-1);
        }
      });
    },
    // utc 시간 to local 시간
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YY.MM.DD HH:mm");
      return localTime;
    },
    isOpenApp() {
      this.appActive = !this.appActive;
    },
    isOpenAtt() {
      this.attActive = !this.attActive;
    },
    attOpen(url) {
      window.open(url);
    },
    OriginView() {
      // location.href = config.originPage + this.detail.openurl;
      // node 원문보기
      this.$router.push({
        name: "originalPage",
        params: { url: this.detail.openurl },
      });
      // 첨부변환서버 원문보기
      // this.$refs.viewer.goOriginView({
      //   url: this.detail.openurl,
      //   name: this.detail.subject,
      // });
      // this.$refs.viewer.goOriginView({url:this.detail.openurl, name:this.detail.subject});
    },
  },
};
</script>

<style>
</style>