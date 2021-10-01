<template>
  <div>
    <div class="m_contents02">
      <form action="">
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
                  :value="{ unid: item.unid, key: index }"
                  v-model="mail.checkBtn.checkedNames"
                />
                <dl @click="MailDetail(item.unid)">
                  <dt>
                    {{ item.sender }}
                    <div>
                      <em
                        class="rece"
                        v-if="item.tostuff !== undefined"
                        :class="{ on: item.tostuff.receive }"
                        >수신</em
                      ><em
                        class="refer"
                        v-if="item.tostuff !== undefined"
                        :class="{ on: item.tostuff.ref }"
                        >참조</em
                      >
                    </div>
                  </dt>
                  <dd>
                    <b :class="[{ impor_icon: item.importance }]"></b
                    >{{ item.subject }}
                  </dd>
                </dl>
                <div class="impor">
                  <p>
                    {{ transTime(item.created)
                    }}<em
                      v-if="item.followup !== undefined"
                      class="star"
                      @click="followUp(item.unid)"
                      :class="{ active: item.followup }"
                      alt=""
                    >
                    </em>
                  </p>
                  <span :class="[{ clip: haveClip(item.attach) }]"></span>
                </div>
                <em class="trash_can"></em
                ><!-- html만 넣음 -->
              </li>
            </template>
            <template v-slot:right="{ item, index }">
              <i class="trash_can" @click="mailDelete(item, index)"></i>
            </template>
          </swipe-list>
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
              <router-link :to="{name:'mail'}">here</router-link> to retry
            </div>
          </infinite-loading>
        </ul>
      </form>
    </div>
    <div class="impor_mail">
      <!--7월 29일 추가됨 -->
      <div class="impor_con">
        <strong>수행 설정</strong>
        <p>
          <span
            ><em
              class="edit_check"
              ref="edit_check"
              @click="followUse"
              :class="{ active: this.use }"
            ></em
            >수행필요로 설정</span
          >
        </p>
        <ul>
          <li>
            <em>일자</em>
            <div>
              <input type="date" v-model="date" />
            </div>
          </li>
          <li>
            <em>시간</em>
            <div>
              <select name="" id="" v-model="STime">
                <option
                  :value="value"
                  v-for="(value, index) in this.TimeOption.mail.hour"
                  :key="index"
                >
                  {{ value }}
                </option>
              </select>
              :
              <select name="" id="" v-model="SMin">
                <option
                  :value="value"
                  v-for="(value, index) in this.TimeOption.mail.min"
                  :key="index"
                >
                  {{ value }}
                </option>
              </select>
            </div>
          </li>
          <li>
            <em>수행할 내용</em>
            <editor-content :editor="editor" />
          </li>
        </ul>
        <div>
          <span class="impor_mo_btn" @click="followSet">확인</span>
          <span class="modal_cancel" @click="followCancle">취소</span>
        </div>
      </div>
    </div>
    <div class="ac_btns">
            <span class="more_plus"></span>
            <ul>
                <li><a>맨 위로</a></li>
                <li><router-link :to="{name:'WriteMail'}">메일 작성</router-link></li>
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
import InfiniteLoading from "vue-infinite-loading";
import { mapState, mapGetters } from "vuex";
import { MailSearch, Mail } from "../../api/index.js";
import "vue-swipe-actions/dist/vue-swipe-actions.css";
import { SwipeList, SwipeOut } from "vue-swipe-actions";
import ListHeader from "./listheader.vue";
import MoveFile from "./movefile.vue";
import Folder from "./folder.vue";
import { Editor, EditorContent } from "tiptap";
export default {
  components: {
    InfiniteLoading,
    SwipeOut,
    SwipeList,
    ListHeader,
    MoveFile,
    Folder,
    EditorContent,
    BtnPlus,
  },
  data() {
    return {
      morePlus: [{ top: "맨 위로" }, { write: "메일 작성" }],
      // path:this.path,
      editor: null,
      active: false,
      tooltipActiveIndex: -1,
      tooltipText: [""],
      checkEvent: "touch",
      infiniteId: 0,
      enabled: true,
      STime: "05",
      SMin: "50",
      use: false,
      date: "",
      body: "",
      unid: "",
    };
  },
  computed: {
    ...mapState("mailjs", ["mail", "TimeOption", "mailSearchPath"]),
    ...mapState("configjs", ["config", "systemcolor"]),
    ...mapGetters("mailjs", ["GetMail", "GetMailConfig"]),
    ...mapGetters("configjs", ["GetConfig"]),
    path() {
      if (this.$route.path.indexOf("custom") === -1) {
        return this.$route.path.split('/').reverse()[0];
      } else {
        return "custom";
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    // this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
    this.$store.commit("mailjs/MailSearchOptionInit");
    this.$store.commit("mailjs/Back");
    this.infiniteId += 1;
    next();
  },
  created() {
    this.$store.commit("mailjs/Back");
    var moment = require("moment");
      var localTime = moment.utc().toDate();
      this.date = moment(localTime).format("YY-MM-DD");
     

    this.infiniteId += 1;
    this.editor = new Editor({
      content: "",
    });
    if (this.path === "custom") {
      this.$store.dispatch("mailjs/GetMailDetail", {
        mailtype: "custom",
        folderId: this.$route.params.folderId,
      });
    }
  },
  mounted() {
    if ("ontouchstart" in document.documentElement !== true) {
      this.checkEvent = "mouse";
    }
  },
  beforeDestroy() {
    if (this.editor !== null) {
      this.editor.destroy();
    }
  },
  methods: {
    MailDetail(unid) {
      if (!this.mail.checkBtn.editclicked) {
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
    },
    GetData(option, $state) {
      Mail(option)
        .then((response) => {
          return response.data.data;
        })
        .then((data) => {
          setTimeout(() => {
            if (data) {
              if (Object.keys(this.mail.data[this.path].data).length > 0) {
                this.mail.data[this.path].data.data =
                  this.mail.data[this.path].data.data.concat(data);
              } else {
                this.mail.data[this.path].data.data = data;
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
    SearchData(option, $state) {
      MailSearch(option)
        .then((response) => {
          return response.data.data;
        })
        .then((data) => {
          setTimeout(() => {
            if (data) {
              if (Object.keys(this.mail.data[this.path].data).length > 0) {
                this.mail.data[this.path].data.data =
                  this.mail.data[this.path].data.data.concat(data);
              } else {
                this.mail.data[this.path].data.data = data;
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
    async followUp(unid) {
      this.editor.destroy();
      this.unid = unid;
      var result = await this.$store.dispatch("mailjs/FollowUpInfo", unid);
      if (result) {
        if (this.GetMail.followUpInfo.use) {
          var followUpInfo = this.GetMail.followUpInfo;
          this.STime = followUpInfo.time.split(":")[0];
          this.SMin = followUpInfo.time.split(":")[1];
          this.use = followUpInfo.use;
          this.date = followUpInfo.date;
          this.body = followUpInfo.body;

          this.editor = new Editor({
            content: this.body,
          });
        } else {
          this.STime = "05";
          this.SMin = "50";
          this.use = false;
          this.body = "";
          this.editor = new Editor({
            content: this.body,
          });
        }
      }
    },
    followCancle() {
      if (this.editor) {
        this.editor.destroy();
      }
    },
    async followSet() {
      if (this.editor) {
        console.log("여기")
        var data = {};
        if (this.date) {
          data.use = this.use;
          data.date = this.date;
          data.unid = this.unid;
          data.time = `${this.STime}:${this.SMin}:00`;
          data.body = this.editor.getHTML();

          await this.$store.dispatch("mailjs/FollowupSet", data);
          this.$router.push(this.$router.currentRoute);
        }
        this.editor.destroy();
      }
    },
    followUse() {
      var classList = this.$refs.edit_check.classList.contains("active");
      this.use = !classList;
    },
  },
};
</script>

<style>
.trash_can {
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
</style>