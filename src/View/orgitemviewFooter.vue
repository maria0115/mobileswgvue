<template>
  <li
    @mousedown="Or_bg"
    @touchstart="Or_bg"
    :class="[
      { or_bg: lastClass },
      { last_deps: lastClass },
      { o_depth02: !lastClass },
      { active: this.clicked },
    ]"
  >
    <div @click="onCard">
      <b @click="toggle" :class="{ on: this.isOpen }"></b>
      <span
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
        @OpenCard="OpenCard"
      ></org-item>
    </ul>
  </li>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "OrgItem",
  async created() {
    // item이 person이아니고 department면 무조건
    // child 뽑기
    var full = this.GetMyInfo.info.fullOrgCode;
    var pathidx = full.findIndex((item) => {
      return item == this.item.mycode;
    });
    if (pathidx !== -1) {
      this.GetChildren();
      this.OpenFolder();
    }
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
    OpenCard(i) {
      this.$emit("OpenCard", i);
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
    //   this.GetMyInfo.info.fullOrgCode;
    // var pathidx = full.findIndex((item) => {
    //   return item == this.item.mycode;
      this.children = await this.$store.dispatch("Org", this.item);
    var full = this.GetMyInfo.info.fullOrgCode;
    if(full[full.length-1] == this.item.mycode){
      var meidx = this.children.findIndex(item=>{
        return item.notesId==this.GetMyInfo.info.notesid;
      })
      if(meidx!==-1){
        this.$store.commit("mainjs/MyInfoMaster",this.children[meidx]);

      }

    }
    },
    onCard() {
      if (this.item.kinds == "Person") {
        this.$emit("OpenCard", this.item);
        this.clicked = false;
      }
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