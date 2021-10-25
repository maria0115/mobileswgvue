<template>
  <div class="m_posts">
    <strong desc="최근게시물">{{ portlet.board.board }}</strong>
    <ul>
      <li
        v-for="(value, name) in this.GetMain.boardtype['recent']['my'].data"
        :key="name"
      >
        <a @click="Read(value)"
          ><em>[{{ value.category }}]</em>{{ value.subject }}</a
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
              lnbid: '',
              type: 'recent',
              top: '',
              title: portlet.board.board,
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
  created() {},
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
          menu: value.boardType,
          unid: value.unid,
          type: value.boardType,
          title: value.category,
        });
      }
    },
  },
};
</script>

<style>
</style>