<template>
  <div>Loading...</div>
</template>

<script>
export default {
  created() {
    var querys = this.$route.query;
    if (querys.url.indexOf("Synap") == -1) {
      location.href = querys.url;
    } else {
      var s = decodeURIComponent(querys.url).split("/");
      var key = s[s.length - 1];
      location.href = `${this.host()}/SynapDocViewServer/viewer/doc.html?key=${key}&convType=img&convLocale=en_US&contextPath=/SynapDocViewServer`;
      if (querys.url.indexOf("m60call") !== -1) {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    var querys =  this.$route.query;
    // this.$router.go(-1);
    console.log(querys.url)
    if (querys.url.indexOf("m60call") !== -1) {
      this.$router.go(-1);
    }
  },
};
</script>

<style>
</style>