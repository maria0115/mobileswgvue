<template>
  <div class="search_con search_con02" @click="Close">
    <form @submit.prevent>
      <div>
        <div class="sc_top">
          <span class="back_btn"></span>
          <div>
            <!--8월 9일 태그 수정됨 -->
            <input
              type="text"
              v-model="keyword"
              @keypress.enter="Search"
              :placeholder="commonl.search"
            />
            <span class="search_btn" @click="Search"></span>
          </div>
          <!---->
          <span class="sc_more"></span>
        </div>
        <div class="sc_btm">
          <p>
            <span>
              <input type="checkbox" ref="all" class="all_sc_check active" />
              <label for="">{{ lang.all }}</label>
            </span>
          </p>
          <p v-if="path().indexOf('success') == -1">
            <span>
              <input type="checkbox" ref="subject" class="sc_check" />
              <label for="">{{ lang.title }}</label>
            </span>
            <span>
              <input type="checkbox" ref="formtitle" class="sc_check" />
              <label for="">{{ lang.subject }}</label>
            </span>

            <em v-if="path() == 'approve' || path() == 'approving'">
              <span>
                <input type="checkbox" ref="authorName" class="sc_check" />
                <label for="">{{ lang.author }}</label>
              </span>
              <span v-if="path() == 'approve'">
                <input type="checkbox" ref="authorOrgName" class="sc_check" />
                <label for="">{{ lang.dept }}</label>
              </span>
              <span v-if="path() == 'approving'">
                <input type="checkbox" ref="sCurFullList" class="sc_check" />
                <label for="">{{ lang.dept }}</label>
              </span>
              <span>
                <input type="checkbox" ref="date" class="sc_check date_line" />
                <label for="">{{ lang.created }}</label>
              </span>
            </em>
          </p>

          <p v-else>
            <span>
              <input type="checkbox" ref="authorName" class="sc_check" />
              <label for="">{{ lang.author }}</label>
            </span>
            <span>
              <input type="checkbox" ref="subject" class="sc_check" />
              <label for="">{{ lang.title }}</label>
            </span>
            <span>
              <input type="checkbox" ref="body" class="sc_check" />
              <label for="">{{ lang.body }}</label>
            </span>
            <span>
              <input type="checkbox" ref="attach" class="sc_check" />
              <label for="">{{ lang.attach }}</label>
            </span>
          </p>
          <div
            class="d_line clfix"
            v-if="path() == 'approve' || path() == 'approving'"
          >
            <!--10월 13일 추가됨 -->
            <!-- <input type="date" v-model="startDate" /> -->
            <Date v-model="startDate"></Date>
            <b>~</b
            >
            <!-- <input v-model="endDate" type="date" /> -->
            <Date v-model="endDate"></Date>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import $ from "jquery";

import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["GetHeader"]),
  },
  created() {
    this.lang = this.GetAppL.search;
    this.commonl = this.GetCommonL;

    this.params = JSON.parse(this.$route.query.data);
    // this.params = this.GetHeader.menu;

    this.Init();
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      filter: "",
      keyword: "",
    };
  },
  methods: {
    Close(e) {
      var LayerPopup = $(".search_con");
      if (LayerPopup.has(e.target).length === 0) {
        $(".search_con").removeClass("active");
      }
    },
    Init() {
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.today = date.getDate();
      this.startDate = `${this.year}-${this.fill(2, this.month)}-${this.fill(
        2,
        this.today
      )}`;
      this.endDate = `${this.year}-${this.fill(2, this.month + 1)}-${this.fill(
        2,
        this.today
      )}`;

      return;
    },
    path() {
      return this.params.type || "";
    },
    Search() {
      var data = {};
      data.filter = "all";

      for (var i in this.$refs) {
        if (this.$refs[i].classList.contains("active")) {
          data.filter = i;
        }
      }
      data.keyword = this.keyword;
      data.startDate = this.startDate;
      data.endDate = this.endDate;
      this.$emit("SetSearchWord", data);
      $(".search_con").removeClass("active");
    },
  },
};
</script>

<style>
/* .back_btn {z-index: 2;} */
</style>