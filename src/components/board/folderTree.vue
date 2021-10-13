<template>
  <li>
    <h3>
      <router-link
        :to="{
          name: `boardlist`,
          query: {data:JSON.stringify({
            lnbid: item.lnbid,
            type: item.type,
            title: item.title,
          })},
        }"
        >{{ item.title }}</router-link
      >
    </h3>
    <div @click="toggle">열기</div>
    <ul v-if="isFolder" :style="{ display: this.isBlock }">
      <tree-item
        v-for="(child, index) in children"
        :key="index"
        :item="child"
        @make-folder="$emit('make-folder', $event)"
        @add-item="$emit('add-item', $event)"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: "TreeItem",
  created() {
    console.log(this.item);
  },
  props: {
    item: Object,
  },
  data: function () {
    return {
      isOpen: false,
      children: [],
    };
  },
  computed: {
    isFolder: function () {
      this.children = this.children || [];
      return this.children.length;
    },
    isBlock: function () {
      if (this.isOpen) {
        return "block";
      }
      return "";
    },
  },
  methods: {
    async toggle() {
      // if (this.isFolder > 0) {
      this.isOpen = !this.isOpen;
      // } else {
      if (this.isOpen && this.children.length == 0) {
        this.children = await this.$store.dispatch(
          "CategoryList",
          this.item.lnbid
        );
      }
      // }
    },
    makeFolder: function () {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    },
  },
};
</script>


<style>
</style>