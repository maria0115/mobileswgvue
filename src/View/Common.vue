<template>
  <div style="height: 100%">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  created() {


    // document.documentElement.style.setProperty('--main-bg-color', this.Option().mainBgColor);

    
    if (this.$route.name === "root") {
      for (var item of this.languages) {
        this.getLanguage(item);
      }
      this.$store.dispatch("GetLanguage", { app: "main" }).then((res) => {
        this.$router.push({ name: "main" });
      });
    }
  },
  data() {
    return {
      languages: [
        "search",
        "mail",
        "config",
        "approval",
        "board",
        "reservation",
        "mailconfig",
        "schedule",
        "common",
      ],
    };
  },
  methods: {
    getLanguage(app) {
      this.$store.dispatch("GetLanguage", { app });
    },
  },
};
</script>

<style>
</style>