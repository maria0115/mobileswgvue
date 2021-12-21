<template>
  <div class="cal_w_header">
    <h2>
      <a @click="RouterBack"><img src="../../mobile/img/wmail_back.png" alt="" /></a>{{lang.schedule}} {{lang[title]}}
    </h2>
    <div v-if="title=='edit'">
      <span class="cal_save fw_bold" @click="Send"><a>{{lang.save}}</a></span>
      <span class="cal_save fw_bold" @click="RouterBack"><a>{{lang.cancle}}</a></span>
    </div>
    <div v-else-if="title=='write'">
        <span class="cal_save fw_bold"><a @click="Send">{{lang.register}}</a></span>
        <span class="cal_save fw_bold" @click="RouterBack"><a>{{lang.cancle}}</a></span>
      </div>
  </div>
</template>

<script>
export default {
  created(){
    this.lang = this.GetScheduleL.header;
  },
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