<template>
  <div>
    <div id="tab01">
      <div class="con01">
        <h2>{{ GetSearchLanguage.menu.person }}</h2>
        <ul class="clfix" v-if="this.sortdata.person !== undefined">
          <li v-for="(value, name) in this.sortdata.person.data" :key="name">
            <a>
              <span
                ><img
                  :src="value.photo"
                  @error="$event.target.src = '../../mobile/img/img03.png'"
                  alt=""
              /></span>
              <dl>
                <dt>
                  <em>{{ value.subject }}</em
                  >{{ value.jobposition }}
                </dt>
                <dd>{{ setWord(value.dept) }}</dd>
              </dl>
            </a>
          </li>
        </ul>
        <span class="ex_more">
          <router-link :to="{ name: 'personsearch' }"
            ><a
              >{{ GetSearchLanguage.menu.person }} {{ GetSearchLanguage.more
              }}<img
                src="../../mobile/img/more_icon.png"
                alt="임직원 더보기" /></a
          ></router-link>
        </span>
      </div>
      <div
        class="con02"
        v-if="
          this.sortdata.approval !== undefined &&
          this.sortdata.approval.data.length !== 0
        "
      >
        <h2>{{ GetSearchLanguage.menu.approval }}</h2>
        <ul v-if="this.sortdata.approval !== undefined">
          <li v-for="(value, name) in this.sortdata.approval.data" :key="name">
            <a @click="openView(value, 'approval')">
              <!-- <a :href="setUrl(value.originalurl)"> -->
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
        </ul>
      </div>
      <div
        class="con02"
        v-if="
          this.sortdata.board !== undefined &&
          this.sortdata.board.data.length !== 0
        "
      >
        <h2>{{ GetSearchLanguage.menu.board }}</h2>
        <ul v-if="this.sortdata.board !== undefined">
          <li v-for="(value, name) in this.sortdata.board.data" :key="name">
            <a @click="openView(value, 'board')">
              <!-- <a :href="setUrl(value.originalurl)"> -->
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
        </ul>
      </div>
    </div>
    <Viewer :attach="false" ref="viewer"></Viewer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import config from "../../config/search.json";
import config2 from "../../config/config.json";

export default {
  computed: {
    ...mapState(["langa"]),
    ...mapState("searchjs", ["sortdata"]),
    ...mapGetters(["GetSearchLanguage"]),
    // image 파일을 가지고 있는 url 반환
    url() {
      return config.search.category;
    },
    // locale 값 반환
    lang() {
      return config.lang;
    },
  },
  data() {
    return {
      path: "",
    };
  },
  created() {},
  methods: {
    setUrl(url) {
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
    openView(value, category) {
      if (value.originalurl !== "") {
        this.OriginView({
          url: value.originalurl,
          category,
          name: value.subject,
          unid: value.unid,
          search: true,
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