<template>
  <div>
    <Header :header="this.GetAllim.ettitime" header_desc="에티켓 시간 설정"></Header>
    <div class="content">
      <form @submit.prevent>
        <ul class="eti_menu">
          <li>
            <ul>
              <li>
                <label for="et01">{{this.GetAllim.starttime}}</label>
                <!-- <input
                  type="time"
                  name="s_time"
                  id="et01"
                  :value="GetConfig.etiquette.starttime"
                  v-on:input="setConfig($event, 'starttime')"
                /> -->
                <!-- :input="setConfig(start, 'starttime')" -->
                <Time v-if="!isA()" id="et01" v-model="start" :input="setConfig(start, 'starttime')"></Time>
                <ATime v-else id="et01" v-model="start" :input="setConfig(start, 'starttime')"></ATime>
              </li>
              <li>
                <label for="et02">{{this.GetAllim.endtime}}</label>
                <!-- <input
                  type="time"
                  name="e_time"
                  id="et02"
                  :value="GetConfig.etiquette.endtime"
                  v-on:input="setConfig($event, 'endtime')"
                /> -->
                <Time v-if="!isA()" id="et02" v-model="end" :input="setConfig(end, 'endtime')" ></Time>
                <ATime v-else id="et02" v-model="end" :input="setConfig(end, 'endtime')" ></ATime>
              </li>
            </ul>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from './header.vue';
export default {
  created(){
    this.start = this.GetConfig.etiquette.starttime;
    this.end = this.GetConfig.etiquette.endtime;
  },
  components: {
    Header
  },
  data(){
    return {
      start :"",
      end:"",
    }
  },
  computed: {
    ...mapGetters("configjs",["GetConfig"]),
    ...mapGetters(["GetAllim"]),
  },
  methods: {
    // click 시 해당 설정값 db에 입력
    setConfig(event, menu) {
      this.$store.dispatch("configjs/setConfig", {
        menu: "etiquette",
        setting: menu,
        value: event,
      });
    },
  },
};
</script>

<style>
</style>