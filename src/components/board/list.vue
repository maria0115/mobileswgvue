<template>
  <div>
    <div class="sub_header noti">
      <div class="basic_header on">
        <h2>{{ path }}</h2>
        <div>
          <span class="e_edit"></span
          ><!--관리자 모드일때 노출되어야함-->
          <span class="sub_search"></span>
        </div>
        <span class="sub_ham" @click="OpenHam"></span>
      </div>
      <div class="edit_header">
        <!--관리자 모드일때 노출되어야함-->
        <h2>
          <img
            class="mail_back"
            src="../../mobile/img/m_edit_icon01.png"
            alt=""
          /><em>1</em>개
        </h2>
        <div>
          <span class="all_btn"></span>
          <span class="trash_btn"></span>
        </div>
      </div>
    </div>
    <div class="m_contents02">
      <form action="">
        <ul class="board_list">
          <li v-for="(value, index) in GetBoard[path].data" :key="index">
            <a @click="Read(value)">
              <span class="basic_img on">
                <!-- <img src="../../mobile/img/img01.png" alt=""> -->
                <em class="no_img" :style="randomColor()"
                  ><b>{{ value.author.split("")[0] }}</b></em
                >
              </span>
              <input type="checkbox" class="edit_check" />
              <dl>
                <dt>
                  <span :class="{ new: boo(value) }"></span
                  ><em class="bul_tit">{{ value.category }}</em
                  >{{ value.subject }}
                </dt>
                <dd>
                  {{ value.author }}<span>{{ transTime(value.created) }}</span
                  ><em class="like">{{ value.readcnt }}</em>
                </dd>
              </dl>
              <span :class="{ clip: value.attach }"></span>
            </a>
          </li>
          <infinite-loading
            @infinite="infiniteHandler"
            :identifier="infiniteId"
            ref="infiniteLoading"
            spinner="waveDots"
          >
            <div slot="no-more" style="padding: 10px 0px">
              목록의 끝입니다 :)
            </div>
            <div slot="no-results" style="padding: 10px 0px">
              목록의 끝입니다 :)
            </div>
            <div slot="error">
              Error message, click
              <router-link to="/board_more">here</router-link> to retry
            </div>
          </infinite-loading>
        </ul>
      </form>
    </div>
    <SubMenu :isOpen="isOpen" @CloseHam="CloseHam"></SubMenu>
    <Search></Search>
    <WBtn :path="path"></WBtn>
    <div class="ac_btns">
            <span class="more_plus"></span>
            <ul>
                <li><router-link to="/board_more/write">게시판 작성</router-link></li>
            </ul>
        </div>
  </div>
</template>

<script>
import SubMenu from "./menu.vue";
import Search from "./search.vue";
import WBtn from "./BtnW.vue";
import InfiniteLoading from "vue-infinite-loading";
import { Board } from "../../api/index.js";
import { mapState, mapGetters } from "vuex";
export default {
  created() {
    this.infiniteId += 1;
  },
  beforeRouteLeave(to, from, next) {
    this.infiniteId += 1;
    next();
  },
  components: {
    InfiniteLoading,
    SubMenu,
    Search,
    WBtn,
  },
  data() {
    return {
      isOpen: false,
      infiniteId: 0,
    };
  },
  computed: {
    ...mapState("mainjs", ["main"]),
    ...mapGetters("boardjs", ["GetBoard"]),
    ...mapGetters("configjs", ["GetConfig"]),
    path() {
      // if (this.$route.path.indexOf("custom") === -1) {
      return this.$route.path.substring(this.$route.path.indexOf("/", 1) + 1);
      // } else {
      //   return "custom";
      // }
    },
  },
  methods: {
    Read(value) {
      if (value.unid) {
        this.$store.dispatch("boardjs/BoardDetail", {
          menu: undefined,
          unid: value.unid,
        });
      }
    },
    // utc 시간 to local 시간
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD HH:mm");
      return localTime;
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    boo(value) {
      var moment = require("moment");
      var localTime = moment.utc(value.created).toDate();
      localTime = parseInt(moment(localTime).format("YYYYMMDD"));
      var nowTime = parseInt(moment().format("YYYYMMDD"));
      if (nowTime - localTime < this.main.my.recentdate) {
        return true;
      }
      return false;
    },
    // 스크롤 페이징
    infiniteHandler($state) {
      this.GetBoard[this.path].page = String(
        parseInt(this.GetBoard[this.path].page) + 1
      );
      // this.GetMail['inbox_detail'].size+= 1;
      var option = {};

      option = this.GetBoard[this.path];
      option.size = this.GetConfig.listcount;
      option.boardtype = this.path;
      this.GetData(option, $state);
    },
    GetData(option, $state) {
      Board(option)
        .then((response) => {
          return response.data.data;
        })
        .then((data) => {
          setTimeout(() => {
            if (data) {
              if (Object.keys(this.GetBoard[this.path].data.data).length > 0) {
                this.GetBoard[this.path].data.data =
                  this.GetBoard[this.path].data.data.concat(data);
              } else {
                this.GetBoard[this.path].data.data = data;
              }
              $state.loaded();

              // 끝 지정(No more data) - 데이터가 EACH_LEN개 미만이면

              if (data.length / this.GetConfig.listcount < 1) {
                $state.complete();
              }
            } else {
              // 끝 지정(No more data)

              $state.complete();
            }
          }, 1000);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    OpenHam() {
      this.isOpen = true;
    },
    CloseHam() {
      this.isOpen = false;
    },
    // 사진이 없으면 기본 이미지
    photoError(index) {
      this.GetApproval[this.path].data.data[index].photoerror = false;
    },
  },
};
</script>

<style>
</style>