<template>
  <ul v-if="attach" :class="className">
    <li
      v-for="(value, index) in attaInfo"
      :key="index"
      class="active"
      @click="openDownload(value)"
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
  <div v-else></div>
</template>

<script>
// 여긴 뷰어
export default {
  props: ["attaInfo", "attach", "className","unid"],
  methods: {
    openDownload(value) {
      // url = window.location.origin + url;
      // location.href = "https://gwmobile.krb.co.kr"+url
      console.log(value)
      value.unid = this.unid;
      // return;
      var data = {};
      data.fileType = "URL";
      data.filePath = value.url||value.openurl;
      data.fid = this.generateRandomCode(10);
      data.kind = "synap";
      data.accessCookieData = btoa(`{"LtpaToken":"${this.getToKen()}"}`);
      this.$store.dispatch("editorJsonPost", data).then((res) => {
        if (res.key) {
          var goto = `${window.location.origin}/mobile_index/viewer`;
          if (!this.isMobile()) {
            location.href = `${goto}?url=${value.url}&token=${encodeURIComponent(this.getToKen())}`;
          } else {
            location.href = `m60call://browser?urladdress=${goto}?url=${value.url}&token=${this.getToKen()}`;
          }
        }
      });
    },
  },
};
</script>

<style>
</style>