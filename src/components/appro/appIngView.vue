<template>
  <div>
    <BackHeader
      desc="결재중 문서"
      :title="`${this.params.title} ${lang.title}`"
    ></BackHeader>
    <div class="a_contents02">
      <div>
        <div class="line01">
          <em>{{ this.detail.category }}</em>
          <strong>{{ this.detail.subject }}</strong>
          <div class="clfix">
            <em v-if="this.isApproval().length>0">
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
                >{{ this.lang.appinfo }}
                <em>({{ detail.approvalInfo.length }})</em></a
              >
            </h3>
            <div :class="{ active: appActive }">
              <ul>
                <li
                  v-for="(value, index) in this.detail.approvalInfo"
                  :key="index"
                >
                  <span :class="{active:value.approval}">{{ value.approvalKind }}</span>
                  <div>
                    <strong
                      >{{ value.author }} {{ value.authorposition }} /
                      {{ value.authordept }}</strong
                    >
                    <em v-if="value.created.length > 0">{{
                      transTime(value.created)
                    }}</em>
                    <p
                      v-if="value.body && value.body !== 'undefined'"
                      v-html="value.body"
                    ></p>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li class="app_file" v-if="this.detail.attachInfo.length > 0">
            <h3 :class="{ active: attActive }">
              <a @click="isOpenAtt"
                >{{ this.lang.attach }}
                <em>({{ this.detail.attachInfo.length }})</em></a
              >
            </h3>
            <div :class="{ active: attActive }">
              <Viewer
                className=""
                :attaInfo="this.detail.attachInfo"
                :attach="true"
                :unid="this.detail"
              ></Viewer>
            </div>
          </li>
        </ul>
        <div class="line03">
          <a v-html="detail.body" v-if="detail.body.length>0" style="overflow-x: auto"></a>
          <span v-else @click="goOrigin" class="origi_btn">원문보기</span>
        </div>
      </div>
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

import config from "@/config/config.json";

import { mapState, mapGetters } from "vuex";
export default {
  created() {
    const language = this.GetAppL.ingread;
    // this.morePlus = language.morePlus;
    // this.title = language.title;
    // this.commonl = this.GetCommonL;
    var more = language.morePlus;
    this.title = language.title;
    this.morePlus.view = more.view;
    this.params = JSON.parse(this.$route.query.data);
    if (this.detail.isCollect) {
      this.morePlus.agreeNreject = more.agreeNreject;
    }
    if (this.detail.agreeBtn) {
      // this.morePlus = { view: "원문 보기",deleteItem: "삭제", };
      if (this.detail.status == "mutualing") {
        this.morePlus.agree = more.mutualing.agree;
        this.morePlus.reject = more.mutualing.reject;
      } else {
        this.morePlus.agree = more.agree;
        this.morePlus.reject = more.reject;
      }
    }
    this.lang = language;
  },
  computed: {
    // ...mapGetters("approjs", ["GetApproval"]),
    ...mapState("approjs", ["detail"]),
    ...mapGetters(["GetHeader"]),
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
      isOpen: false,
      body: "",
      appActive: false,
      attActive: false,
      agreeNreject: false,
      morePlus: {},
      nowBtn:""
    };
  },
  methods: {
    isApproval(){
      var info = this.detail.approvalInfo;
      for(var i in info){
        if(info[i].approval){
          return info[i].approvalKind;
        }

      }
      return "";
    },
    ModalOff() {
      this.agreeNreject = false;
    },
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
    goOrigin(){
      this.OriginView({
          url: this.detail.openurl,
          name: this.detail.subject,
          unid:this.detail.unid,
        });
    },
    BtnClick(value) {
      var data = undefined;
      if (value == "edit") {
        this.params.isedit = 1;
        this.params.form = this.detail.formCode;
        this.params.formtitle = this.detail.category;
        // this.SetHeader(this.params);
        this.$router.push({
          name: "appwrite",
          query: { data: JSON.stringify(this.params) },
        });
        return;
      } else if (value == "view") {
        this.OriginView({
          url: this.detail.openurl,
          name: this.detail.subject,
          unid:this.detail.unid,
        });
        return;
      } else if (value === "deleteItem") {
        data = this.detail;
      } else if (value == "agree" || value == "reject") {
        // let formData = new FormData();
        // formData.append("openurl", this.detail.openurl);
        // formData.append("approve", "recallall");
        // data = formData;
        this.agreeNreject = true;
        this.nowBtn = value;
        return;
      } else if (value == "agreeNreject") {
        let formData = new FormData();
        formData.append("openurl", this.detail.openurl);
        formData.append("approve", "recallall");

        this.$store.dispatch("approjs/agreeNreject", formData).then((res) => {
          if (res) {
            this.$router.go(-1);
          }
        });
        return;
      }
      this.$store.dispatch(`approjs/${value}`, data).then((res) => {
        if (res) {
          // this.SetHeader(this.params);
          this.$router.push({
            name: "appapproving",
            query: { data: JSON.stringify(this.params) },
          });
        }
      });
    },
    AgreeNReject(comment) {
      if(confirm("제출 하시겠습니까")==true){
        let formData = new FormData();
        formData.append("openurl", this.detail.openurl);
        formData.append("comment", comment);
        formData.append("approve", this.nowBtn);
  
        this.$store.dispatch("approjs/agreeNreject", formData).then((res) => {
          if (res) {
            this.$router.go(-1);
          }
        });
      }else{
        return;
      }
    },
    attOpen(path) {
      window.open(path);
    },
    OpenHam() {
      this.isOpen = true;
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
  },
};
</script>

<style>
</style>