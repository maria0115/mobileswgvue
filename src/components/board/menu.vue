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
      <ul>
        <li v-for="(key) in Object.keys(GetBoard)" :key="key">
          <h3><router-link :to="`/board_more/${key}`">{{key}}</router-link></h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    isOpen: Boolean,
  },
  methods: {
    Path(){
      this.$store.commit("boardjs/BoardWritePath",this.path);
    },
    CloseHam() {
      this.$emit("CloseHam");
    },
    // 기본이미지 랜덤 색
    randomColor() {
      const color = ["#bcbbdd", "#bbcbdd", "#bbddd7", "#d0d0d0"];
      return `background: ${color[Math.floor(Math.random() * 4)]}`;
    },
  },
  computed: {
    ...mapGetters("mainjs",["GetMyInfo"]),
    ...mapGetters("boardjs",["GetBoard" ]),
  },
};
</script>

<style>
</style>