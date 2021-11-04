<template>
  <div>
    <div v-html="body"></div>
    <Footer></Footer>
  </div>
</template>

<script>
// import axios from 'axios';
import Footer from "./footer.vue";

export default {
  data() {
    return {
      body: "잠시만 기다려주세요......",
    };
  },
  components: {
    Footer,
  },
  created(){
    this.showOrigin();
  },
  methods: {
    showOrigin() {
      this.$store.dispatch("tf", {
        data: true,
      });
      var port = window.location.port;
      if (
        typeof port == "undefined" ||
        typeof port == undefined ||
        port == null ||
        port == ""
      ) {
        port = "";
      } else {
        port = ":" + port;
      }
      var data = {"documenturl":`https://${window.location.hostname + port}/dwp/com/portal/main.nsf/wfrmpage?ReadForm&url=${this.$route.params.url}`,"cookie":document.cookie,"remove_element":"","null_check_element":"body > div.dwp-container-wrap > div > div > div > form > div.dwp-page-body > div > div > div > div.dwp-section.close-area.active > div.dwp-sign-wrap > div:nth-child(2)","capture_element":"","viewportw":"","viewporth":""};
        // axios({
        //     method: 'post',
        //     url: `/convert2image`,
        //     data: data,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })            
        // .then((res) => {
        //     if (res.status === 200) {
        //       this.$store.dispatch("tf", {
        //         data: false,
        //       });
        //         this.body = res.data;
        //     }
        // })
        this.$store.dispatch("DocView", data).then((res) => {
          if (res.status === 200) {
                this.body = res.data;
            }
      });
    },
  },
  watch : {
    body: function(newValue, oldValue) {
      if (newValue !== "잠시만 기다려주세요......") {
        this.$store.dispatch("tf", {data: false});
      }
    }
  }

}
</script>

<style>

</style>