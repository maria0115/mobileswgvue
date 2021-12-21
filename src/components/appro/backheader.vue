<template>
  <div class="sub_header">
    <h2>{{title}}</h2>
    <span class="back_btn" @click="RouterBack"><a></a></span>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  methods: {
    // 전 url 이동
    RouterBack() {
      this.$store.commit("SetBack", true);
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>