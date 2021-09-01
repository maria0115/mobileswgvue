<template>
  <div class="header">
    <h1 description="component 마다 해당 header 다국어를 props받아 출력">{{this.header}}</h1>
    <span class="back_btn">
      <span @click="Back()">
        <img src="../../mobile/img/back_btn.png" alt="뒤로가기" />
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: { header: String },
  methods: {
    // 전 url 로 이동
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>