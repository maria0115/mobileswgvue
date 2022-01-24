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
  <div v-else></div>
</template>

<script>
// 여긴 뷰어
export default {
  props: ["attaInfo", "attach", "className"],
  methods: {
    openDownload(url) {
      // url = window.location.origin + url;
      // location.href = "https://gwmobile.krb.co.kr"+url
      var data = {};
      data.fileType = "URL";
      data.filePath = url;
      data.fid = this.generateRandomCode(10);
      data.kind = "synap";
      data.accessCookieData = btoa(`{"LtpaToken":"${this.getToKen()}"}`);
      this.$store.dispatch("editorJsonPost", data).then((res) => {
        if (res.key) {
          var goto = `${window.location.origin}/mobile_index/viewer`;
          var href = "";
          this.isMobile()
            ? (href = `m60call://browser?urladdress=${goto}?url=${
                res.viewUrlPath
              }&token=${this.getToKen()}`)
            : (href = `${goto}?url=${
                res.viewUrlPath
              }&token=${this.getToKen()}`);
          location.href = href;
        }
      });
    },
  },
};
</script>

<style>
</style>