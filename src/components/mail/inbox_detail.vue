<template>
  <div>
    <div class="m_contents02">
      <!-- <template slot="top-block" slot-scope="props">
          <div class="top-load-wrapper" :key="props.stateText">
            <div
              class="loading-container"
              :style="settranslateY"
              v-if="isLoading"
            >
              <div class="loading"></div>
            </div>
          </div>
        </template> -->
      <form class="formdiv" @submit.prevent>
        <ul>
          <swipe-list
            v-if="this.mail.data[this.path].data.data"
            ref="list"
            class="card"
            :disabled="!enabled"
            :items="this.mail.data[this.path].data.data"
            item-key="id"
          >
            <template v-slot="{ item, index }">
              <li :key="index" :class="{ new: item.unread }">
                <!-- <em class="tooltip" :class="{ active: tooltipActive(index) }"
              ><strong v-for="(v, name) in tooltipText" :key="name"
                ><div>{{ `${v}` }}</div></strong
              ></em
            > -->
                <span
                 @click="MailDetail(item.unid, item.folderName)"
                  class="basic_img"
                  v-if="item.sender"
                  :class="[{ on: mail.checkBtn.photoon }]"
                >
                  <em class="no_img" :style="randomColor()"
                    ><b>{{ item.sender.split("")[0] }}</b></em
                  >
                </span>
                <!-- <span v-if="item.sender" class="basic_img" :class="[{ on: mail.checkBtn.photoon }]">
              <img
                :src="url(item.photo)"
                @error="photoError(index)"
                v-if="item.photoerror"
                alt=""
              />
              <em class="no_img" :style="randomColor()"
                ><b>{{ item.sender.split("")[0] }}</b></em
              >
            </span> -->
                <input
                  type="checkbox"
                  @click="boxClick"
                  class="edit_check"
                  :class="[
                    { active: mail.checkBtn.allchecked },
                    { active02: onecheck(index) },
                    { on: mail.checkBtn.editclicked },
                  ]"
                  :value="{
                    unid: item.unid,
                    key: index,
                    type: item.folderName,
                  }"
                  v-model="mail.checkBtn.checkedNames"
                />
                <dl @click="MailDetail(item.unid, item.folderName)">
                  <dt>
                    {{ item.sender }}
                    <div>
                      <em
                        class="rece"
                        v-if="item.tostuff !== undefined"
                        :class="{ on: item.tostuff.receive }"
                        >{{ lang.to }}</em
                      ><em
                        class="refer"
                        v-if="item.tostuff !== undefined"
                        :class="{ on: item.tostuff.ref }"
                        >{{ lang.cc }}</em
                      >
                    </div>
                    <span>{{ transTime(item.created)
                    }}</span>
                  </dt>
                  <dd>
                    <b :class="[{ impor_icon: item.importance }]"></b
                    >{{ item.subject }}
                  </dd>
                </dl>
                <div class="impor">
                  <p>
                    <em
                      v-if="
                        item.followup !== undefined && path !== 'mail_trash'
                      "
                      class="star"
                      @click="followUp(item.unid)"
                      :class="{ active: item.followup }"
                      alt=""
                    >
                    </em>
                  </p>
                  <span :class="[{ clip: haveClip(item.attach) }]"></span>
                </div>
                <em class="trash"></em
                ><!-- html만 넣음 -->
              </li>
            </template>
            <template v-slot:right="{ item, index }">
              <i class="trash" @click="mailDelete(item, index)"></i>
            </template>
          </swipe-list>
          <Infinite
            @infiniteHandler="infiniteHandler"
            :infiniteId="infiniteId"
          ></Infinite>
        </ul>
      </form>
    </div>
    <!-- 여기 -->
    <FollowUp :unid="clickedUnid"></FollowUp>
    <div class="ac_btns">
      <span class="more_plus"></span>
      <ul>
        <li>
          <a class="top">{{ commonl.up }}</a>
        </li>
        <li>
          <router-link :to="{ name: 'WriteMail' }">{{
            lang.morePlus.write
          }}</router-link>
        </li>
      </ul>
    </div>
    <!-- <BtnPlus :menu="morePlus"></BtnPlus> -->
    <ListHeader></ListHeader>
    <MoveFile></MoveFile>
    <Folder></Folder>
  </div>
</template>

<script>
import BtnPlus from "../../View/BtmBtn.vue";
import config from "../../config/config.json";
import { mapState, mapGetters } from "vuex";
import { MailSearch, Mail } from "../../api/index.js";
import "vue-swipe-actions/dist/vue-swipe-actions.css";
import { SwipeList, SwipeOut } from "vue-swipe-actions";
import ListHeader from "./listheader.vue";
import MoveFile from "./movefile.vue";
import Folder from "./folder.vue";
import FollowUp from "./folloup.vue";
import Infinite from "@/components/common/infinite.vue";

