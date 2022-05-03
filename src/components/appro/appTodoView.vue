<template>
  <div>
    <BackHeader
      desc="결재할 문서"
      :title="`${this.params.title} ${title}`"
    ></BackHeader>
    <div class="a_contents02" v-if="this.Config.company == 'ace'">
      <div>
        <div class="line01">
          <em>{{ this.detail.category }}</em>
          <strong>{{ this.detail.subject }}</strong>
          <div class="clfix">
            <em v-if="this.isApproval().length > 0">
              <span>{{ this.isApproval() }}</span>
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
                >{{ lang.appinfo }}
                <em>({{ this.detail.approvalInfo.length }})</em></a
              >
            </h3>
            <div :class="{ active: appActive }">
              <ul>
                <li
                  v-for="(value, index) in this.detail.approvalInfo"
                  :key="index"
                >
                  <span :class="{ active: value.approval }">{{
                    value.approvalKind
                  }}</span>
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
                >{{ lang.attach }}
                <em>({{ this.detail.attachInfo.length }})</em></a
              >
            </h3>
            <div :class="{ active: attActive }">
              <Viewer
                className=""
                :attaInfo="this.detail.attachInfo"
                :attach="true"
                :unid="this.detail.unid"
              ></Viewer>
            </div>
          </li>
        </ul>
        <div class="line03">
          <!-- v-if="detail.body.length > 0" -->
          <a v-html="detail.body" style="overflow-x: auto"></a>
          <!-- <span v-else @click="setOrigin" class="origi_btn">{{
            lang.morePlus.view
          }}</span> -->
        </div>
        <div class="line03" v-if="!isOrigin">
          <span @click="setOrigin" class="origi_btn">{{
            lang.morePlus.view
          }}</span>
        </div>
        <div class="line03" v-else-if="isI()">
          <span @click="goOrigin" class="origi_btn">{{ GetCommonL.zoom }}</span>
        </div>
        <div class="line04" v-if="isOrigin">
          <iframe
            :src="url"
            style="
              width: 100%;
              height: 100%;
              overflow: hidden;
              border: 0px;
              pointer-events: none;
            "
          ></iframe>
        </div>
      </div>
      <BtnPlus :menu="morePlus" @BtnClick="BtnClick"></BtnPlus>
      <Viewer className="" :attach="false" ref="viewer"></Viewer>
    </div>
    <div v-else class="a_contents02">
      <div>
        <ul class="line02">
          <li></li>
          <li class="app_file" v-if="this.detail.attachInfo.length > 0">
            <h3 :class="{ active: attActive }">
              <a @click="isOpenAtt"
                >{{ lang.attach }}
                <em>({{ this.detail.attachInfo.length }})</em></a
              >
            </h3>
            <div :class="{ active: attActive }">
              <Viewer
                className=""
                :attaInfo="this.detail.attachInfo"
                :attach="true"
                :unid="this.detail.unid"
              ></Viewer>
            </div>
          </li>
        </ul>
        <div class="line03" v-if="isI()">
          <span @click="goOrigin" class="origi_btn">{{ GetCommonL.zoom }}</span>
        </div>
      </div>
      <iframe
        :src="url"
        style="
        width: 100%;
        height: calc(100vh)!important
        overflow: hidden;
        border: 0px;
        pointer-events: none;
      "
      ></iframe>
      <BtnPlus :menu="morePlus" @BtnClick="BtnClick"></BtnPlus>
      <Viewer className="" :attach="false" ref="viewer"></Viewer>
    </div>
    <Comment
      :nowBtn="this.morePlus[this.nowBtn]"
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
import config from "@/config/config.json";
export default {
  created() {
    const language = this.GetAppL.todolist;
    // this.commonl = this.GetCommonL;
    this.lang = language;

    var more = language.morePlus;
    this.morePlus.agree = more.agree;
    this.morePlus.reject = more.reject;
    if (this.Config().company !== "ace") {
      this.morePlus.view = more.view;
    }
    this.title = language.title;
    this.params = JSON.parse(this.$route.query.data);

    if (this.Config().company == "ace") {
      this.aceOrigin();
    }
    // this.params = this.GetHeader.menu;
    if (!this.detail.agreeBtn) {
      // this.morePlus = { view: "원문 보기",deleteItem: "삭제", };
      if (this.Config().company !== "ace") {
        this.morePlus.view = more.view;
      }
    }

    if (this.detail.status == "mutualing") {
      this.morePlus = {
        agree: more.mutualing.agree,
        reject: more.mutualing.reject,
      };

      if (this.Config().company !== "ace") {
        this.morePlus.view = more.view;
      }
    }

    if (this.detail.isEditBtn) {
      this.morePlus.edit = more.edit;
    }
  },
  mounted() {
    if (this.isA()) {
      this.setViewPort(
        "width=device-width, initial-scale=1.0, maximum-scale=10.0, user-scalable=yes"
      );
    }
  },
  beforeDestroy() {
    if (this.isA()) {
      var views = document.querySelectorAll('[name="viewport"]');
      for (var i = 0; i < views.length; i++) {
        document.getElementsByTagName("head")[0].removeChild(views[i]);
      }
      this.setViewPort(
        "width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no"
      );
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
    Comment,
  },
  data() {
    return {
      morePlus: {},
      title: "보기",
      appActive: false,
      attActive: false,
      agreeNreject: false,
      nowBtn: "",
      url: "",
      isOrigin: false,
    };
  },
  methods: {
    aceOrigin() {
      if (this.url.length == 0) {
        this.getSrcUrl(
          this.Config().originPage + this.detail.openurl + "&fullscroll=1"
        ).then((res) => {
          this.url = res;
        });
      }
      // this.url =
      //   this.host() +
      //   this.Config().originPage +
      //   this.detail.openurl +
      //   "&fullscroll=1";
    },
    setOrigin() {
      if (this.url.length == 0) {
        this.getSrcUrl(
          this.Config().originPage + this.detail.openurl + "&fullscroll=1"
        ).then((res) => {
          this.url = res;
        });
      }
      this.isOrigin = !this.isOrigin;
    },
    goOrigin() {
      this.OriginView({
        url: this.detail.openurl,
        name: this.detail.subject,
        unid: this.detail.unid,
      });
    },
    isApproval() {
      var info = this.detail.approvalInfo;
      for (var i in info) {
        if (info[i].approval) {
          return info[i].approvalKind;
        }
      }
      return "";
    },
    ModalOff() {
      this.agreeNreject = false;
    },
    path() {
      return this.$route.name;
    },
    BtnClick(e) {
      if (e == "edit") {
        this.params.isedit = 1;
        this.params.form = this.detail.formCode;
        this.params.formtitle = this.detail.category;
        // this.SetHeader(this.params);
        this.$router.push({
          name: "appwrite",
          query: { data: JSON.stringify(this.params) },
        });
        return;
      } else if (e === "deleteItem") {
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
        this.OriginView({
          url: this.detail.openurl,
          name: this.detail.subject,
          unid: this.detail.unid,
        });
        return;
      }

      this.agreeNreject = true;
      this.nowBtn = e;
      // console.log(this.nowBtn)
    },
    AgreeNReject(comment) {
      // if (confirm("제출 하시겠습니까") == true) {
      let formData = new FormData();
      formData.append("openurl", this.detail.openurl);
      formData.append("comment", comment);
      formData.append("approve", this.nowBtn);

      this.$store.dispatch("approjs/agreeNreject", formData).then((res) => {
        if (res) {
          this.$router.go(-1);
        }
      });
      // } else {
      //   return;
      // }
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
  },
};
</script>

<style>
</style>