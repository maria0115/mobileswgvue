<template>
  <div>
    <div id="tab01">
      <div class="con01">
        <h2>{{language.search.menu.person}}</h2>
        <ul class="clfix" v-if="this.sortdata.person !== undefined">
          <li v-for="(value, name) in this.sortdata.person.data" :key="name">
            <a href="">
              <span><img :src="url.person.url + value.photo" @error="$event.target.src='../../mobile/img/img03.png'" alt="" /></span>
              <dl>
                <dt>
                  <em>{{ value.subject }}</em
                  >{{ value.jobposition }}
                </dt>
                <dd>{{ value.dept }}</dd>
              </dl>
            </a>
          </li>
        </ul>
        <span class="ex_more">
          <router-link to="/person"
            ><a
              >{{language.search.menu.person}} {{language.search.more}}<img
                src="../../mobile/img/more_icon.png"
                alt="임직원 더보기" /></a
          ></router-link>
        </span>
      </div>
      <div class="con02">
        <h2>{{language.search.menu.approval}}</h2>
        <ul v-if="this.sortdata.approval !== undefined">
          <li v-for="(value, name) in this.sortdata.approval.data" :key="name">
            <a href="">
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import config from "../../config/config.json";
export default {
  computed: {
    ...mapState(["sortdata", "langa","language"]),
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
      path:""
    };
  },
  created() {
  },
  methods: {
    // utc time to local time, transformat
    getTime(date) {
      var moment = require("moment");
      var localTime = moment.utc(date).toDate();
      localTime = moment(localTime).format("YYYY년 MM월 DD일 HH시 mm분 ss초");
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
  },
};
</script>

<style>
</style>