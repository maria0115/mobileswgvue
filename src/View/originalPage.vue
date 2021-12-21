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
      // title: "Welcome Mobile",
      meta: [
        // { charset: "utf-8" },
        // { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        {
          vmid: "viewport",
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
        },
        // {
        //   name: "apple-mobile-web-app-capable",
        //   content: "yes",
        // },
        // {
        //   name: "apple-mobile-web-app-status-bar-style",
        //   content: "black",
        // },
        // { vmid: "description", name: "description", content: "description" },
        //  { name: 'description', content: 'My description' }
      ],
    };
    // link: [
    //   { rel: "icon", href: "/favicon.ico" },
    //   // ...
    // ],
    // script: [
    //   { type: "text/javascript", src: "/mobile/js/jquerymin.js" },
    //   // ...
    // ],
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