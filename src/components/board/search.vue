<template>
  <div class="search_con">
      <div>
        <div class="sc_top">
          <span class="back_btn"></span>
          <div>
            <!--8월 9일 태그 수정됨 -->
            <input
              type="text"
              v-model="searchword"
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
            <input type="checkbox" ref="0" class="all_sc_check active" />
            <label for="">전체</label>
          </p>
          <p>
            <span>
              <input type="checkbox" ref="1" class="sc_check" />
              <label for="">작성자</label>
            </span>
            <span>
              <input type="checkbox" ref="2" class="sc_check" />
              <label for="">작성부서</label>
            </span>
            <span>
              <input type="checkbox" ref="3" class="sc_check" />
              <label for="">제목</label>
            </span>
            <span>
              <input type="checkbox" ref="4" class="sc_check" />
              <label for="">제목 + 본문</label>
            </span>
          </p>
        </div>
      </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
    created() {
    },
    data() {
    return {
      searchType: "",
      searchfield: "",
      searchword: "",
    };
  },
  methods: {
    Search() {
      var data = {};
      data.searchfield = "0";

      for(var i in this.$refs) {
          if(this.$refs[i].classList.contains("active")){
            data.searchfield = i;
          }
      }
      data.searchword = this.searchword;
      this.$emit("SetSearchWord",data);
        $('.search_con').removeClass('active');

    },
  },
};
</script>

<style>
</style>