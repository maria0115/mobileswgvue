<template>
  <div class="m_posts">
    <strong desc="최근게시물">{{ portlet.title }}</strong>
    <ul>
      <li
        v-for="(value, name) in this.lists"
        :key="name"
      >
        <a @click="Read(value)"
          ><em v-if="value.category">[{{ value.category }}]</em>{{ value.subject }}</a
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
              lnbid: portlet.lnbid,
              type: portlet.type,
              top: portlet.lnbid,
              title: portlet.title,
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
    this.portlet.page = 0;
      this.portlet.size = 5;
    this.lists = await this.$store.dispatch("ListOfCategory", this.portlet);

      this.$forceUpdate();
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
          title: this.portlet.title,
          lnbid: this.portlet.lnbid,
          top:this.portlet.lnbid,
        });
      }
    },
  },
};
</script>

<style>
</style>