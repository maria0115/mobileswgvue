<template>
  <!-- @mousedown="Or_bg"
    @touchstart="Or_bg" -->
  <li
    :class="[
      { or_bg: lastClass },
      { a_last_deps: lastClass },
      { o_depth02: !lastClass },
      { active: isSelect },
      { meme: this.me },
    ]"
  >
    <div>
      <b @click="toggle" :class="{ on: this.isOpen }"></b>
      <span @click="MailOrgData"
        >{{ item.name }}
        <em v-if="this.item.kinds == 'Person'" class="tel">{{
          item.office
        }}</em></span
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
        :appDept="appDept"
        :appPath="appPath"
        @PickItem="GetItem"
        @DelPickItem="DelItem"
        :modalon="modalon"
      ></org-item>
    </ul>
  </li>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "OrgItem",
  async created() {
    if (this.modalon) {
      this.Setting();
    }
  },
  props: {
    item: Object,
    modalAutoOrg: Number,
    createdOrg: Boolean,
    appDept: String,
    appPath: Array,
    modalon: Boolean,
  },
  data: function () {
    return {
      isOpen: false,
      children: [],
      click: false,
      clicked: false,
      me: false,
    };
  },
  computed: {
    ...mapState(["autosearchorg", "org"]),
    ...mapGetters("mainjs", ["GetMyInfo"]),

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
      // var here = this;
      // var result = this.appPath.findIndex(function (itemone, idx) {
      //   return itemone.approvalInfo.email == here.item.email;
      // });
      // if (this.clicked) {
      //   return true;
      // } else {
      //   if (result !== -1) {
      //     return false;
      //   }
      // }
      return false;
    },
  },
  watch: {
    async modalAutoOrg() {
      if (this.modalon) {
        this.Setting();
      }
    },
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
    Setting() {
      var full = this.GetMyInfo.info.fullOrgCode;
      var pathidx = full.findIndex((item) => {
        return item == this.item.mycode;
      });
      if (
        this.item.kinds == "Department" &&
        this.children.length === 0 &&
        pathidx !== -1
      ) {
        this.GetChildren();
        this.OpenFolder();
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
      var meidx = this.children.findIndex((item) => {
        return item.notesId == this.GetMyInfo.info.notesid;
      });
      if (meidx !== -1) {
        this.me = true;
        this.getMeapp();
      }
    },
    getMeapp() {
      setTimeout(() => {
        var scrollentity = $(".a_organlist");
        scrollentity.animate(
          { scrollTop: document.querySelectorAll(".meme")[0].offsetTop - 100 },
          0
        );
      }, 1);
    },
    MailOrgData() {
      if (this.item.kinds == "Person") {
        this.$emit("PickItem", this.item);
      }
      // if (this.item.kinds == "Person" && !this.clicked) {
      //   this.clicked = true;

      //   this.$emit("PickItem", this.item);
      // } else if (this.item.kinds == "Person" && this.clicked) {
      //   this.clicked = false;
      //   this.$emit("DelPickItem", this.item);
      // }
    },
    Or_bg() {
      if (this.item.kinds == "Person") {
        // this.clicked = true;
      }
    },
    GetItem(item) {
      this.$emit("PickItem", item);
    },
    DelItem(item) {
      this.$emit("DelPickItem", item);
    },
  },
};
</script>


<style>
</style>