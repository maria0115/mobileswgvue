<template>
  <ul v-if="attach" :class="className">
    <li
      v-for="(value, index) in attaInfo"
      :key="index"
      class="active"
      @click="openDownload(value.url)"
    >
      <div
        :class="{ vip_sib: GetMyInfo.info.vip }"
        @click="openDownload(value.url)"
      >
        <span
          ><img
            :src="`../../mobile/img/icon_${fileImg(value.name)}.png`"
            alt=""
        /></span>
        <div>
          <!-- <a :href="value.url" download> -->
          <p>{{ value.name }}</p>
          <em v-if="value.size">({{ value.size }})</em>
          <!-- </a> -->
        </div>
      </div>
      <span
        :class="{ vip: GetMyInfo.info.vip }"
        @click="openDownload(value.url, true)"
      ></span>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["attaInfo", "attach", "className"],
  created(){
  },
  computed: {
    ...mapGetters("mainjs", ["GetMyInfo"]),
  },
  methods: {
    openDownload(url) {
      var goto = `${window.location.origin}/mobile_index/viewer`;
      var setToken = this.replaceAll(this.getToKen(), "+", "$SIS$");
      if (this.isApp()) {
        location.href = `m60call://browser?urladdress=${goto}?url=${encodeURIComponent(
          url
        )}&token=${encodeURIComponent(setToken)}`;
      } else {
        location.href = `${goto}?url=${encodeURIComponent(
          url
        )}&token=${encodeURIComponent(setToken)}`;
      }
    },
  },
};
</script>

<style>
</style>