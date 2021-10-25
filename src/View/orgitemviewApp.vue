<template>
  <li
    @mousedown="Or_bg"
    @touchstart="Or_bg"
    :class="[
      { or_bg: lastClass },
      { a_last_deps: lastClass },
      { o_depth02: !lastClass },
      { active: this.clicked },
    ]"
  >
    <div >
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
        @PickItem="GetItem"
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
    appDept:String
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
    ...mapState(["autosearchorg","org"]),
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
    async modalAutoOrg() {
      if (this.item.kinds == "Department" && this.children.length === 0) {
        this.GetChildren();
        this.$emit("SetcreatedOrg");
      }
      var auto = this.autosearchorg[this.org.pointer];
      var result = auto.findIndex(
        (element) => element.shortname === this.item.shortname
      );
      if (result !== -1) {
        this.$emit("OpenFolder");
        this.clicked = true;
      }
    },
  },
  methods: {
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
    MailOrgData() {
      if (this.item.kinds == "Person") {
        this.$emit("PickItem",this.item);
      }
      // this.$store.commit("SearchOrgInit");
      this.clicked = false;
    },
    Or_bg() {
      if (this.item.kinds == "Person") {
        this.clicked = true;
      }
    },
    GetItem(item) {
      this.$emit("PickItem",item);
    },
  },
};
</script>


<style>
</style>