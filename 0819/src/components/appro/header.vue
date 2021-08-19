<template>
  <div class="sub_header">
        <h2>{{title}}</h2>
        <span class="sub_ham" @click="OpenHam"></span>
        <span class="ap_sub_search"></span>
    </div>
</template>

<script>
export default {
  methods:{
    OpenHam(){
      this.$emit('OpenHam');
    }
  },
  props: {
    title: String,
  },

}
</script>

<style>

</style>