<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{name:'mailsetconfig'}"><img src="../../mobile/img/wmail_back.png" alt="" /></router-link>
      {{lang.title}}
      <span><router-link :to="{name:'addsign'}">{{lang.add}}</router-link></span>
    </h2>
    <div class="m_contents06">
      <ul class="cm_list">
        <li v-for="(value,index) in this.mail.data.signature.data.data" :key="index">
          <span @click="SignSet(value)" class="sv_radio" :class="{active:value.default}"></span
          ><a @click="SeeSign(value.unid)">{{value.subject}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  created(){
    this.lang = this.GetMConfigL.sign;
  },
  computed: {
    ...mapState("mailjs",["mail"]),
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    SignSet(value){
      this.$store.dispatch("mailjs/SignSet",{unid:value.unid});

    },
    SeeSign(unid){
      this.$router.push({ name: "SeeSign", params: { unid } });
    },
  },
};
</script>

<style>
</style>