<template>
  <div>
    <div id="tab02">
      <div class="con01">
        <h2>{{ GetSearchLanguage.menu[path] }} 정보</h2>
        <ul v-if="datacheck">
          <li v-for="(value, name) in this.sortdata[path].data" :key="name">
            <a>
              <div>
                <span
                  ><img
                    :src="value.photo"
                    @error="$event.target.src = '../../mobile/img/img03.png'"
                    alt=""
                /></span>
                <em>{{ setWord(value.author) }}</em>
              </div>
              <ul>
                <li>
                  <span>{{ GetSearchLanguage[path].dept }} : </span
                  >{{ setWord(value.dept) }}
                </li>
                <li>
                  <span>{{ GetSearchLanguage[path].position }} : </span
                  >{{ value.jobposition }}
                </li>
                <li>
                  <span>{{ GetSearchLanguage[path].tel }} : </span
                  >{{ value.companytel }}
                </li>
                <li>
                  <span>{{ GetSearchLanguage[path].phone }} : </span
                  >{{ value.phone }}
                </li>
                <li>
                  <span>{{ GetSearchLanguage[path].email }} : </span
                  >{{ value.email }}
                </li>
                <li>
                  <span>{{ GetSearchLanguage[path].work }} : </span
                  >{{ value.job }}
                </li>
              </ul>
            </a>
          </li>
          <infinite-loading
            @infinite="infiniteHandler"
            :identifier="searchInfiniteId"
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
              <router-link :to="{name:this.$route.name}">here</router-link> to retry
            </div>
          </infinite-loading>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Search } from "../../api/index.js";
import InfiniteLoading from "vue-infinite-loading";
import config from "../../config/search.json";
export default {
  components: {
    InfiniteLoading,
  },
  computed: {
    ...mapState([ "langa",]),
    ...mapState("searchjs",["sortdata", "searchInfiniteId"]),
    ...mapGetters("searchjs", ["data"]),

    ...mapGetters(["GetSearchLanguage"]),
    ...mapGetters("configjs",["GetConfig"]),
    // image 파일을 가지고 있는 url 반환
    url() {
      return config.search.category;
    },
    // locale 값 반환
    lang() {
      return config.lang;
    },
    // 통합검색의 데이터는 vuex store 하나의 변수로 처리 하게 되는데 router로 이동할 때마다 데이터 값이 제대로 바인딩이 되지 않으면 오류, datacheck
    datacheck() {
      this.path = this.$route.name.split("search")[0];
      var data = this.sortdata[this.path];
      // if (this.sortdata.hasOwnProperty("person")) {
      //   data = this.sortdata.person;
      // }
      if (
        typeof data == "undefined" ||
        typeof data == undefined ||
        data == undefined ||
        data == null ||
        data == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  data() {
    return {
      path: "",
    };
  },
  created() {},
  methods: {
    // utc time to local time, transformat
    getTime(date) {
      var moment = require("moment");
      var localTime = moment.utc(date).toDate();
      localTime = moment(localTime).format("YYYY-MM-DD HHmm");
      return localTime;
    },
    // 데이터 값 (ko:zzz,en:xxx) 다국어 처리
    setWord(word) {
      if (
        typeof word == "undefined" ||
        typeof word == undefined ||
        word == null ||
        word == ""
      ) {
        return "";
      } else {
        if (word.includes(this.langa.locale)) {
          if (JSON.parse(word)[this.langa.locale].length > 0) {
            word = JSON.parse(word)[this.langa.locale];
          }
        }
      }
      return word;
    },
    // 스크롤 페이징
    infiniteHandler($state) {
      this.data.from += 1;
      this.data.pagenum = this.data.from * this.GetConfig.listcount;
      Search(this.data)
        .then((response) => {
          return response.data.data;
        })
        .then((data) => {
          if (data.hasOwnProperty(this.path)) {
            data = data[this.path].data;
          }

          setTimeout(() => {
            if (data.length) {
              this.sortdata[this.path].data =
                this.sortdata[this.path].data.concat(data);
              $state.loaded();

              console.log(
                "after",
                this.sortdata[this.path].data.length,
                this.data.pagenum
              );
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
  },
};
</script>

<style>
</style>