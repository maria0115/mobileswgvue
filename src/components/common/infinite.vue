<template>
  <infinite-loading
    @infinite="infiniteHandler"
    :identifier="infiniteId"
    ref="infiniteLoading"
    spinner="waveDots"
  >
    <div slot="no-more" style="padding: 10px 0px">
      {{ GetCommonL.end }}
    </div>
    <div slot="no-results" style="padding: 10px 0px">
      {{ GetCommonL.end }}
    </div>
    <div slot="error">
      Error message, click
      <router-link :to="{ name: 'root' }">here</router-link> to retry
    </div>
  </infinite-loading>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

export default {
  props: {
    infiniteId: Number,
  },
  components: {
    InfiniteLoading,
  },
  methods: {
    infiniteHandler($state) {
      this.$emit("infiniteHandler", $state);
    },
  },
};
</script>

<style>
</style>