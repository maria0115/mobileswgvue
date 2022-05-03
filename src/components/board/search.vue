<template>
  <div class="search_con" @click="Close">
    <div>
      <div class="sc_top">
        <span class="back_btn"></span>
        <div>
          <!--8월 9일 태그 수정됨 -->
          <input
            type="text"
            v-model="searchword"
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
          <input type="checkbox" ref="0" class="all_sc_check active" />
          <label for="">{{ lang.all }}</label>
        </p>
        <p>
          <span>
            <input type="checkbox" ref="1" class="sc_check" />
            <label for="">{{ lang.author }}</label>
          </span>
          <span>
            <input type="checkbox" ref="2" class="sc_check" />
            <label for="">{{ lang.dept }}</label>
          </span>
          <span>
            <input type="checkbox" ref="3" class="sc_check" />
            <label for="">{{ lang.title }}</label>
          </span>
          <span>
            <input type="checkbox" ref="4" class="sc_check" />
            <label for="">{{ lang.title }} + {{ lang.body }}</label>
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
    this.lang = this.GetBoardL.search;
    this.commonl = this.GetCommonL;
  },
  data() {
    return {
      searchType: "",
      searchfield: "",
      searchword: "",
    };
  },
  methods: {
    Close(e) {
      var LayerPopup = $(".sc_top");
      if (LayerPopup.has(e.target).length === 0) {
        $(".search_con").removeClass("active");
      }
    },
    Search() {
      var data = {};
      data.searchfield = "0";

      for (var i in this.$refs) {
        if (this.$refs[i].classList.contains("active")) {
          data.searchfield = i;
        }
      }
      data.searchword = this.searchword;
      this.$emit("SetSearchWord", data);
      $(".search_con").removeClass("active");
    },
  },
};
</script>

<style>
</style>