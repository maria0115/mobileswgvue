<template>
  <div class="ac_btns">
    <span class="more_plus"></span>
    <ul>
      <li class="top">
        <a>{{ commonl.up }}</a>
      </li>
      <li v-for="(value, name) in menu" :key="name"  @click="BtnClick(name)">
        <a :class="{agree:name=='agree',reject:name=='reject'}">{{ value }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.commonl = this.GetCommonL;
  },
  props: {
    menu: Object,
  },
  methods: {
    BtnClick(value) {
      this.$emit("BtnClick", value);
    },
  },
};
</script>

<style>

</style>