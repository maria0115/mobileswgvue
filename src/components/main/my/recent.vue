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
    <span class="m_more"><router-link to="/board_more"></router-link></span>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: ["portlet"],
  created() {
    console.log(this.GetMain);
  },
  computed: {
    ...mapGetters("mainjs", ["GetMain"]),
  },
  methods: {
    Read(value) {
      console.log(value);
      if (value.unid) {
        this.$store.dispatch("boardjs/BoardDetail", {
          menu: value.boardType,
          unid: value.unid,
        });
      }
    },
  },
};
</script>

<style>
</style>