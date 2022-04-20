<template>
  <div style="margin-left: -45px; magin-right: -45px">
    <iframe
      :src="origin() + url()"
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
  created() {
    console.log(this.$route.params);
  },
  data() {
    return {
      tf: false,
    };
  },
  mounted() {
    this.setViewPort(
      "width=device-width, initial-scale=1.0, maximum-scale=10.0, user-scalable=yes"
    );
  },
  beforeDestroy() {
    var views = document.querySelectorAll('[name="viewport"]');
    for (var i = 0; i < views.length; i++) {
      document.getElementsByTagName("head")[0].removeChild(views[i]);
    }
    this.setViewPort(
      "width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no"
    );
  },
  // metaInfo() {
  //   return {
  //     meta: [
  //       {
  //         vmid: "viewport",
  //         name: "viewport",
  //         content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
  //       },
  //     ],
  //   };
  // },
  components: {
    Footer,
    Spinner,
  },
  methods: {
    url() {
      return decodeURIComponent(this.$route.params.url);
    },
    origin() {
      if (this.$route.params.category == "board") {
        return this.host();
      }
      return this.host() + config.originPage;
    },
  },
};
</script>

<style>
</style>