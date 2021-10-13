<template>
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
            @click="
              Read(value, key, {
                lnbid: key.lnbid,
                type: key.type,
                top: top,
                title: key.title,
              })
            "
            >{{ value.subject }}</a
          >
        </li>
      </ul>

      <span class="m_more"
        ><router-link
          :to="{
            name: `${key.category}list`,
            query: {
              data: JSON.stringify({
                lnbid: key.lnbid,
                type: key.type,
                top: top,
                title: key.title,
              }),
            },
          }"
        ></router-link
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
    ...mapState(["listOfCategory"]),
  },
  async created() {
    this.params = JSON.parse(this.$route.query.data);
    console.log(this.params);

    this.top = this.params.lnbid;
    var res = await this.$store.dispatch("CategoryList", this.top);
    // .then(res=>{
    //   console.log(res,"res.datacreated")
    this.categories = res;
    for (var i = 0; i < res.length; i++) {
      res[i].page = 0;
      res[i].size = 5;
      res[i].category = "board";
      res[i].type = this.params.type;
      var resp = await this.$store.dispatch("ListOfCategory", res[i]);
      this.listOfCategory[res[i].lnbid] = resp;
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
    Read(value, menu, data) {
      console.log(menu, value, "valuemenu");

      if (value.unid) {
        console.log("여기아니냐");
        this.$store.dispatch("boardjs/BoardDetail", {
          type: menu.type,
          title: menu.title,
          menu: menu.type,
          unid: value.unid,
          lnbid: menu.lnbid,
        });
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