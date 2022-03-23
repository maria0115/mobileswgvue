<template>
  <div>
    <div class="sub_header noti">
      <div class="basic_header" :class="{ on: !edit }">
        <h2>{{ Title }}</h2>
        <div @click="editCheck">
          <span class="e_edit active"></span>
        </div>
        <span class="sub_ham" @click="OpenHam"></span>
      </div>
      <div class="edit_header" :class="{ on: edit }">
        <!--관리자 모드일때 노출되어야함-->
        <h2>
          <img
            class="mail_back"
            @click="Back"
            src="../../mobile/img/m_edit_icon01.png"
            alt=""
          /><em>{{ checknames.length }}</em
          >개
        </h2>
        <div>
          <span class="all_btn" @click="allBtn()"></span>
          <span class="trash_btn" @click="Delete"></span>
        </div>
      </div>
    </div>
    <div class="m_contents02 ">
      <form @submit.prevent class="formdiv">
        <ul class="board_list">
          <li v-for="(value, index) in lists" :key="index">
            <a>
              <input
                type="checkbox"
                @click="check(value)"
                class="edit_check"
                :class="[{ active: isChecked(value.unid), on: edit }]"
              />

              <dl>
                <dt>{{ value.subject }}</dt>
                <dd>
                  <span>{{ transTime(value.created) }}</span>
                </dd>
              </dl>
              <span :class="{ clip: value.attach }"></span>
            </a>
          </li>
          <Infinite
            @infiniteHandler="infiniteHandler"
            :infiniteId="infiniteId"
          ></Infinite>
        </ul>
      </form>
      <!-- </pull-to> -->
    </div>
    <SubMenu
      :isOpen="isOpen"
      @CloseHam="CloseHam"
      :params="this.params"
    ></SubMenu>
    <div class="ac_btns">
      <span class="more_plus"></span>
      <ul>
        <li class="top">
          <a>{{ commonl.up }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SubMenu from "./menu.vue";
import { ListOfCategory } from "../../api/index.js";
import { mapState, mapGetters } from "vuex";

import Infinite from "@/components/common/infinite.vue";

export default {
  async created() {
    this.commonl = this.GetCommonL;

    this.lang = this.GetBoardL.list;
    this.params = JSON.parse(this.$route.query.data);
    this.Init();
    if (this.back.isBacked) {
      var res = await this.$store.dispatch("ListOfCategory", this.option);
      // this.$store.dispatch("ListOfCategory", this.option).then((res) => {
      this.lists = res.data;
      for (var i = 0; i < this.back.page; i++) {
        this.page++;
        this.option.page = this.page;
        var result = await this.$store.dispatch("ListOfCategory", this.option);
        this.lists = this.lists.concat(result.data);
      }
      this.infiniteId++;
      // window.scroll({ top: this.back.top, behavior: "smooth" });
      this.$forceUpdate();
      var scrollentity = $("html,body");
      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        scrollentity = $("html");
      }
      scrollentity.animate({ scrollTop: this.back.top }, 500);
    } else {
      this.$store.dispatch("ListOfCategory", this.option).then((res) => {
        // this.Init();
        this.lists = res.data;
        this.$forceUpdate();
      });
    }
    this.$store.commit("SetBack", false);
  },
  beforeDestroy() {
    PullToRefresh.destroyAll();
  },
  mounted() {
    this.setPullTo();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(
      "SetTop",
      document.scrollingElement.scrollTop ||
        window.scrollY ||
        window.pageYOffset
    );

    next();
  },
  components: {
    Infinite,
    SubMenu,
  },
  data() {
    return {
      isOpen: false,
      infiniteId: 0,
      lists: [],
      page: 0,
      option: {},
      checknames: [],
      edit: false,
      all: false,
    };
  },
  computed: {
    ...mapState("mainjs", ["main"]),
    ...mapGetters("configjs", ["GetConfig"]),
    ...mapGetters(["GetCategory"]),
    ...mapState(["listOfCategory", "back"]),

    path() {
      return this.params.type;
    },
    Title() {
      return this.params.title;
    },
  },
  methods: {
    check(value) {
      if (this.checknames.includes(value.unid)) {
        this.checknames = this.checknames.filter((item, idx) => {
          return item !== value.unid;
        });
      } else {
        this.checknames.push(value.unid);
      }
    },
    Refresh() {
      this.Init();
      return this.$store.dispatch("ListOfCategory", this.option).then((res) => {
        // this.Init();
        this.lists = res.data;
        this.$forceUpdate();
        return;
      });
    },
    Init() {
      this.page = 0;
      this.option.page = this.page;
      this.option.size = this.GetConfig.listcount;
      this.option.type = "list";
      this.option.category = this.params.type;

      this.infiniteId += 1;
      return;
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
      if (!this.back.isBacked) {
        this.page++;
        // this.GetMail['inbox_detail'].size+= 1;
        this.option.page = this.page;

        this.GetData(this.option, $state);
      }
    },
    GetData(option, $state) {
      ListOfCategory(option)
        .then((response) => {
          return response.data.data;
        })
        .then((data) => {
          this.timeout = setTimeout(() => {
            if (data) {
              if (data.length > 0) {
                this.$store.commit("SetBackPage", option.page);
              }
              if (this.lists.length > 0) {
                this.lists = this.lists.concat(data);
              } else {
                this.lists = data;
              }
              $state.loaded();

              // 끝 지정(No more data) - 데이터가 EACH_LEN개 미만이면

              if (data / option.size < 1) {
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
    Delete() {
      var unids = this.checknames.join(";");
      this.$store
        .dispatch("logjs/LogDelete", { type: "deleteItem", unid: unids })
        .then((res) => {
          if (res) {
            this.lists = this.lists.filter((item, idx) => {
              return !this.checknames.includes(item.unid);
            });
            this.checknames = [];
          }
        });
    },
    isChecked(unid) {
      return this.checknames.includes(unid);
    },
    editCheck() {
      this.edit = true;
    },
    Back() {
      this.edit = false;
      this.checknames = [];
    },
    allBtn() {
      this.all = !this.all;
      if (this.all) {
        this.checknames = [];
        for (var item of this.lists) {
          this.checknames.push(item.unid);
        }
      } else {
        this.checknames = [];
      }
    },
  },
};
</script>

<style>

</style>