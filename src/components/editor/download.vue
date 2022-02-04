<template>
  <ul v-if="attach" :class="className">
    <li
      v-for="(value, index) in attaInfo"
      :key="index"
      class="active"
      @click="openDownload(value.url)"
    >
      <span
        ><img :src="`../../mobile/img/icon_${fileImg(value.name)}.png`" alt=""
      /></span>
      <div>
        <!-- <a :href="value.url" download> -->
        <p>{{ value.name }}</p>
        <em v-if="value.size">({{ value.size }})</em>
        <!-- </a> -->
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["attaInfo", "attach", "className"],
  methods: {
    openDownload(url) {
      var goto = `${window.location.origin}/mobile_index/viewer`;
      if (!this.isMobile()) {
        location.href = `${goto}?url=${url}&token=${encodeURIComponent(
          this.getToKen()
        )}`;
      } else {
        location.href = `m60call://browser?urladdress=${goto}?url=${url}&token=${this.getToKen()}`;
      }
    },
  },
};
</script>

<style>
</style>