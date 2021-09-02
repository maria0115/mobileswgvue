<template>
  <div>
    <BackHeader desc="결재중 문서" :title="title"></BackHeader>
    <div class="a_contents02">
      <div>
        <div class="line01">
          <em>{{ this.detail.category }}</em>
          <strong>{{ this.detail.subject }}</strong>
          <div class="clfix">
            <span>{{ this.detail.approvalInfo.approval }}</span>
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
          <li>
            <h3 :class="{active:appActive}">
              <a @click="isOpenApp">결재정보 <em>({{this.detail.approvalInfo.length}})</em></a>
            </h3>
            <div :class="{active:appActive}">
              <ul>
                <li v-for="(value,index) in this.detail.approvalInfo" :key="index">
                  <span>{{value.approvalKind}}</span>
                  <div>
                    <strong>{{value.author}} {{value.authorposition}} / {{value.authordept}}</strong>
                    <em>{{ transTime(value.created) }}</em>
                    <P v-html="value.body"
                      ></P
                    >
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li class="app_file" v-if="this.detail.attachInfo.length>0">>
            <h3 :class="{active:attActive}">
              <a @click="isOpenAtt">첨부파일 <em>({{this.detail.attachInfo.length}})</em></a>
            </h3>
            <div :class="{active:attActive}">
              <ul>
                <li v-for="(value,index) in this.detail.attachInfo" :key="index">
                  <a>{{value.name}}</a>
                  <div class="file_btn">
                    <span class="open_btn" @click="attOpen(value.path)">열기</span>
                    <span class="save_btn">저장</span>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="line03" >
          <a v-html="detail.body"></a>
        </div>
      </div>
      <BtnPlus :menu="morePlus"></BtnPlus>
    </div>
  </div>
</template>

<script>
import BackHeader from "./backheader.vue";
import SubMenu from "./menu.vue";
import BtnPlus from "./btnPlus.vue";
import { mapState, mapGetters } from "vuex";
export default {
  created() {
    console.log(this.detail);
  },
  computed: {
    // ...mapGetters("approjs", ["GetApproval"]),
    ...mapState("approjs", ["detail"]),
  },
  components: {
    BackHeader,
    SubMenu,
    BtnPlus,
  },
  data() {
    return {
      morePlus: [
        { circulate: "회람" },
        { modify: "편집" },
        { remove: "삭제" },
        { uppercancle: "상신취소" },
      ],
      isOpen: false,
      title: "결재중 문서 보기",
      body: "",
      appActive:false,
      attActive:false,
    };
  },
  methods: {
    attOpen(path){
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
    isOpenApp(){
      this.appActive = !this.appActive;
    },
    isOpenAtt(){
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