<template>
  <div>
    <div class="sub_header">
      <div class="basic_header" :class="[{ on: this.mail.checkBtn.photoon }]">
        <h2>
          {{ title }}<span>({{ this.mail.data[this.path].data.total }})</span>
        </h2>
        <div>
          <span class="e_edit" @click="editClick"></span>
          <span class="sub_search"></span>
        </div>
        <span class="sub_ham"></span>
        <div class="re_search"></div>
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
            <li @click="Relay">{{ GetMailLanguage.option.receive }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search_con">
        <div>
          <div class="sc_top">
            <span class="back_btn"></span>
            <div>
              <!--8월 9일 태그 수정됨 -->
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                v-model="searchword"
              />
              <span class="search_btn" @click="Search"></span>
            </div>
            <!---->
            <!-- <input
              @keyup.enter="Search"
              type="text"
              placeholder="검색어를 입력하세요"
            /> -->
            <span class="sc_more"></span>
          </div>
          <div class="sc_btm">
            <p>
              <input type="checkbox" ref="all" class="all_sc_check active" />
              <label for="">전체</label>
            </p>
            <p>
              <span>
                <input type="checkbox" ref="subject" class="sc_check" />
                <label for="">제목</label>
              </span>
              <span>
                <input type="checkbox" ref="author" class="sc_check" />
                <label for="">보낸이</label>
              </span>
              <span>
                <input type="checkbox" ref="sender" class="sc_check" />
                <label for="">받는이</label>
              </span>
              <span>
                <input type="checkbox" ref="copyto" class="sc_check" />
                <label for="">참조자</label>
              </span>
            </p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  created(){
    this.searchword = this.GetMailConfig.searchOption.searchword;
  },
  data() {
      return {
        size: 0,
        page: 0,
        searchType: "",
        searchfield: "",
        searchword: "",
      };
    },
  computed: {
    ...mapState(["mail","mailSearchPath"]),
    ...mapGetters(["GetMailLanguage", "GetmailCustomFolderTitle","GetMailConfig"]),
    
    path() {
      if (this.$route.path.indexOf("custom") === -1) {
        return this.$route.path.substring(
          this.$route.path.lastIndexOf("/") + 1
        );
      } else {
        return "custom";
      }
    },
    title() {
      if (this.path === "mail_followup") {
        return this.GetMailLanguage.title["mail_importance"];
      } else if (this.path === "custom") {
        return this.GetmailCustomFolderTitle;
      } else {
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
    Relay() {
      if (this.mail.checkBtn.checkedNames.length > 0) {
        var unid = this.mail.checkBtn.checkedNames[0].unid;
        // this.$store.commit("checkedNamesPush", this.GetMailDetail.unid);
        this.$store.dispatch("MailDetail", unid);
        this.$store.commit("MailDetailUnid", unid);
        this.$store.commit("From", "Relay");
        this.$router.push("/maillist/write_mail");
      }
    },
    ReadFlag() {
      if (this.mail.checkBtn.checkedNames.length > 0) {
        this.$store.dispatch("ReadFlag", {
          datas: this.mail.checkBtn.checkedNames,
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
      console.log("여기안오냐고")
      if (this.mail.checkBtn.checkedNames.length > 0) {
        console.log(this.path)
        if(this.path !== "mail_trash"){
        this.$store.dispatch("MailDelete", {
          datas: this.mail.checkBtn.checkedNames,
          type: this.path,
        });
      }else{
        this.$store.dispatch("MailRealDelete", {
          datas: this.mail.checkBtn.checkedNames,
          type: this.path,
        });

      }
        this.$store.commit("mailDelete", { type: this.path });
      }
    },
    async Search() {
      var data = {};
      data.size = this.mail.searchOption.size;
      data.page = this.mail.searchOption.page;
      
      data.searchType = this.path;
      data.searchfield = "";
          
      var searchfield = this.mail.searchOption.searchfield;
      for(var i = 0; i < searchfield.length; i++) {
        var result = this.$refs[searchfield[i]].classList.contains("active");
        if(result){
          data.searchfield = searchfield[i];
        }
      }
      data.searchword = this.searchword;
      data.path = this.path;
      console.log(data)
      await this.$store.commit("MailSearchOption",data);
      if (this.mailSearchPath.includes(this.path)){
        this.$router.push(this.path);
      }
    },
  },
};
</script>

<style>
</style>