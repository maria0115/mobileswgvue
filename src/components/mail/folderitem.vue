<template>
  <li :class="{ drop_menu: this.isFolder>0 }">
    <a @click="toggle" @dblclick="makeFolder" :class="{ on: this.isOpen }">{{ item.nodetitle.ko }}</a>
    <ul
      v-if="isFolder"
      
      :style="{ display: this.isBlock }"
    >
      <folder-item
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        @make-folder="$emit('make-folder', $event)"
        @add-item="$emit('add-item', $event)"
      ></folder-item>
    </ul>
  </li> 
</template>

<script>
export default {
  name: "FolderItem",
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
    isBlock: function () {
      if (this.isOpen) {
        return "block";
      }
      return "";

      // }
    },
    isFolder: function () {
      return this.item.children.length;

      // }
    },
  },
  methods: {
    toggle: function () {
      if (this.isFolder > 0) {
        this.isOpen = !this.isOpen;
      }else{
        console.log("여기로 이동해야지",this.item)
        this.$store.dispatch("MailMove", { viewname:this.item.nodetitle.ko,folderId: this.item.mycode});
      }
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