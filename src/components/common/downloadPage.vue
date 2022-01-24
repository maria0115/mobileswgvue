<template>
  <div>다운로드페이지</div>
</template>

<script>
export default {
  created() {
    var querys = this.$route.query;
    location.href = querys.url;
  },
};
</script>

<style>
</style>