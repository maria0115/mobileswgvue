<template>
  <li :class="{ drop_menu: this.isFolder > 0 }">
    <a @click="toggle" :class="{ on: this.isOpen }">{{ item.nodetitle.ko }}</a>
    <ul v-if="isFolder" :style="{ display: this.isBlock }">
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
    async toggle() {
      if (this.isFolder > 0) {
        this.isOpen = !this.isOpen;
      } else {
        const result = await this.$store.dispatch("mailjs/MailMove", {
          viewname: this.item.nodetitle.ko,
          folderId: this.item.mycode,
        });

        if (result) {
          this.$store.commit(
            "mailjs/MailCustomFolderTitle",
            this.item.nodetitle.ko
          );
          this.$router.replace({
            name: "Custom",
            params: { folderId: this.item.mycode },
          });
        }
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