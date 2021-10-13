<template>
  <span class="w_mail_btn"
    ><router-link
      :to="{
        name: 'boardwrite',
        query: {
          data: JSON.stringify(params),
        },
      }"
    ></router-link
  ></span>
</template>

<script>
export default {
  created() {
    this.params = JSON.parse(this.$route.query.data);
  },
  methods: {},
  props: {
    path: String,
  },
};
</script>

<style>
</style>