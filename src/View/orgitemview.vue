<template>
  <!-- @mousedown="Or_bg"
    @touchstart="Or_bg" -->
  <li
    :class="[
      { or_bg: lastClass },
      { last_deps: lastClass },
      { o_depth02: !lastClass },
      { active: isSelect },
    ]"
  >
    <div>
      <b @click="toggle" :class="{ on: this.isOpen }"></b>
      <span @click="MailOrgData"
        >{{ item.name }}
        <!-- <em v-if="this.item.kinds == 'Person'" class="tel">{{
          item.office
        }}</em> -->
        </span
      >
    </div>
    <!-- v-if="isFolder" -->
    <!-- :style="{ display: this.isBlock }" -->
    <ul :style="{ display: this.isBlock }">
      <org-item
        v-for="(child, index) in children"
        :key="index"
        :item="child"
        @OpenFolder="OpenFolder"
        :modalAutoOrg="modalAutoOrg"
        :createdOrg="createdOrg"
        @setModalOff="ModalOff"
        @OrgDataAdd="OrgDataAdd"
      ></org-item>
    </ul>
  </li>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "OrgItem",
  async created() {
    var full = this.GetMyInfo.info.fullOrgCode;
    if(full){
      var pathidx = full.findIndex((item) => {
        return item == this.item.mycode;
      });
      if (pathidx !== -1) {
        this.GetChildren();
        this.OpenFolder();
      }

    }
    // item이 person이아니고 department면 무조건
    // child 뽑기
    if (this.createdOrg) {
      this.GetChildren();
      var auto = this.autosearchorg[this.org.pointer];
      var result = auto.findIndex(
        (element) => element.shortname === this.item.shortname
      );
      if (result !== -1) {
        this.$emit("OpenFolder");
        this.clicked = true;
      }
    }
  },
  props: {
    item: Object,
    modalAutoOrg: Number,
    createdOrg: Boolean,
  },
  data: function () {
    return {
      isOpen: false,
      children: [],
      click: false,
      clicked: false,
    };
  },
  computed: {
    ...mapState(["autosearchorg", "org"]),
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapGetters("mailjs", ["GetMail"]),

    // 다른것들을 끌어왔을때 렝스가 1이상이면
    isFolder: function () {
      if (this.item.kinds == "Department") {
        return true;
      }
      return false;
    },
    isBlock: function () {
      if (this.isOpen) {
        return "block";
      }
      return "none";
    },
    lastClass() {
      if (this.item.kinds == "Department") {
        return false;
      }
      return true;
    },
    isSelect() {
      // for(var i=0; i<this.appPath.length;i++){
      // console.log(this.org, this.org.pointer);
      // var getOrg = this.org[this.org.pointer];
      // var here = this;

      // var result = getOrg.findIndex(function (itemone, idx) {
      //   return itemone == here.item;
      // });

      // //   var here = this;
      // //   var result = this.appPath.findIndex(function (itemone, idx) {
      // //     return itemone.approvalInfo.email == here.item.email;
      // //   });
      // // if (this.clicked) {
      // //   return true;
      // // } else {
      // if (result !== -1) {
      //   return true;
      // }
      // }
        return false;
    },
  },
  watch: {
    // async modalAutoOrg() {
      // if (this.item.kinds == "Department" && this.children.length === 0) {
      //   this.GetChildren();
      //   this.$emit("SetcreatedOrg");
      // }
      // var auto = this.autosearchorg[this.org.pointer];
      // var result = auto.findIndex(
      //   (element) => element.shortname === this.item.shortname
      // );
      // if (result !== -1) {
      //   this.$emit("OpenFolder");
      //   this.clicked = true;
      // }
    // },
  },
  methods: {
    OrgDataAdd(item){
      this.$emit("OrgDataAdd",item);
    },
    OrgDataDelete() {
      this.$store.commit("OrgDataDelete", {
        data: this.item,
        pointer: this.org.pointer,
      });
    },
    OpenFolder() {
      this.$emit("OpenFolder");
      this.isOpen = true;
    },
    toggle() {
      if (this.item.kinds == "Department" && this.children.length === 0) {
        this.GetChildren();
      }
      this.isOpen = !this.isOpen;
    },
    async GetChildren() {
      this.children = await this.$store.dispatch("Org", this.item);
    },
    ModalOff() {
      this.$emit("setModalOff");
    },
    MailOrgData() {
      // if(this.item.kinds=="Person"){
        this.$emit("OrgDataAdd",this.item);
      // }
      // if (!this.clicked) {
      //   this.clicked = true;
      //   // this.$forceUpdate();

      //   this.$store.commit("OrgData", this.item);
      // } else if (this.clicked) {
      //   this.clicked = false;
      //   // this.$forceUpdate();
      //   this.$store.commit("OrgDataDelete", {
      //     data: this.item,
      //     pointer: this.org.pointer,
      //   });
      // }

      // this.$store.commit("SearchOrgInit");
      // this.$emit("setModalOff");
      // this.clicked = true;
    },
    Or_bg() {
      if (this.item.kinds == "Person") {
        this.clicked = true;
      }
    },
  },
};
</script>


<style>
</style>