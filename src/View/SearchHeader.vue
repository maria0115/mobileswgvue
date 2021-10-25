<template>
  <div class="search_bar">
    <div>
      <form @submit.prevent="signInButtonPressed">
        <input
          type="text"
          class="search"
          :placeholder="this.GetSearchLanguage.inputbox"
          v-on:input="searchQuery = $event.target.value"
          @keyup="autoComplete"
          v-model="data.searchword"
          autocomplete="on"
          @click="Recent"
        />
        <div class="btns">
          <span class="del_btn" @click="wordReset()">
            <em></em>
          </span>
          <span class="search_icon" @click="SearchWord(searchQuery)">
            <img src="../mobile/img/search_icon.png" alt="검색하기" />
          </span>
          <span class="voi_btn" @click="checkApi">
            <img src="../mobile/img/voi_icon.png" alt="음성검색" />
          </span>
        </div>
      </form>
    </div>
    <div id="recommend">
      <div class="auto_search">
        <div
          v-for="(value, name) in this.autoList"
          :key="name"
          class="item"
          @click="SearchWord(value)"
        >
          <span v-for="(v, n) in strong(value)" :key="n">
            <span class="text" v-if="v[Object.keys(v)[0]]">{{
              Object.keys(v)[0]
            }}</span
            ><span v-else>{{ Object.keys(v)[0] }}</span>
          </span>
          <em></em>
        </div>
        <p>
          <em>자동완성끄기</em>
          <em class="end">닫기</em>
        </p>
      </div>
      <div class="recent_search">
        <ul>
          <li v-for="(value, name) in this.recent" :key="name" class="re_text">
            <div @click="SearchWord(value.key)">{{ value.key }}</div>
            <em @click="DelKeyword(value.key, name)" class="rmbt"></em>
          </li>
        </ul>
        <p>
          <em @click="AllDel()">{{ GetSearchLanguage.delete }}</em>
          <em class="end">{{ GetSearchLanguage.completion }}</em>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import $ from "jquery";
