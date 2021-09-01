<template>
  <div class="move_file">
    <div class="move_bg"></div>
    <ul class="f_list">
      <li>
        <a @click="moveFolder('$inbox', '/maillist/inbox_detail')">받은 메일</a>
      </li>
      <li>
        <a @click="moveFolder('$trash', '/maillist/mail_trash')">휴지통</a>
      </li>
      <li :class="{ drop_menu: isFolder > 0 }">
        <a @click="toggle">기본 폴더</a>
        <ul class="f_depth02" :style="{ display: this.isBlock }">
          <div
            class="drop_menu"
            v-for="(value, name) in this.mail.data.folderList.data"
            :key="name"
          >
            <folder-item
              :item="value"
              @make-folder="makeFolder"
              @add-item="addItem"
            ></folder-item>
          </div>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import FolderItem from "./folderitem.vue";
export default {
  data: function () {
    return {
      isOpen: false,
    };
  },
  components: {
    FolderItem,
  },
  computed: {
    ...mapState("mailjs",["mail"]),
    isBlock: function () {
      if (this.isOpen) {
        return "block";
      }
      return "";

      // }
    },
    isFolder: function () {
      return this.mail.data.folderList.data.length;
    },
  },
  methods: {
    async moveFolder(folderId, path) {
      console.log(folderId);
      const result = await this.$store.dispatch("mailjs/MailMove", { folderId });
      console.log(result);
      if (result) {
        this.$router.push(path);
      }
    },
    toggle: function () {
      if (this.isFolder > 0) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder: function () {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    },
    makeFolder: function (item) {
      item.children = [];
      this.addItem(item);
    },
    addItem: function (item) {
      item.children.push({
        name: "new stuff",
      });
    },
  },
};
</script>

<style>
</style>