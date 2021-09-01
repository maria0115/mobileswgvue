<template>
  <div id="board_tab">
    <div
      :class="`board0${index + 1}`"
      v-for="(key, index) in Object.keys(GetBoard)"
      :key="key"
    >
      <strong>{{ key }}</strong>
      <ul>
        <li
          :class="{ new: boo(value) }"
          v-for="(value, index) in GetMain.boardtype[key].more.data"
          :key="index"
        >
          <a @click="Read(value, key)">{{ value.subject }}</a>
        </li>
      </ul>
      <span class="m_more"
        ><router-link :to="`/board_more/${key}`"></router-link
      ></span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("mainjs", ["GetMain"]),
    ...mapGetters("boardjs", ["GetBoard"]),
    ...mapState("mainjs", ["main"]),
  },
  created() {
  },
  methods: {
    Read(value, menu) {
      if (value.unid) {
        this.$store.dispatch("boardjs/BoardDetail", { menu ,unid:value.unid});
      }
    },
    boo(value) {
      var moment = require("moment");
      var localTime = moment.utc(value.created).toDate();
      localTime = parseInt(moment(localTime).format("YYYYMMDD"));
      var nowTime = parseInt(moment().format("YYYYMMDD"));
      if (nowTime - localTime < this.main.my.recentdate) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
</style>