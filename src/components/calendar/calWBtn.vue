<template>
  <span class="w_cal_btn" @click="isEdit"><a @click="Write"></a></span>
</template>

<script>
export default {
  mounted() {
    this.params={};
    if(this.$route.query.data){
      this.params = JSON.parse(this.$route.query.data);
    }
  },
  methods: {
    Write() {
      this.$router.push({
        name: "calwrite",
        query: {
          data: JSON.stringify({ date: this.params.date, starttime: "" }),
        },
      });
    },
    isEdit() {
      this.$store.commit("calendarjs/isEdit", false);
    },
  },
};
</script>

<style>
</style>