<template>
  <div>다운로드페이지</div>
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
    }
  },
};
</script>

<style>
</style>