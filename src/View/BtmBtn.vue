<template>
  <div class="ac_btns2">
    <span class="more_plus2"></span>
    <ul>
      <li class="top">
        <a>{{ commonl.up }}</a>
      </li>
      <li @click="BtnClick('write')">
        <a class="agree">{{ commonl.write }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  created() {
    this.commonl = this.GetCommonL;

    this.params = JSON.parse(this.$route.query.data);
  },
  props: {
    menu: Array,
  },
  computed: {
    ...mapGetters(["GetCategory"]),
  },
  methods: {
    BtnClick(value) {
      if (value == "write") {
        this.Write();
      }
    },
    Write() {
      var path = this.$route.name;
      if (path === `mainmail`) {
        this.$router.push({ name: "WriteMail" });
      } else if (path === "mainapproval") {
        var app = this.GetCategory[this.params.lnbid];
        var writeidx = app.findIndex(function (item, idx) {
          return item.category == "formList_all";
        });
        var writego = app[writeidx];

        this.SetHeader(writego, `app${writego.category}`);
      }
    },
    SetHeader(value, name) {
      this.$router.push({
        name,
        query: {
          data: JSON.stringify({
            type: value.category,
            lnbid: value.lnbid,
            top: this.params.lnbid,
            title: value.title,
          }),
        },
      });
    },
  },
};
</script>

<style>
</style>