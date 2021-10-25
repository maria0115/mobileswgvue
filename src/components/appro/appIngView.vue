<template>
  <div>
    <BackHeader
      desc="결재중 문서"
      :title="`${this.params.title} ${title}`"
    ></BackHeader>
    <div class="a_contents02">
      <div>
        <div class="line01">
          <em>{{ this.detail.category }}</em>
          <strong>{{ this.detail.subject }}</strong>
          <div class="clfix">
            <em v-for="(value, index) in detail.approvalInfo" :key="index">
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
                >결재정보 <em>({{ detail.approvalInfo.length }})</em></a
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
                    <p v-if="value.body&&value.body!=='undefined'" v-html="value.body"></p>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li class="app_file" v-if="this.detail.attachInfo.length > 0">
            <h3 :class="{ active: attActive }">
              <a @click="isOpenAtt"
                >첨부파일 <em>({{ this.detail.attachInfo.length }})</em></a
              >
            </h3>
            <div :class="{ active: attActive }">
              <!-- <ul>
                <li
                  v-for="(value, index) in this.detail.attachInfo"
                  :key="index"
                >
                  <a>{{ value.name }}</a>
                  <div class="file_btn">
                    <span class="open_btn" @click="attOpen(value.path)"
                      >열기</span
                    >
                    <span class="save_btn">저장</span>
                  </div>
                </li>
              </ul> -->
              <Viewer
                className=""
                :attaInfo="this.detail.attachInfo"
                :attach="true"
                ref="viewer"
              ></Viewer>
            </div>
          </li>
        </ul>
        <div class="line03">
          <a v-html="detail.body"></a>
        </div>
      </div>
      <BtnPlus :menu="morePlus" @BtnClick="BtnClick"></BtnPlus>
    </div>
  </div>
</template>

<script>
import BackHeader from "./backheader.vue";
import SubMenu from "./menu.vue";
import BtnPlus from "./btnPlus.vue";
import { mapState, mapGetters } from "vuex";
import Viewer from "../editor/viewer.vue";
export default {
  created() {
    this.params = JSON.parse(this.$route.query.data);
    // this.params = this.GetHeader.menu;
  },
  computed: {
    // ...mapGetters("approjs", ["GetApproval"]),
    ...mapState("approjs", ["detail"]),
    ...mapGetters( ["GetHeader"]),
  },
  components: {
    BackHeader,
    SubMenu,
    BtnPlus,
    Viewer,
  },
  data() {
    return {
      morePlus: {
        // edit: "편집",
        // deleteItem: "삭제",
        agreeNreject: "회수",
        view: "원문 보기",
      },
      isOpen: false,
      title: "보기",
      body: "",
      appActive: false,
      attActive: false,
    };
  },
  methods: {
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
    BtnClick(value) {
      console.log(value,"value")
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
      } else if(value=='view'){
        console.log(value,"value")
        this.OriginView();
        return;

      }else if (value === "deleteItem") {
        data = this.detail;
      } else if (value == "agreeNreject") {
        let formData = new FormData();
        formData.append("openurl", this.detail.openurl);
        formData.append("approve", "recallall");
        data = formData;
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
    OriginView(){
      this.$refs.viewer.goOriginView({url:this.detail.openurl, name:this.detail.subject});
    },
  },
};
</script>

<style>
</style>