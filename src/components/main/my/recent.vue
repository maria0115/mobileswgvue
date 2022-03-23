<template>
  <div class="m_posts">
    <strong desc="최근게시물">{{ portlet.title }}</strong>
    <ul>
      <li v-for="(value, name) in this.lists" :key="name">
        <a @click="Read(value)"
          ><em v-if="value.category">[{{ value.category }}]</em
          >{{ value.subject }}</a
        >
      </li>
    </ul>
    <span class="m_more">
      <!-- @click.native="
          SetHeader({
            lnbid: '',
            type: 'recent',
            top: '',
            title: portlet.board.board,
          })
        " -->
      <router-link
        :to="{
          name: `boardlist`,
          query: {
            data: JSON.stringify({
              lnbid: params.lnbid,
              type: portlet.type,
              top: portlet.lnbid,
              title: params.title,
            }),
          },
        }"
      ></router-link
    ></span>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: ["portlet"],
  async created() {
    this.params = this.portlet;
    console.log(this.portlet.lnbid)
    var res = await this.$store.dispatch("CategoryList", this.portlet.lnbid);
    this.params = JSON.parse(JSON.stringify(res[0]));
    if (res.length > 0) {
      res[0].page = 0;
      res[0].size = 5;
      res[0].category = "board";
      res[0].type = this.portlet.type;
      this.lists = await this.$store.dispatch("ListOfCategory", res[0]);

      this.$forceUpdate();
    }
  },
  data() {
    return {
      lists: [],
    };
  },
  computed: {
    ...mapGetters("mainjs", ["GetMain"]),
  },
  methods: {
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
    Read(value) {
      if (value.unid) {
        this.$store.dispatch("boardjs/BoardDetail", {
          menu: this.portlet.type,
          unid: value.unid,
          type: this.portlet.type,
          title: this.params.title,
          lnbid: this.params.lnbid,
          top: this.portlet.lnbid,
        });
      }
    },
  },
};
</script>

<style>
</style>