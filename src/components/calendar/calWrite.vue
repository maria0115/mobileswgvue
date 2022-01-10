<template>
  <div>
    <CalHeader :title="Title()" @Send="Send"></CalHeader>
    <Content
      v-if="Option().inotes"
      @ModalOn="ModalOn"
      @remodal="remodal"
      :rereclick="rereclick"
      @reData="reData"
      @SetSend="SetSend"
      :lang="lang"
      ref="child"
    ></Content>
    <Content2 v-else ref="child" :lang="lang" @ModalOn="ModalOn" @SetSend="SetSend"></Content2>
    <ReRe
      @reData="reData"
      :rmodalon="rmodalon"
      @rere="rere"
      @remodal="remodal"
      
    ></ReRe>
    <Org :send="send" :modalon="modalon" @ModalOff="ModalOff"></Org>
  </div>
</template>

<script>
import Content from "./inotes.vue";
import Content2 from "./noinotes.vue";
import CalHeader from "./calHeader.vue";

import ReRe from "./re.vue";
import { mapState, mapGetters } from "vuex";
import Org from "@/View/Org.vue";
export default {
  components: { Content, Content2, ReRe, Org, CalHeader },
  created() {
    if (this.Option().inotes) {
      this.lang = this.GetScheduleL.write;
    } else {
      this.lang = this.GetBookL.write;
    }
  },
  mounted() {},
  computed: {
    ...mapGetters("calendarjs", [
      "GetEdit",
      "GetSchedule",
      "GetSaveSchedule",
      "GetSaveScheduleList",
    ]),
  },
  beforeDestroy() {
    // this.$store.commit("OrgDataInit");
    this.$store.commit("calendarjs/isEdit", false);
  },
  data() {
    return {
      modalon: false,
      rmodalon: false,
      rereclick: false,
      ReData: {},
      send:[],
    };
  },
  methods: {
    SetSend(data){
      this.send = data;
    },
    reData(data) {
      this.ReData = data;
    },
    Send() {
      var formData = this.$refs.child.Send();

      if (this.rereclick) {
        // 반복예약
        formData.append("Repeats", "1");
      } else {
        // 일반
        formData.append("Repeats", "");
      }

      for (var i in this.ReData) {
        formData.append(i, this.ReData[i]);
      }
      var type = "write";
      if (this.GetEdit) {
        type = "edit";
      }
      this.$store.dispatch("calendarjs/CalWrite", {
        data: formData,
        type,
      });
    },
    ModalOff() {
      this.modalon = false;
    },
    ModalOn() {
      this.modalon = true;
    },
    remodal(boo) {
      this.rmodalon = boo;
    },
    rere(boo) {
      this.rereclick = boo;
    },
    Title() {
      if (this.GetEdit) {
        return "edit";
      }
      return "write";
    },
  },
};
</script>

<style>
</style>