<template>
  <span class="w_cal_btn" @click="isEdit"><router-link :to="{name:'calwrite'}"></router-link></span>
</template>

<script>
export default {
    methods:{
      isEdit(){
        this.$store.commit("calendarjs/isEdit",false);
      },
    }

}
</script>

<style>

</style>