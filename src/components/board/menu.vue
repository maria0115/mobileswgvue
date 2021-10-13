<template>
  <div class="noti_sub_menu01" :class="{ on: isOpen }">
    <div class="inner01">
      <div class="in_top">
        <div class="clfix">
          <span class="basic_img on">
            <em class="no_img" :style="randomColor()"
              ><b>{{ this.GetMyInfo.info.name.split("")[0] }}</b></em
            >
          </span>
          <dl>
            <dt>
              <em>{{ this.GetMyInfo.info.name }}</em>
              {{ this.GetMyInfo.info.position }}
            </dt>
            <dd>{{ this.GetMyInfo.info.dept }}</dd>
          </dl>
        </div>
        <div class="icons">
          <span class="sub_close" @click="CloseHam"></span>
        </div>
      </div>
      <!-- class="depth02" -->
      <ul>
        <div v-for="(value, index) in GetCategory['main']" :key="index">
          <li v-if="value.category == 'board'">
            <h3>{{ value.title }}
            </h3>
            <div
              v-if="value.category == 'board'"
              @click="OpenFolder(value, index)"
            >
              열기
            </div>
            <ul>
              <li v-for="(v, i) in child(value)" :key="i">
                <router-link
                  :to="{
                    name: `boardlist`,
                    query: {
                      data: JSON.stringify({
                        lnbid: v.lnbid,
                        type: value.type,
                        title: v.title,
                      }),
                    },
                  }"
                  >{{ v.title }}</router-link
                >
              </li>
            </ul>
          </li>
        </div>
        <!-- <FolderTree :item="value" v-if="value.category=='board'"></FolderTree> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import FolderTree from "./folderTree.vue";
export default {
  created() {},
  components: {
    FolderTree,
  },
  props: {
    isOpen: Boolean,
  },
  methods: {
    async OpenFolder(value, index) {
      if (this.GetCategory["main"][index].children.length == 0) {
        this.GetCategory["main"][index].children = await this.$store.dispatch(
          "CategoryList",
          value.lnbid
        );

        this.$forceUpdate();
      }
    },
    Path() {
      this.$store.commit("boardjs/BoardWritePath", this.path);
    },
    CloseHam() {
      this.$emit("CloseHam");
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
    child(item) {
      item.children = item.children || [];

      return item.children;
    },
  },
  computed: {
    ...mapGetters("mainjs", ["GetMyInfo"]),
    ...mapGetters("boardjs", ["GetBoard"]),
    ...mapGetters(["GetCategory"]),
  },
};
</script>

<style>
</style>