<template>
  <div class="ac_btns" v-if="isDisplay()">
    <span class="more_plus"></span>
    <ul>
      <li class="top" v-if="isTop()">
        <a>{{ commonl.up }}</a>
      </li>
      <li v-for="(value, name) in menu" :key="name"  @click="BtnClick(name)">
        <a :class="{agree:name=='agree'||name=='write',reject:name=='reject'}">{{ value }}</a>
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
    isDisplay(){
      return Object.keys(this.menu).length>0;
    },
    BtnClick(value) {
      this.$emit("BtnClick", value);
    },
    isTop(){
      // if(this.Config().company=="ace"){
        var name = this.$route.name;
        if(name=="approveview"||name=="ingview"){
          return false;
        }
        return true;

      // }else{
        // return true;
      // }
    },
  },
};
</script>

<style>

</style>