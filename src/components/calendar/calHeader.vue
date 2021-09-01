<template>
  <div class="cal_w_header">
    <h2>
      <a @click="RouterBack"><img src="../../mobile/img/wmail_back.png" alt="" /></a>일정 {{title}}
    </h2>
    <div v-if="title=='edit'">
      <span class="cal_save"><a>취소</a></span>
      <span class="cal_save" @click="Send"><a>저장</a></span>
    </div>
    <div v-else-if="title=='write'">
        <span class="cal_save"><a @click="Send">등록</a></span>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    RouterBack() {
      this.$router.go(-1);
    },
    Send(){
      this.$emit("Send");
    },
  },
  props: {
    title: String,
  },
};
</script>

<style>
</style>