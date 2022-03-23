<template>
  <div class="main_tab">
    <div id="board_tab">
      <div :class="`board01`" v-for="(key, index) in categories" :key="index">
        <strong>{{ key.title }}</strong>
        <ul>
          <li
            :class="{ new: boo(value) }"
            v-for="(value, i) in listOfCategory[key.lnbid]"
            :key="i"
          >
            <a
              ><strong v-if="value.category">[{{ value.category }}]</strong
              >{{ value.subject }}</a
            >
          </li>
        </ul>

        <span class="m_more">
          <!-- @click.native="
            SetHeader({
              lnbid: key.lnbid,
              type: key.type,
              top: top,
              title: key.title,
            })
          " -->
          <router-link
            :to="{
              name: `${params.category}`,
              query: {
                data: JSON.stringify({
                  lnbid: params.lnbid,
                  type: params.type,
                  top: params.lnbid,
                  title: params.title,
                }),
              },
            }"
          ></router-link
        ></span>
      </div>
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
    ...mapState(["listOfCategory"]),
    ...mapGetters(["GetHeader"]),
  },
  async created() {
    // this.params = this.GetHeader.menu;
    this.params = JSON.parse(this.$route.query.data);
    this.top = this.params.lnbid;
    var res = await this.$store.dispatch("CategoryList", this.top);
    this.categories = res;
    for (var i = 0; i < res.length; i++) {
      var option = JSON.parse(JSON.stringify(res[i]));
      option.page = 0;
      option.size = 5;
      option.type = "list";
      option.category = this.params.category;
      var resp = await this.$store.dispatch("ListOfCategory", option);
      this.listOfCategory[res[i].lnbid] = resp.data;
      this.$forceUpdate();
    }
  },
  data() {
    return {
      categories: [],
      top: "",
    };
  },
  methods: {
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
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