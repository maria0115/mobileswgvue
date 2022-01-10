<template>
  <div class="m_posts">
    <strong desc="로그인 리스트">{{ portlet.title }}</strong>
    <ul>
      <li v-for="(value, name) in this.lists" :key="name">
        <a
          ><em v-if="value.category">[{{ value.category }}]</em
          >{{ value.subject }}</a
        >
      </li>
    </ul>
    <span class="m_more">
      <router-link
        :to="{
          name: `loglist`,
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
    var option = JSON.parse(JSON.stringify(this.portlet));
    option.page = 0;
    option.size = 5;
    option.type = "list";
    this.lists = await this.$store.dispatch("ListOfCategory", option);
    this.lists = this.lists.data;

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
  },
};
</script>

<style>
</style>