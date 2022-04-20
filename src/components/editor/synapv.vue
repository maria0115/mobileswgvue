<template>
  <ul v-if="attach" :class="className">
    <li v-for="(value, index) in attaInfo" :key="index" class="active">
      <div
        :class="{ vip_sib: GetMyInfo.info.vip }"
        @click="openDownload(value)"
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
        @click="openDownload(value, true)"
      ></span>
    </li>
  </ul>
  <div v-else></div>
</template>

<script>
// 여긴 뷰어
import { jsonPost } from "@/api/editor.js";
import { mapGetters } from "vuex";
export default {
  props: ["attaInfo", "attach", "className", "unid", "vip"],
  computed: {
    ...mapGetters("mainjs", ["GetMyInfo"]),
  },
  methods: {
    async openDownload(value, vip) {
      // url = window.location.origin + url;
      // location.href = "https://gwmobile.krb.co.kr"+url
      value.unid = this.unid;
      // return;
      var data = {};
      data.fileType = "URL";

      var filepath = value.url || value.openurl;
      data.filePath = filepath;

      if (!this.attach) {
        data.filePath = this.Config().originPage + filepath + "&fullscroll=1";
      } else if (this.Option().drm) {
        value.url = filepath;
        value.kind = "drm";
        var result = await this.drmDec(value);

        if (!(result.status == 200 && result.data.decpath)) {
          alert("복호화 실패 조치예정 중");
          return;
        }

        if (result.data.code == "1000") {
          data.filePath = decodeURIComponent(result.data.decpath);
        } else if (result.data.code == "1100") {
          alert("복호화 실패 조치예정 중");
          return;
        } else if (result.data.code == "1300" || result.data.code == "1400") {
          alert("문서가 없습니다.");
          return;
        } else if (result.data.code == "9000") {
          alert("복호화 실패 조치예정 중");
          return;
        }
        if (vip) {
          this.go(decodeURIComponent(result.data.decpath));
          return;
        }
        data.attach = true;
      }
      data.fid = this.generateRandomCode(10);
      data.kind = "synap";
      // var info = JSON.parse(
      //   localStorage.getItem(`${this.Config().packageName}deviceInformation`)
      // );
      data.accessCookieData = btoa(`{"LtpaToken":"${this.getToKen()}"}`);
      this.call(data);
    },

    drmDec(data) {
      return jsonPost(data)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          return false;
        });
    },
  },
};
</script>

<style>
</style>