let qwe = null;
export default {
  created() {
    // 다국어 처리
    // this.$store.dispatch("search/GetLanguage", { app: "search" });
  },
  computed: {
    ...mapState("searchjs", ["autoList","recent", "form"]),
    ...mapGetters("searchjs", ["data"]),
    ...mapState("configjs", ["config"]),
    ...mapGetters(["GetSearchLanguage"]),
    copyRecent() {
      this.copyrecent = this.recent;
    },
    // 자동완성 검색어에서 입력된 단어가 일치하면 strong tag 설정
    strong() {
      return (word) => {
        if (typeof word === "string" && this.searchQuery !== "") {
          const restr = `.${this.searchQuery}.`;
          word = this.replaceAll(word, this.searchQuery, restr).split(".");

          var result = [];
          for (var i = 0; i < word.length; i++) {
            var res = {};
            var boo = false;
            if (word[i] !== "") {
              if (word[i] === this.searchQuery) {
                boo = true;
              }
              res[word[i]] = boo;
              result.push(res);
            }
          }

          return result;
        } else {
          return;
        }
      };
    },
  },
  data() {
    return {
      copyrecent: [],
      searchQuery: "",
      fo: false,
      cNum: 0,
      runtimeTranscription: "",
      transcription: [],
      voice: "음성 검색",
      oncategory: "allsearch",
    };
  },
  mounted() {
    // 검색창 외의 다른 곳 찍을 때 검색어 창 닫힐 수있는 이벤트 리스너
    document.addEventListener("click", this.click);
  },
  methods: {
    // 검색어 삭제
    wordReset() {
      this.searchQuery = "";
      this.$store.commit("searchjs/WordReset");
    },
    // 검색창 외의 다른 곳 찍을 때 창 닫기
    click(e) {
      if (e.target.className === "search" || e.target.className === "rmbt") {
      } else {
        this.allremove();
      }
    },
    // 자동완성 글 입력된 검색어로 자르기
    replaceAll(str, searchStr, replaceStr) {
      return str.split(searchStr).join(replaceStr);
    },
    // 카테고리 클릭시 class on
    Category(value) {
      this.oncategory = value;
    },
    // 검색어 전체 삭제
    AllDel() {
      this.$store.dispatch("searchjs/AllDelKeyword");
      this.$store.dispatch("searchjs/GetRecent");
    },
    // 검색어 선택 삭제
    DelKeyword(word, index) {
      this.$store.dispatch("searchjs/DelKeyword", { word, index });
    },
    // button in form 클릭시 submit 되지 않게
    signInButtonPressed(e) {
      e.preventDefault();
    },
    // 검색 data
    SearchWord(word) {
      this.allremove();
      this.$store.commit("searchjs/setWord", { word });
      if (this.$route.name !== "allsearchsearch") {
        this.$router.push({name:'allsearchsearch'});
      } else {
        this.$store.dispatch("searchjs/SearchWord", {
          word,
        });
      }
    },
    // 최근 검색어  data
    Recent() {
      this.$store.dispatch("searchjs/GetRecent");
      this.auto_removeClass();
      this.recent_addClass();
    },
    // 카테고리 별 검색
    Categorysearch(cate, category) {
      this.$store.dispatch("searchjs/SearchWord", { category: category });
    },
    // 필터 검색
    Datesearch(what, value, kind) {
      var data = { what, value };
      if (
        typeof kind !== "undefined" ||
        typeof kind !== undefined ||
        kind !== null ||
        kind !== ""
      ) {
        data.kind = kind;
      }

      this.$store.dispatch("searchjs/SearchWord", data);
    },
    // 음성인식
    checkApi() {
      if (
        typeof window.webkitSpeechRecognition == "undefined" ||
        typeof window.webkitSpeechRecognition == undefined ||
        window.webkitSpeechRecognition == null ||
        window.webkitSpeechRecognition == ""
      ) {
        // 인터넷 익스플로러 음성 인식 X
        alert("현재 브라우저에서 지원하지 않는 서비스입니다.     ");
      } else {
        if (this.voice == "듣는중") {
          // empty
          qwe.stop();
        } else {
          this.voice = "듣는중";
          window.SpeechRecognition =
            window.webkitSpeechRecognition || window.SpeechRecognition;
          const recognition = new window.SpeechRecognition();
          qwe = recognition;
          recognition.lang = "ko-KR";
          recognition.addEventListener("result", (event) => {
            const text = Array.from(event.results)
              .map((result) => result[0])
              .map((result) => result.transcript)
              .join("");
            this.runtimeTranscription = text;
          });
          recognition.addEventListener("end", () => {
            if (this.runtimeTranscription !== "") {
              this.transcription.push(this.runtimeTranscription);
              console.log(
                this.runtimeTranscription,
                "recognition"
              );
              this.$store.dispatch("searchjs/SearchWord", {
                word: this.runtimeTranscription,
                category: this.data.class,
              });
              this.$router.push({name:'allsearchsearch'});
              this.runtimeTranscription = "";
              recognition.stop();
              alert("검색 성공!");
            } else {
              alert("종료!");
            }
            this.voice = "음성 검색";
            // recognition.start();
          });
          recognition.start();
        }
      }
    },
    // 자동완성 창 닫기
    auto_removeClass() {
      var $auto_search = $(".auto_search");
      $auto_search.removeClass("on");
    },
    auto_addClass() {
      // 자동완성 창 보이게
      var $auto_search = $(".auto_search");
      $auto_search.addClass("on");
    },
    // 최근검색 창 닫기
    recent_removeClass() {
      var $recent_search = $(".recent_search");
      $recent_search.removeClass("on");
    },
    recent_addClass() {
      // 최근검색 창 보이게
      var $recent_search = $(".recent_search");
      $recent_search.addClass("on");
    },
    // 자동검색 최근검색 창 닫기
    allremove() {
      this.auto_removeClass();
      this.recent_removeClass();
    },
    //
    autoComplete(e) {
      // 자동완성으로 연관검색어 가져오기
      const now = new Date();
      const timeStamp = Date.parse(now) + now.getMilliseconds();

      if (e.keyCode == 13) {
        // 엔터키
        this.SearchWord(e.target.value);
      } else if (e.keyCode == 27) {
        // esc키
        // this.removeClass();
        this.auto_removeClass();
        this.recent_removeClass();
      } else {
        // 연관검색어
        // this.addClass();
        if (e.target.value === "") {
          this.auto_removeClass();
          this.recent_addClass();
        } else {
          this.auto_addClass();
          this.recent_removeClass();
          var word = this.searchQuery;
          this.$store.dispatch("searchjs/autoComplete", {
            word: word,
            category: this.data.class,
            timeStamp: timeStamp,
          });
        }
      }
    },
  },
};
</script>

<style>
</style>