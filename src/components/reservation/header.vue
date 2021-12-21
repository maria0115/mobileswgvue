<template>
  <div class="cf_w_header">
    <h2>
      <a @click="Back"
        ><img src="../../mobile/img/wmail_back.png" alt="" /></a
      >{{lang.title}}
    </h2>
    <div>
      <span class="fw_bold" @click="BtnClick(name)" v-for="(value,name) in this.btnArr" :key="name"><a>{{value}}</a></span>
    </div>
  </div>
  <!-- <div class="cf_w_header">
    <h2>
      <a href="./mob_cf_status.html"
        ><img src="../../mobile/img/wmail_back.png" alt=""
      /></a>
    </h2>
    <div>
      <span class="cf_w_cc"><a href="#">편집</a></span>
      <span class="cf_w_rs"><a href="#">예약취소</a></span>
    </div>
  </div> -->
</template>

<script>
export default {
  created(){
    this.lang = this.GetBookL.header;
  },
  props:{
    btnArr:Object
  },
  methods:{
    Back(){
      this.$router.go(-1);
    },
    BtnClick(value){
      // if(value == "cancle"){
      //   this.$router.go(-1);
      // }else{
        this.$emit("BtnClick",value);
      // }
    },
  }
};
</script>

<style>
</style>