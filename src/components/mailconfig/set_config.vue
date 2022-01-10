<template>
  <div>
    <h2 class="mail_st_header">
      <router-link :to="{ name: 'mail' }"
        ><img src="../../mobile/img/wmail_back.png" alt="" /></router-link
      >{{lang.setting}}
    </h2>
    <div class="m_contents05">
      <ul class="cm_list">
        <router-link :to="{ name: 'autosaveconfig' }"
          ><li>
            <a
              >{{lang.autosave}}<span>
                {{ use[GetMailConfig.autosave.config.use] }}
              </span></a
            >
          </li></router-link
        >
        <router-link :to="{ name: 'sign' }"
          ><li>
            <a
              >{{lang.sign}}<span>
                <!-- {{this.mail.data.greetings.data.use}} -->
                {{ use[mail.data.signature.data.use] }}
              </span></a
            >
          </li></router-link
        >
        <router-link :to="{ name: 'greet' }"
          ><li>
            <!-- <a>인사말<span>사용함</span></a> -->
            <a
              >{{lang.greet}}<span>
                {{ use[mail.data.greetings.data.use] }}
              </span></a
            >
          </li></router-link
        >
        <router-link v-if="Option().mailDelay" :to="{ name: 'delay' }"
          ><li>
            <a
              >{{lang.dely}}<span>
                {{ use[GetMailConfig.delay.config.use] }}
              </span></a
            >
          </li></router-link
        >
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import config from "@/config/config.json";
export default {
  created(){
    this.lang = this.GetMConfigL.setconfig;
    this.use = this.lang.use;
  },
  computed: {
    ...mapState("mailjs", ["mail"]),
    ...mapGetters("mailjs",["GetMailConfig"])
  },
  methods: {
    
    Back() {
      this.$router.go(-1);
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style>
</style>