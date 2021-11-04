<template>
  <div class="search_con search_con02">
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
              placeholder="검색어를 입력하세요"
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
              <label for="">전체</label>
            </span>
          </p>
          <p v-if="path().indexOf('success') == -1">
            <span>
              <input type="checkbox" ref="subject" class="sc_check" />
              <label for="">제목</label>
            </span>
            <span>
              <input type="checkbox" ref="formtitle" class="sc_check" />
              <label for="">서식명</label>
            </span>

            <em v-if="path() == 'approve' || path() == 'approving'">
              <span>
                <input type="checkbox" ref="authorName" class="sc_check" />
                <label for="">기안자</label>
              </span>
              <span v-if="path() == 'approve'">
                <input type="checkbox" ref="authorOrgName" class="sc_check" />
                <label for="">기안부서</label>
              </span>
              <span v-if="path() == 'approving'">
                <input type="checkbox" ref="sCurFullList" class="sc_check" />
                <label for="">기안부서</label>
              </span>
              <span>
                <input type="checkbox" ref="date" class="sc_check date_line" />
                <label for="">기안일자</label>
              </span>
            </em>
          </p>
          
          <p v-else>
            <span>
              <input type="checkbox" ref="authorName" class="sc_check" />
              <label for="">기안자</label>
            </span>
            <span>
              <input type="checkbox" ref="subject" class="sc_check" />
              <label for="">제목</label>
            </span>
            <span>
              <input type="checkbox" ref="body" class="sc_check" />
              <label for="">본문</label>
            </span>
            <span>
              <input type="checkbox" ref="attach" class="sc_check" />
              <label for="">첨부</label>
            </span>
          </p>
          <div class="d_line clfix" v-if="path() == 'approve' || path() == 'approving'"><!--10월 13일 추가됨 -->
      <input type="date" v-model="startDate"><b>~</b><input v-model="endDate" type="date">
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
    ...mapGetters( ["GetHeader"]),
  },
  created() {
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
    fill(width, number) {
      number = number + ""; //number를 문자열로 변환하는 작업
      var str = "";
      for (var i = 0; i < width - number.length; i++) {
        str = str + "0";
      }
      str = str + number;
      return str;
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
      return this.params.type||"";
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
      this.$emit("SetSearchWord",data);
        $('.search_con').removeClass('active');

    },
  },
};
</script>

<style>
/* .back_btn {z-index: 2;} */
</style>