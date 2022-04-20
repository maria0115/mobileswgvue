<template>
  <div class="move_file" @click="Close">
    <div class="move_bg"></div>
    <ul class="f_list">
      <li>
        <a @click="moveFolder('$inbox', 'inbox_detail')"
          >{{lang.title}}</a
        >
      </li>
      <li>
        <a @click="moveFolder('$trash', 'mail_trash')">{{lang.trash}}</a>
      </li>
      <li :class="{ drop_menu: isFolder > 0 }">
        <a @click="toggle">{{lang.folder}}</a>
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
  created(){
    this.lang = this.GetMailLanguage.move;
  },
  data: function () {
    return {
      isOpen: false,
    };
  },
  components: {
    FolderItem,
  },
  computed: {
    ...mapState("mailjs", ["mail"]),
    ...mapGetters(["GetMailLanguage"]),
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
    Close(e) {
      var LayerPopup = $(".move_file");
      if (LayerPopup.has(e.target).length === 0) {
        $(".move_file").removeClass("active");
      }
    },
    async moveFolder(folderId, path) {
      const result = await this.$store.dispatch("mailjs/MailMove", {
        folderId,
      });

      if (result) {
        this.$router.push({name:path});
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