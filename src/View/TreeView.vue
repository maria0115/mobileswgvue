<template>
  <li>
    <h4   :class="{on:isOpen}">
      <a><div @click="go">{{ item.nodetitle.ko }}</div>
        <em @click="toggle" class="down_m" v-if="item.children.length"></em>
      </a>
    </h4>
    <ul v-if="isFolder" :style="{ display: this.isBlock }">
      <tree-item
        v-for="(child, index) in item.children"
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
  created() {},
  props: {
    item: Object,
  },
  data: function () {
    return {
      isOpen: false,
    };
  },
  computed: {
    isFolder: function () {
      return this.item.children.length;
    },
    isBlock: function () {
      if (this.isOpen) {
        return "block";
      }
      return "";
    },
  },
  methods: {
    toggle: function () {
      if (this.isFolder > 0) {
        this.isOpen = !this.isOpen;
      } 
    },
    go(){
      this.customFolder = this.item.mycode;
        this.$store.commit("mailjs/MailCustomFolderTitle", this.item.nodetitle.ko);
        this.$store.commit("mailjs/MailSearchOptionInit");
        this.$router.push({
          name: "custom",
          params: { folderId: this.item.mycode },
        });
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