export default {
  // mixins: [pmixin],

  components: {
    SwipeOut,
    SwipeList,
    ListHeader,
    MoveFile,
    Folder,
    BtnPlus,
    FollowUp,
    Infinite,
  },
  data() {
    return {
      // path:this.path,
      enabled: true,
      active: false,
      tooltipActiveIndex: -1,
      tooltipText: [""],
      checkEvent: "touch",
      infiniteId: 0,

      body: "",
      unid: "",
      clickedUnid: "",
      lists: [],
    };
  },
  computed: {
    ...mapState("mailjs", ["mail", "TimeOption", "mailSearchPath"]),
    ...mapState("configjs", ["config", "systemcolor"]),
    ...mapGetters("mailjs", ["GetMail", "GetMailConfig"]),
    ...mapGetters("configjs", ["GetConfig"]),
    ...mapState(["back"]),
    ...mapGetters(["GetMailLanguage"]),

    path() {
      if (this.$route.path.indexOf("custom") === -1) {
        return this.$route.path.split("/").reverse()[0];
      } else {
        return "custom";
      }
    },
  },
  beforeDestroy() {
    PullToRefresh.destroyAll();
  },
  beforeRouteLeave(to, from, next) {
    // this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
    this.$store.commit(
      "SetTop",
      document.scrollingElement.scrollTop ||
        window.scrollY ||
        window.pageYOffset
    );

    this.$store.commit("mailjs/MailSearchOptionInit");
    this.$store.commit("mailjs/Back");
    next();
  },
  async created() {
    // this.mail.data[this.path].data.data
    this.lang = this.GetMailLanguage.list;
    this.commonl = this.GetCommonL;

    this.page = 0;
    // this.infiniteId += 1;
    if (this.path === "custom") {
      this.$store.dispatch("mailjs/GetMailDetail", {
        mailtype: "custom",
        folderId: this.$route.params.folderId,
      });
    }
    if (this.back.isBacked) {
      var option = {};
      this.GetMail[this.path].page = this.back.page;
      option.page = this.page;
      option.mailtype = this.path;

      option.searchType = this.path;
      option.searchfield = this.GetMailConfig.searchOption.searchfield;

      option.searchword = this.GetMailConfig.searchOption.searchword;
      option.size = this.GetConfig.listcount;
      for (var i = 0; i < this.back.page; i++) {
        this.page++;
        option.page = this.page;
        if (this.mailSearchPath.includes(this.path)) {
          await this.initMailSearch(option);
        } else {
          await this.initMail(option);
        }
      }
      this.infiniteId++;
      this.$forceUpdate();
      // window.scroll({ top: this.back.top, behavior: "smooth" });
      var scrollentity = $("html,body");
      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        scrollentity = $("html");
      }
      scrollentity.animate({ scrollTop: this.back.top }, 500);
    }
    this.$store.commit("SetBack", false);
  },
  mounted() {
    if ("ontouchstart" in document.documentElement !== true) {
      this.checkEvent = "mouse";
    }
    this.setPullTo();
  },
  methods: {
    async initMailSearch(option) {
      var result = await MailSearch(option);
      result = result.data.data;
      if (result) {
        this.mail.data[this.path].data.data =
          this.mail.data[this.path].data.data.concat(result);
      }
      return;
    },
    async initMail(option) {
      var result = await Mail(option);
      result = result.data.data;
      if (result) {
        this.mail.data[this.path].data.data =
          this.mail.data[this.path].data.data.concat(result);
      }
      return;
    },
    async Refresh() {
      this.$store.commit("mailjs/MailSearchOptionInit");
      this.mail.data[this.path].data.data = [];
      this.GetMail[this.path].page = 0;
      var option = {};
      if (this.mailSearchPath.includes(this.path)) {
        option = this.GetMail[this.path];
        option.mailtype = this.path;

        option.searchType = this.path;
        option.searchfield = this.GetMailConfig.searchOption.searchfield;

        option.searchword = this.GetMailConfig.searchOption.searchword;
        option.size = this.GetConfig.listcount;
        await this.initMailSearch(option);
      } else {
        option = this.GetMail[this.path];
        option.size = this.GetConfig.listcount;
        await this.initMail(option);
      }
      this.infiniteInit();
    },
    followUp(unid) {
      this.clickedUnid = unid;
    },
    MailDetail(unid, folderName) {
      if (!this.mail.checkBtn.editclicked) {
        this.$store.commit("mailjs/MailDetailFolder", folderName);
        this.$router.push({ name: "ReadMail", params: { unid } });
      }
    },
    mailDelete(item, index) {
      var data = {};
      data.unid = item.unid;
      data.key = index;
      this.mail.checkBtn.checkedNames.push(data);

      if (this.path !== "mail_trash") {
        this.$store.dispatch("mailjs/MailDelete", {
          datas: this.mail.checkBtn.checkedNames,
          type: this.path,
        });
      } else {
        this.$store.dispatch("mailjs/MailRealDelete", {
          datas: this.mail.checkBtn.checkedNames,
          type: this.path,
        });
      }
      this.$store.commit("mailjs/mailDelete", { type: this.path });
    },
    remove(item) {
      this.mail.data[this.path].data.data = this.mail.data[
        this.path
      ].data.data.filter((i) => i !== item);
    },
    // 스크롤 페이징
    infiniteHandler($state) {
      if (!this.back.isBacked) {
        this.GetMail[this.path].page = String(
          parseInt(this.GetMail[this.path].page) + 1
        );
        // this.GetMail['inbox_detail'].size+= 1;
        var option = {};

        if (this.mailSearchPath.includes(this.path)) {
          option = this.GetMail[this.path];
          option.mailtype = this.path;

          option.searchType = this.path;
          option.searchfield = this.GetMailConfig.searchOption.searchfield;

          option.searchword = this.GetMailConfig.searchOption.searchword;
          option.size = this.GetConfig.listcount;

          this.SearchData(option, $state);
          //
        } else {
          option = this.GetMail[this.path];
          option.size = this.GetConfig.listcount;

          this.GetData(option, $state);
        }
        // this.SearchData(this.GetMail[this.path],$state);
      } else {
        $state.complete();
      }
    },
    GetData(option, $state) {
      Mail(option)
        .then((response) => {
          return response.data.data;
        })
        .then((data) => {
          this.timeout = setTimeout(() => {
            if (data) {
              if (data.length > 0) {
                this.$store.commit("SetBackPage", option.page);
              }
              // if (Object.keys(this.mail.data[this.path].data).length > 0) {
              this.mail.data[this.path].data.data =
                this.mail.data[this.path].data.data.concat(data);
              // }
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
    SearchData(option, $state) {
      MailSearch(option)
        .then((response) => {
          return response.data.data;
        })
        .then((data) => {
          this.timeout = setTimeout(() => {
            if (data) {
              if (data.length > 0) {
                this.$store.commit("SetBackPage", option.page);
              }
              // if (
              //   this.mail.data[this.path].data &&
              //   Object.keys(this.mail.data[this.path].data).length > 0
              // ) {
              this.mail.data[this.path].data.data =
                this.mail.data[this.path].data.data.concat(data);
              // }
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
    // 첨부파일이 있는지
    haveClip(value) {
      // if (value.attachinfo.length > 0 && value.attachinfo[0] !== "") {
      //   return true;
      // }
      // return false;
      if (value !== undefined) {
        return value;
      } else {
        return false;
      }
    },
    // 중요메일
    important(boo) {
      if (boo) {
        return "_on";
      }
      return "";
    },
    // 체크박스 누르면 목록 체크할 수 있도록
    boxClick() {
      this.$store.commit("mailjs/disAllCheck");
    },
    // 목록 중 하나 선택
    onecheck(value) {
      //   if(checkedNames.indexOf(value)!==-1){
      //       return true;
      //   }
      for (var i = 0; i < this.mail.checkBtn.checkedNames.length; i++) {
        if (this.mail.checkBtn.checkedNames[i].key == value) {
          return true;
        }
      }
      return false;
    },
    // 툴팁 활성화
    tooltipActive(index) {
      if (this.tooltipActiveIndex === index) {
        return true;
      }
      return false;
    },
    // 사진이 없으면 기본 이미지
    photoError(index) {
      this.mail.data[this.path].data.data[index].photoerror = false;
    },
    // utc 시간 to local 시간
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YY.MM.DD HH:mm");
      return localTime;
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    // 사진 url
    url(sabun) {
      if (sabun !== undefined && sabun.length > 0) {
        return config.main.photo.replace(/@/g, sabun);
      }
    },
    // 누를때 툴팁 활성화
    onOpen(e, value, index) {
      // var attachInfoArr =
      this.tooltipText = value.attachinfo;
      this.tooltipActiveIndex = index;
    },
    // 땔때 툴팁 비활성화
    onClose(e, value, index) {
      this.tooltipActiveIndex = -1;
    },
  },
};
</script>

<style>
.trash {
  /* position:absolute;
  top:0;
  right:0; */
  width: 4.37rem;
  height: 100%;
  background: #ff743c url(../../mobile/img/trash_can.png) center no-repeat;
  background-size: 1.12rem 1.12rem;
}

.swipeout-action {
  display: flex;
  align-items: center;
  padding: 0 3rem;
  cursor: pointer;
  left: 0;
}
.swipeout-list-item + .swipeout-list-item li {
  border: 0;
}
</style>