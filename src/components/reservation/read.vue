<template>
  <div class="modal_wrap">
    <Header :btnArr="btnarr" @BtnClick="BtnClick"></Header>
    <div class="m_contents10 srl" style="height:calc(100vh - 6.25rem);">
      <form action="">
        <ul class="cf_w_top">
          <li class="cfw_name">
            <strong>{{ lang.roomname }}</strong>
            <div>
              <p>{{ this.detail.roomName }}</p>
            </div>
          </li>
          <li class="cfw_title">
            <strong>{{ lang.title }}</strong>
            <div>
              <p>{{ this.detail.subject }}</p>
            </div>
          </li>
          <li class="cf_w_date">
            <strong>{{ lang.period }}</strong>
            <div>
              <p>{{ this.SetTime(this.detail.startDate) }}</p>
            </div>
          </li>
          <li class="cf_w_time cf_w_time2">
            <strong>{{ lang.time }}</strong>
            <div>
              <p>
                <span>{{ this.detail.startTime }}</span
                >~<span>{{ this.detail.endTime }}</span>
              </p>
            </div>
          </li>
          <li class="cf_w_att3">
            <strong
              ><b>{{ lang.author }}</b></strong
            >
            <div>
              <p>{{ this.detail.author }}</p>
              <!-- <em class="re_more"></em> -->
            </div>
          </li>
          <li class="cf_w_att2 active">
            <strong>{{ lang.send }}</strong>
            <div>
              <p v-if="this.detail.peoples[0]">
                <span
                  v-for="(value, index) in this.detail.peoples"
                  :key="index"
                  >{{ value.shortname }}</span
                >
              </p>
            </div>
          </li>
          <li class="cf_w_att3" v-if="this.detail.attachInfo.length > 0">
            <strong>{{ lang.attach }}</strong>
            <Viewer
              className=""
              :attaInfo="this.detail.attachInfo"
              :attach="true"
              :unid="this.detail.unid"
            ></Viewer>
          </li>
          <li class="rdm_edit" style="height:calc(100vh - 25.375rem);">
            <Body
              class="cf_w_memo2"
              style="height: 100%;width:100%"
              id="memo_t"
              :body="this.detail.body"
              ref="Body"
              :read="true"
              did="calendar"
            />
          </li>
        </ul>
      </form>
    </div>
    <!-- <Org :modalon="modalon" @ModalOff="ModalOff"></Org> -->
    <Comment
      :isOpen="commentm"
      @ModalOff="CommentOff"
      @CommentM="CommentM"
    ></Comment>
  </div>
</template>

<script>
import Header from "./header.vue";
import Org from "../../View/Org.vue";
import { mapState, mapGetters } from "vuex";
import Comment from "./Comment.vue";

import configjson from "../../config/config.json";

export default {
  created() {
    this.lang = this.GetBookL.read;
    this.btnarr = this.lang.btnarr;
  },
  computed: {
    ...mapState("bookjs", ["detail"]),
    sat() {
      return configjson.sat;
    },
  },
  components: {
    Header,
    Org,
    Comment,
  },
  methods: {
    CommentM(comment) {
      var data = {};
      data.unid = this.detail.unid;
      data.body = comment;
      this.$store.dispatch("bookjs/deleteBook", data).then((res) => {
        if (res) {
          this.$router.push({ name: "reservationlist" });
        }
      });
    },
    CommentOff() {
      this.commentm = false;
    },
    SetTime(value) {
      var moment = require("moment");

      return moment.utc(value).local().format("YYYY-MM-DD");
    },
    ModalOff() {
      this.modalon = false;
    },
    BtnClick(value) {
      if (value == "editItem") {
        this.$store.commit("bookjs/isEdit", true);
        this.$router.push({
          name: "reservationWrite",
        });
      } else if (value == "cancle") {
        this.commentm = true;
      }
    },
  },
  data() {
    return {
      modalon: false,
      commentm: false,
    };
  },
};
</script>

<style>
</style>