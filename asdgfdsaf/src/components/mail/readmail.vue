<template>
  <div>
      <div class="rdmail_header">
        <em><a @click="Back"><img src="../../mobile/img/wmail_back.png" alt=""></a></em>
        <div class="rdmail_icons">
            <span class="rd_reply">답장</span>
            <span class="rd_relay">전달</span>
            <span class="rd_del" @click="mailDelete">삭제</span>
            <span class="rd_more"></span>
            <ul class="more_box">
                <li class="move">이동</li>
                <li>스팸차단</li>
                <li>전체답장</li>
            </ul>
        </div>
    </div>
    <div class="m_contents04">
        <form action="">
            <div class="rd_top">
                <h2 class="mail_tit">{{GetMailDetail.subject}}</h2>
                <div class="clfix">
                    <span class="per_img">
                        <em class="no_img" style="background:#aea9db;"><b>{{ GetMailDetail.author.name.split("")[0] }}</b></em>
                    </span>
                    <dl>
                        <dt>{{GetMailDetail.author.name}}</dt>
                        <dd>{{getTime(GetMailDetail.created)}}</dd>
                    </dl>
                    <em class="re_more"></em>
                </div>
                <ul class="re_refer_div"> 
                    <li class="clfix refer01">
                        <strong>받는사람</strong>
                        <div>
                            <span v-for="(value,index) in GetMailDetail.sendTo" :key="index">{{value.name}} {{value.position}}</span>
                        </div>
                    </li>
                    <li class="clfix refer02">
                        <strong>참조</strong>
                        <div>
                            <span v-for="(value,index) in GetMailDetail.copyTo" :key="index">{{value.name}} {{value.position}}</span>
                        </div>
                    </li>
                    <li class="clfix refer02" v-if="GetMailDetail.blindCopyTo.length>0">
                        <strong>숨은 참조</strong>
                        <div>
                            <span v-for="(value,index) in GetMailDetail.blindCopyTo" :key="index">{{value.name}} {{value.position}}</span>
                        </div>
                    </li>
                </ul>
                <span class=""><img src="../../mobile/img/star.png" alt="즐겨찾기"></span>
            </div>
            <div class="add_file clfix">
                <strong>첨부파일</strong>
                <ul>
                    <li v-for="(value,index) in GetMailDetail.attach" :key="index" @click="attachClick(value.url)" class="active">
                        <span><img src="../../mobile/img/test_img01.png" alt=""></span>
                        <div>
                            <p>{{value.name}}</p>
                            <em>({{value.size}})</em>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="rdm_edit" v-html="GetMailDetail.body">
                안녕하세요.
                디자인 팀 안지영 입니다.
                2021년 사내업무 및 유지 보수 내역 보내드립니다.
                감사합니다. 
            </div>
        </form>
    </div>
    <Footer></Footer>
    <MoveFile></MoveFile>
  </div>
</template>

<script>
import Footer from "./footer.vue";
import { mapState, mapGetters } from "vuex";
import MoveFile from "./movefile.vue";

export default {
  components: {
    Footer,
    MoveFile,
  },
  computed: {
    ...mapState([]),
    ...mapGetters(["GetMailDetail"]),
  },
  created(){
    //   console.log("created",this.GetMailDetail)
    //   this.$store.commit("MailDetailUnidPush",this.GetMailDetail.unid);
  },
  methods: {
    Back() {
        this.$store.commit("Back");
      this.$router.go(-1);
    },
    getTime(date) {
      var moment = require("moment");
      var localTime = moment.utc(date).toDate();
      localTime = moment(localTime).format("YYYY-MM-DD일 HH:mm");
      return localTime;
    },
    attachClick(url){
        window.open(url);
    },
    mailDelete(){
        var data = {};
        data.unid = this.GetMailDetail.unid;
        var arr = [];
        arr.push(data);
        var result = this.$store.dispatch("MailDelete",{datas:arr});
        if(result){
            this.$router.go(-1);
        }
    },
  },
};
</script>

<style>

</style>