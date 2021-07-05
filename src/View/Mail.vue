<template>
  <div class="wrap btm_b" :class="{ dark: this.color }">
    <div class="sub_header">
      <div class="basic_header" :class="[{ on: this.mail.checkBtn.photoon }]">
        <h2>
          {{this.path}}받은메일<span>({{ this.mail.data[this.path].data.total }})</span>
        </h2>
        <div>
          <span class="e_edit" @click="editClick"></span>
          <span class="sub_search"></span>
        </div>
        <span class="sub_ham"></span>
      </div>
      <div class="edit_header" :class="[{ on: this.mail.checkBtn.editclicked }]">
        <h2>
          <img
            class="mail_back"
            @click="Back"
            src="../mobile/img/m_edit_icon01.png"
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
            <li>읽음표시</li>
            <li class="move">이동</li>
            <li><a>전달</a></li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="move_file">
      <div class="move_bg"></div>
      <ul>
        <li class="active">받은메일함</li>
        <li>보낸메일함</li>
        <li>내게쓴메일함</li>
        <li>중요메일</li>
        <li>스팸함</li>
        <li>폴더</li>
        <li>휴지통</li>
      </ul>
    </div>
    <span class="w_mail_btn"></span>
    <div class="mail_sub">
      <div class="mail_inner">
        <div class="info_tit">
          <span class="mail_img01"></span>
          <dl>
            <dt>{{this.GetMyInfo.info.name}} {{this.GetMyInfo.info.position}}</dt>
            <dd>{{this.GetMyInfo.info.dept}}</dd>
          </dl>
          <div>
            <span class="mail_sub_set"></span>
            <span class="mail_sub_close"></span>
          </div>
        </div>
        <div class="mail_box_list01">
          <div>
            <em>기본 메일함</em>
            <ul class="list_menu">
              <li>
                <h3><router-link to="mail_unread" >안읽은메일</router-link></h3>
              </li>
              <li>
                <h3>
                  <a @click="depthDown($event, $parent)" class="down_more"
                    >받은메일</a
                  >
                </h3>
                <ul class="depth02">
                  <router-link to="mail_inner"><li><a>내부메일</a></li></router-link>
                  <router-link to="mail_outer"><li><a>외부메일</a></li></router-link>
                  <li><a>알림메일</a></li>
                  <router-link to="mail_attach"><li><a>첨부메일</a></li></router-link>
                </ul>
              </li>
              <li>
                <h3><router-link to="sent_detail" @click="depthDown($event, $parent)">보낸메일</router-link></h3>
                <ul class="depth02">
                  <li><a></a></li>
                </ul>
              </li>
              <li>
                <h3>
                  <a @click="depthDown($event, $parent)" class="down_more"
                    >임시보관</a
                  >
                </h3>
                <ul class="depth02">
                  <router-link to="mail_draft"><li><a>임시저장</a></li></router-link>
                  <router-link to="mail_autoSave"><li><a>자동저장</a></li></router-link>
                </ul>
              </li>
              <li>
                <h3><router-link to="mail_reservation"  @click="depthDown($event, $parent)">예약메일</router-link></h3>
                <ul class="depth02">
                  <li><a></a></li>
                </ul>
              </li>
              <li>
                <router-link to="mail_my"><h3><a @click="depthDown($event, $parent)">내게 쓴 메일</a></h3></router-link>
                <ul class="depth02">
                  <li><a></a></li>
                </ul>
              </li>
              <li>
                <router-link to="mail_importance"><h3>
                  <a @click="depthDown($event, $parent)" class="down_more"
                    >중요메일</a
                  >
                </h3></router-link>
                <ul class="depth02">
                  <li><a>내부메일</a></li>
                </ul>
              </li>
              <li>
                <router-link to="mail_trash"><h3><a @click="depthDown($event, $parent)">휴지통</a></h3></router-link>
                <ul class="depth02">
                  <li><a></a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <em>폴더</em>
            <ul class="list_menu">
              <li>
                <h3><a class="down_more">기본 폴더</a></h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ul class="btm_btn clfix">
      <router-link to="/"
        ><li class="home"><a></a></li
      ></router-link>
      <li class="back" @click="RouterBack"><a></a></li>
      <li class="go" @click="RouterGo"><a></a></li>
      <li class="refresh" @click="RouterRefresh"><a></a></li>
      <li class="link" @click="RouterLink"><a></a></li>
      <li class="btm_more"><a></a></li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    
  },
  data() {
    return {
      active: false,
      tooltipActiveIndex: -1,
      tooltipText: [""],
      checkEvent: "touch",
    };
  },
  computed: {
    ...mapState(["mail"]),
    ...mapGetters(["GetMail","GetMyInfo","GetSystemColor","GetConfig"]),
    color() {
      if (this.GetSystemColor === "dark") {
        return true;
      }
    },
    path(){
      return this.$route.path.substring(this.$route.path.lastIndexOf("/")+1);
    },
  },
  mounted() {
    if ("ontouchstart" in document.documentElement !== true) {
      this.checkEvent = "mouse";
    }
    // dom이 생성된 후 font setting
    $(".wrap").css("font-family", this.GetConfig.font.font);
  },
  created() {
    // font size setting
    if (this.GetConfig.font.size == "small") {
      $("html").addClass("small");
      $("html").removeClass("normal");
      $("html").removeClass("large");
      $("html").removeClass("mar15");
    } else if (this.GetConfig.font.size == "normal") {
      $("html").addClass("normal");
      $("html").removeClass("small");
      $("html").removeClass("large");
      $("html").removeClass("mar15");
    } else if (this.GetConfig.font.size == "large") {
      $("html").addClass("large");
      $("html").removeClass("small");
      $("html").removeClass("normal");
      $("html").addClass("mar15");
      
    }
  },
  methods: {
    RouterBack() {
      this.$router.go(-1);
    },
    RouterGo() {
      this.$router.go(1);
    },
    RouterRefresh() {
      this.$router.push(this.$route.path);
    },
    RouterLink() {
      console.log("routerlink");
    },
    depthDown(e, t) {
      $(e.currentTarget.parentElement.nextElementSibling).slideToggle();
      $(e.currentTarget.parentElement).toggleClass("on");
    },
    allCheck() {
      this.$store.commit("allCheck",this.path);
    },
    Back() {
      this.$store.commit("Back");
    },
    editClick() {
      this.$store.commit("editClick");
    },
    mailDelete() {
      this.$store.dispatch("MailDelete", {
        datas: this.mail.checkBtn.checkedNames,
        type: this.path,
      });
      this.$store.commit("mailDelete",{type: this.path});
    },

    
  },
};
</script>

<style>
</style>