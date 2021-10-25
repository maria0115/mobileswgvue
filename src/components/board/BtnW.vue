<template>
  <span class="w_mail_btn"
    >
    <!-- @click.native="SetHeader(params)" -->
    <router-link
      :to="{
        name: 'boardwrite',
        query:{data:JSON.stringify(params) }
      }"
    ></router-link
  ></span>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters( ["GetHeader"]),
  },
  created() {
    this.params = JSON.parse(this.$route.query.data);
    // this.params = this.GetHeader.menu;
  },
  methods: {
    SetHeader(data) {
      this.$store.dispatch("SetHeader", data);
    },
  },
  props: {
    path: String,
  },
};
</script>

<style>
</style>