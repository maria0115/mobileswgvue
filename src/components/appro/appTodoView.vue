<template>
  <div>
    <BackHeader desc="결재할 문서" :title="title"></BackHeader>
    <div class="a_contents02">
      <div>
        <div class="line01">
          <em>{{ this.detail.category }}</em>
          <strong>{{ this.detail.subject }}</strong>
          <div class="clfix">
            <em v-for="(value,index) in this.detail.approvalInfo" :key="index">

            <span v-if="value.approval">{{value.approvalKind}}</span>
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
                    <em v-if="value.created.length>0">{{ transTime(value.created) }}</em>
                    <P v-if="value.body" v-html="value.body"
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
        <div class="line03">
          <a v-html="detail.body"></a>
        </div>
        <div class="line04 clfix">
          <form>
            <strong>결재의견</strong>
            <div>
              <input type="text" v-on:input="comment=$event.target.value" />
            </div>
          </form>
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
      morePlus: { agree: "승인" ,reject: "반려"}, 
      title: "결재할 문서",
      appActive:false,
      attActive:false,
      comment:"",
    };
  },
  methods: {
    BtnClick(e){
      console.log("BtnClick",e,this.comment);
      let formData = new FormData();
      formData.append("openurl", this.detail.openurl);
      formData.append("comment", this.comment);
      formData.append("approve", e);

      this.$store.dispatch("approjs/agreeNreject",formData)

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