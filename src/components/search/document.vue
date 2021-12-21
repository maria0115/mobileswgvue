<template>
  <div>
    <div id="tab03">
      <div class="con02">
        <h2>{{ GetSearchLanguage.menu[this.path] }}</h2>
        <ul v-if="datacheck">
          <li v-for="(value, name) in this.sortdata[path].data" :key="name">
            <a @click="openView(value)">
            <!-- <a :href="this.path === 'approval' ? openView(value) : value.originalurl"> -->
              <h3>{{ value.subject }}</h3>
              <div class="clfix">
                <em>{{ setWord(value.author) }}</em>
                <span>{{ getTime(value["created"]) }}</span>
              </div>
              <p>
                {{ value.body }}
              </p>
            </a>
          </li>
          <infinite-loading
            @infinite="infiniteHandler"
            :identifier="searchInfiniteId"
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
              <router-link :to="{name:this.$route.name}">here</router-link> to retry
            </div>
          </infinite-loading>
        </ul>
      </div>
    </div>
    <Viewer :attach="false" ref="viewer"></Viewer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Search } from "../../api/index.js";
import Viewer from "../editor/viewer.vue";
import InfiniteLoading from "vue-infinite-loading";
import config from "../../config/search.json";
import config2 from "../../config/config.json";

export default {
  components: {
    InfiniteLoading,
    Viewer
  },
  computed: {
    ...mapState([ "langa",]),
    ...mapState("searchjs",["sortdata",  "searchInfiniteId"]),
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
      infiniteId: 0,
    };
  },
  created() {},
  beforeRouteLeave(to, from, next) {
    // this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
    this.infiniteId += 1;
    next();
  },
  methods: {
    setUrl(url){
      return config2.originPage + url;
    },
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
    openView(value){
      console.log(value)
      if(value.originalurl !== ""){ 
        this.$router.push({
            name: "originalPage",
            params: { url: value.originalurl,category:value.category},
          });
      }
      // if(value.originalurl !== ""){ 
      //   this.$refs.viewer.goOriginView({url:value.originalurl, name:value.subject});
      // }
    },
  },
};
</script>

<style>
</style>