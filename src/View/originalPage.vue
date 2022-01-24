<template>
  <div style="margin-left: -45px; magin-right: -45px">
    <iframe
      :src="origin() + this.$route.params.url"
      style="width: 900px; height: 100vh"
    ></iframe>
    <Spinner :loading="tf"></Spinner>
    <Footer></Footer>
  </div>
</template>

<script>
// import axios from 'axios';
import Footer from "./footer.vue";
import Spinner from "@/View/Spinner.vue";
import config from "@/config/config.json";

export default {
  created() {},
  data() {
    return {
      tf: false,
    };
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: "viewport",
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
        },
      ],
    };
  },
  components: {
    Footer,
    Spinner,
  },
  methods: {
    origin() {
      if (this.$route.params.category == "board") {
        return "";
      }
      return config.originPage;
    },
  },
};
</script>

<style>
</style>