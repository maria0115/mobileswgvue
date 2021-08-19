<template>
  <div class="sub_header">
      <div class="basic_header" :class="[{ on: this.mail.checkBtn.photoon }]">
        <h2>
          {{ title
          }}<span>({{ this.mail.data[this.path].data.total }})</span>
        </h2>
        <div>
          <span class="e_edit" @click="editClick"></span>
          <span class="sub_search"></span>
        </div>
        <span class="sub_ham"></span>
      </div>
      <div
        class="edit_header"
        :class="[{ on: this.mail.checkBtn.editclicked }]"
      >
        <h2>
          <img
            class="mail_back"
            @click="Back"
            src="../../mobile/img/m_edit_icon01.png"
            alt=""
          /><em>{{ this.mail.checkBtn.checkedNames.length }}</em
          >개
        </h2>
        <div>
          <span class="all_btn" @click="allCheck"></span>
          <span class="trash_btn" @click="mailDelete"></span>
          <span class="spam_btn"></span>
          <span class="edit_more"></span>
          <ul class="more_box">
            <li @click="ReadFlag">{{ GetMailLanguage.option.readsign }}</li>
            <li class="move">{{ GetMailLanguage.option.move }}</li>
            <li>{{ GetMailLanguage.option.receive }}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {

    computed: {
    ...mapState(["mail"]),
    ...mapGetters([
      "GetMailLanguage",
      "GetmailCustomFolderTitle",
      
    ]),
    path() {
      if(this.$route.path.indexOf("custom") === -1){
        return this.$route.path.substring(this.$route.path.lastIndexOf("/") + 1);

      }else{
        return "custom";
      }
    },
    title(){

      if(this.path === "mail_followup"){
        return this.GetMailLanguage.title['mail_importance'];

      }else if(this.path === "custom"){
        return this.GetmailCustomFolderTitle;
        }else{
        return this.GetMailLanguage.title[this.path];

      }

    },
  },
  beforeRouteLeave(to, from, next) {
    // this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
    this.$store.commit("Back");
    next();
    
  },
  methods: {
    ReadFlag(){
      if (this.mail.checkBtn.checkedNames.length > 0) {
        this.$store.dispatch("ReadFlag", {
          datas: this.mail.checkBtn.checkedNames
        });
      }
    },
      // 목록의 전체 체크박스 clicked
    allCheck() {
      this.$store.commit("allCheck", this.path);
    },
    // 목록 선택 비활성화
    Back() {
      this.$store.commit("Back");
    },
    // 체크박스 활성화
    editClick() {
      this.$store.commit("editClick");
    },
    // 선택된 메일 삭제
    mailDelete() {
      if (this.mail.checkBtn.checkedNames.length > 0) {
        this.$store.dispatch("MailDelete", {
          datas: this.mail.checkBtn.checkedNames,
          type: this.path,
        });
        this.$store.commit("mailDelete", { type: this.path });
      }
    },
  }

}
</script>

<style>

</style>