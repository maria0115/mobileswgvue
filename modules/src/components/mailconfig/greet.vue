<template>
  <div>
    <h2 class="mail_st_header">
      <router-link to="set_config"><img src="../../mobile/img/wmail_back.png" alt="" /></router-link>
      인사말
      <span><router-link to="addgreet">추가</router-link></span>
    </h2>
    <div class="m_contents06">
      <ul class="cm_list">
        <li v-for="(value,index) in this.mail.data.greetings.data.data" :key="index">
          <span @click="GreetSet(value)" class="sv_radio" :class="{active:value.default}"></span
          ><a @click="SeeGreet(value.unid)">{{value.subject}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  components: {
  },
  computed: {
    ...mapState("mailjs",["mail"]),
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    GreetSet(value){
      this.$store.dispatch("mailjs/GreetSet",{unid:value.unid});

    },
    SeeGreet(unid){
      this.$router.push({ name: "SeeGreet", params: { unid } });
    },
  },
};
</script>

<style>
</style>