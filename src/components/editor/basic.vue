<template>
  <div style="padding: 0.93rem" v-html="body"></div>
</template>

<script>
export default {
  created() {},
  props: ["body"],
  watch: {
    async body(newval) {
      this.body = newval;
    },
  },
};
</script>

<style>
</style>