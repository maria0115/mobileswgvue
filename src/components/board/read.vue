<template>
  <div>
    <div class="wnoti_header">
      <h2>
        <a @click="Back()"
          ><img src="../../mobile/img/wmail_back.png" alt="" /></a
        >{{ params.title }}
      </h2>
      <div v-if="GetStoreBoard.detail.isWriter || GetStoreBoard.detail.isAdmin">
        <span class="edit fw_bold" @click="Edit">{{ lang.modify }}</span>
        <span class="del fw_bold" @click="DeleteBoard">{{ lang.remove }}</span>
      </div>
    </div>
    <div class="m_contents04">
      <div class="nt_top">
        <h3 class="noti_tit">{{ GetStoreBoard.detail.subject }}</h3>
        <div class="clfix">
          <span class="per_img">
            <em class="no_img" :style="randomColor()"
              ><b>{{ GetStoreBoard.detail.author.split("")[0] }}</b></em
            >
          </span>
          <dl>
            <dt>
              {{ GetStoreBoard.detail.author }}
            </dt>
            <dd>
              {{ transTime(GetStoreBoard.detail.created) }}
              <span
                >{{ lang.open }} :
                <em>{{ GetStoreBoard.detail.read_cnt }}</em></span
              >
            </dd>
          </dl>
          <em class="re_more" v-if="params.type !== 'congratulate'"></em>
        </div>
      </div>
      <div class="posting" v-if="params.type !== 'congratulate'">
        <p>
          <span>{{ lang.term }}</span
          ><em v-if="GetStoreBoard.detail.isEternity">{{ lang.everlasting }}</em
          ><em v-else
            >{{ btransTime(GetStoreBoard.detail.startDate) }} ~
            {{ btransTime(GetStoreBoard.detail.endDate) }}</em
          >
        </p>
      </div>
      <div
        class="add_file nt_file clfix"
        v-if="GetStoreBoard.detail.attach.length > 0"
      >
        <strong>{{ lang.attach }}</strong>
        <ul v-if="!sat">
          <li
            class="active"
            v-for="(value, index) in GetStoreBoard.detail.attach"
            :key="index"
          >
            <span
              ><img
                :src="`../../mobile/img/icon_${fileImg(value.name)}.png`"
                alt=""
            /></span>
            <div>
              <a @click="openDownload(value.url)">
                <!-- <a :href="value.url"> -->
                <p>{{ value.name }}</p>
                <em>({{ value.size }})</em>
              </a>
            </div>
          </li>
        </ul>

        <Viewer
          v-else
          className=""
          :attaInfo="GetStoreBoard.detail.attach"
          :attach="true"
        ></Viewer>
      </div>
      <!-- <div class="noti_con" v-html="GetStoreBoard.detail.body"></div> -->
      <div class="rdm_edit">
        <Body
          id="noti_con"
          :body="GetStoreBoard.detail.body"
          ref="Body"
          :read="true"
          did="board"
        />
      </div>
      <!-- <div class="noti_con" v-html="GetStoreBoard.detail.body"></div> -->
      <!-- <editor-content class="noti_con" :editor="editor" /> -->
      <div
        v-if="GetStoreBoard.detail.useLike"
        class="like_btn"
        @click="Likeit()"
      >
        <span :class="{ active: !GetStoreBoard.detail.isLike }"
          ><em>{{ GetStoreBoard.detail.like_cnt }}</em> LIKE <b></b
        ></span>
      </div>
      <div
        v-if="
          GetStoreBoard.detail.isAllowReply && GetStoreBoard.detail.useReply
        "
        class="comment"
      >
        <span
          >{{ lang.reply }}
          <em>{{ this.GetStoreBoard.detail.reply.length }}</em></span
        >
        <div class="com_input">
          <div class="f_com">
            <textarea
              v-model="PBody"
              :placeholder="lang.placeholder"
            ></textarea>
            <span class="en_btn" @click="CommentSend()">{{ lang.write }}</span>
          </div>
        </div>
        <div
          :ref="value.my_unid"
          :class="[
            { c_com: value.parent_unid === '' },
            { cc_com: value.parent_unid !== '' },
          ]"
          v-for="(value, index) in GetStoreBoard.detail.reply"
          :key="index"
        >
          <span class="per_img">
            <em class="no_img" :style="randomColor()"
              ><b>{{ value.author.split("")[0] }}</b></em
            >
          </span>
          <dl>
            <dt>
              {{ value.author }} {{ value.authorGrade }} /
              {{ value.authorDept }}
            </dt>
            <dd>{{ transTime(value.created) }}</dd>
          </dl>
          <div class="com_icons">
            <span class="com_ic" @click="ComClick(value)"></span>
            <span
              class="edit_ic"
              @click="EditClick(value)"
              v-if="isMe(value)"
            ></span>
            <span
              class="del_ic"
              v-if="isMe(value) || GetStoreBoard.detail.isAdmin"
              @click="DeleteComment(value)"
            ></span>
          </div>
          <p :ref="`mytext_${value.my_unid}`" v-if="!isEClick(value)">
            {{ ParentTag(value.parent_unid) }} {{ value.body }}
          </p>
          <!-- <editor-content :editor="editor" /> -->
          <div
            class="ccc_com"
            :class="{ active: isEClick(value) || isCClick(value) }"
          >
            <div class="s_com">
              <textarea
                v-model="CBody"
                :placeholder="lang.placeholder"
              ></textarea>
              <span class="en_btn" @click="CommentSend(value)">{{
                lang.write
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import configjson from "../../config/config.json";
import Namo from "../editor/namo.vue";
import Viewer from "../editor/viewer.vue";
export default {
  components: {
    Namo,
    Viewer,
  },
  created() {
    this.lang = this.GetBoardL.read;
    // this.params = this.GetHeader.menu;
    this.params = JSON.parse(this.$route.query.data);
  },
  data() {
    return {
      CBody: "",
      PBody: "",
      Cclicked: "",
      Eclicked: "",
      myUnid: "",
    };
  },
  computed: {
    ...mapGetters("boardjs", ["GetStoreBoard"]),
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapGetters(["GetHeader"]),
    sat() {
      return configjson.sat;
    },
  },
  methods: {
    getExtensionOfFilename(filename) {
      var _fileLen = filename.length;
      var _lastDot = filename.lastIndexOf(".");
      var _fileExt = filename.substring(_lastDot + 1, _fileLen).toLowerCase();

      return _fileExt;
    },
    fileImg(name) {
      var dot = this.getExtensionOfFilename(name);

      if (configjson.extension.indexOf(dot) !== -1) {
        return dot;
      }
      return "etc";
    },
    DeleteBoard() {
      var data = {};
      data.boardType = this.GetStoreBoard.path;
      data.unid = this.GetStoreBoard.detail.unid;
      this.$store.dispatch("boardjs/DeleteBoard", data).then((result) => {
        if (result) {
          this.GoList();
        }
      });
    },
    Likeit() {
      var data = {};
      var detail = this.GetStoreBoard.detail;
      data.root_unid = detail.root_unid;
      data.boardType = this.GetStoreBoard.path;
      this.$store.dispatch("boardjs/Likeit", data).then((res) => {
        if (res) {
          this.GetStoreBoard.detail.like_cnt = parseInt(res.like_cnt);
          if (
            res.result == 200 ||
            res.result == "200" ||
            res.result == "success"
          ) {
            this.GetStoreBoard.detail.isLike = false;
          }
        }
      });
    },
    Read() {
      this.$store.dispatch(
        "boardjs/BoardDetail",
        {
          menu: undefined,
          unid: undefined,
          comment: true,
          type: this.params.type,
          lnbid: this.params.lnbid,
          title: this.params.title,
        },
        -1
      );
    },
    ParentTag(parentUnid) {
      // console.log(parentUnid,this.GetStoreBoard.parents,this.GetStoreBoard.detail.reply)
      var result = this.GetStoreBoard.detail.reply.filter((p) => {
        return p.my_unid === parentUnid;
      });
      if (result.length > 0) {
        return `@${result[0].author}`;
      }
      return "";
    },
    EditClick(value) {
      if (this.Eclicked === value.my_unid) {
        this.Eclicked = "";
        this.CBody = "";
      } else {
        this.CBody = value.body;

        this.Eclicked = value.my_unid;
      }
      this.Cclicked = "";
    },
    ComClick(value) {
      if (this.Cclicked === value.my_unid) {
        this.Cclicked = "";
      } else {
        this.Cclicked = value.my_unid;
      }
      this.Eclicked = "";
      this.CBody = "";
    },
    isEClick(value) {
      if (value.my_unid == this.Eclicked) {
        return true;
      }
      return false;
    },
    isCClick(value) {
      if (value.my_unid == this.Cclicked) {
        return true;
      }
      return false;
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    isMe(value) {
      var my = this.GetMyInfo.info;
      if (my.name == value.author && my.sabun === value.sabun) {
        return true;
      }
      return false;
    },
    getReadableByte(count, decimal = 2, level = 0) {
      let unitList = ["Bytes", "KB", "MB", "GB", "TB", "PT"];

      if (count >= 1024.0 && level + 1 < unitList.length) {
        return this.getReadableByte(count / 1024, decimal, ++level);
      }
      return `${decimal ? count.toFixed(decimal) : Math.round(count)}${
        unitList[level]
      }`;
    },
    Back() {
      this.GoList();
    },
    // utc 시간 to local 시간
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD HH:mm");
      return localTime;
    },
    attachClick(url) {
      window.open(url);
    },
    GoList() {
      // this.SetHeader(this.params);
      this.$store.commit("SetBack", true);

      this.$router.push({
        name: "boardlist",
        query: { data: JSON.stringify(this.params) },
      });
    },
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
    btransTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YY.MM.DD");
      return localTime;
    },
    // utc 시간 to local 시간
    transTime(time) {
      var moment = require("moment");
      var localTime = moment.utc(time).toDate();
      localTime = moment(localTime).format("YYYY.MM.DD HH:mm");
      return localTime;
    },
    Edit() {
      this.$store.commit("boardjs/EditMode", true);
      // this.SetHeader(this.params);

      this.$router.replace({
        name: "boardwrite",
        query: { data: JSON.stringify(this.params) },
      });
    },
    CommentSend(value) {
      var data = {};
      data.boardType = this.GetStoreBoard.path;

      if (value) {
        // 대댓글
        data.root_unid = value.root_unid;
        data.body = this.CBody;
        data.unid = value.unid;
        if (this.Eclicked !== "") {
          data.level = value.level;
          data.parentName = "";
          data.parent_unid = "";
        } else {
          data.level = value.level + 1;
          data.parentName = value.fullname;
          data.parent_unid = value.my_unid;
        }
      } else {
        // 댓글
        data.root_unid = this.GetStoreBoard.detail.root_unid;
        data.parent_unid = "";
        data.level = 0;
        data.body = this.PBody;
        data.parentName = "";
        data.unid = this.GetStoreBoard.unid;
      }
      data.my_unid = this.Eclicked;

      this.$store.dispatch("boardjs/WriteReply", data).then((res) => {
        if (res.msgcode == "success") {
          var redata = {};
          redata.type = this.params.type;
          redata.rootunid = this.GetStoreBoard.detail.root_unid;
          this.$store.dispatch("boardjs/ReplyInfo", redata).then((response) => {
            this.GetStoreBoard.detail.reply = response;
          });
        }
      });
      this.Eclicked = "";
      this.Cclicked = "";
      this.CBody = "";
      this.PBody = "";
    },
    DeleteComment(value) {
      var data = {};
      data.boardType = this.GetStoreBoard.path;
      data.root_unid = value.root_unid;
      data.my_unid = value.my_unid;
      data.lnbid = this.params.lnbid;
      this.$store.dispatch("boardjs/DeleteReply", data).then((res) => {
        if (res) {
          this.Read();
        }
      });
    },
  },
};
</script>

<style>
.ProseMirror {
  border: 0;
}
</style>