<template>
  <div class="sub_header">
        <h2>{{title}}<em v-if="cnt">({{cnt}})</em></h2>
        <span class="sub_ham" @click="OpenHam"></span>
        <span class="ap_sub_search"></span>
    </div>
</template>

<script>
export default {
  created(){
    console.log(this.cnt,"cnmt")
  },
  methods:{
    OpenHam(){
      this.$emit('OpenHam');
    }
  },
  props: {
    title: String,
    cnt: Number,
  },

}
</script>

<style>

</style>