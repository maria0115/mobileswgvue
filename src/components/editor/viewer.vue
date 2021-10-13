<template>
<!-- 첨부파일 -->
  <ul v-if="attach" :class="className">
    <li
      v-for="(value, index) in attaInfo"
      :key="index"
      @click="download(value)"
      class="active"
    >
      <span
        ><img :src="`../../mobile/img/icon_${fileImg(value.name)}.png`" alt=""
      /></span>
      <div>
        <p>{{ value.name }}</p>
        <em>({{ value.size }})</em>
      </div>
    </li>

    <form id="uFOCS_AF" action="" method="post">
      <input type="hidden" name="filepath" value="" />
      <input type="hidden" name="filename" value="" />
      <input type="hidden" name="fileext" value="" />
      <input type="hidden" name="viewerselect" value="image" />
      <input type="hidden" name="LtpaToken" value="" />
      <input type="hidden" name="streamtype" value="" />
    </form>
  </ul>
  <!-- 원문보기 -->
  <span v-else @click="goOriginView(attaInfo)">111111111111111111111111</span>
</template>

<script>
import configjson from "../../config/config.json";

export default {
  props: ["attaInfo", "attach","className"],
  methods: {
    getMobileView({ surl, sname, sext }) {
      var objEzX = document.getElementById("uFOCS_AF");
      //  var stime = new Date();
      //  stime = stime.getTime();
      objEzX.filepath.value = surl;
      objEzX.filename.value = sname;
      objEzX.fileext.value = sext;

      // cookie에서 LtpaToken 값 가져오기
      var cookieArr = document.cookie.split(";");
      for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].indexOf("LtpaToken") > -1) {
              var find = cookieArr[i].split("=");
              objEzX.LtpaToken.value = find[1];
          }
      }

      if (sext == "html") {
        objEzX.streamtype.value = "capture";
      }

      objEzX.action = "http://125.7.235.220:81/DG_viewer/viewer/document/docviewer.do/";
      objEzX.target = "_self";
      objEzX.submit();
    },
    download(value) {
      var convertUrl = this.getUrl(value.url);
      var fileExt = value.name.substring(value.name.lastIndexOf(".") + 1, value.name.length).toLowerCase();
      this.getMobileView({surl: convertUrl, sname: value.name, sext: fileExt});
    },
    goOriginView(value) {
      var convertUrl = this.getUrl(value.url);
      this.getMobileView({surl: convertUrl, sname: "value.name", sext: "html"});
    },
    getUrl(url) {
      var port = window.location.port;
      if (
        typeof port == "undefined" ||
        typeof port == undefined ||
        port == null ||
        port == ""
      ) {
        port = "";
      } else {
        port = ":" + port;
      }
      return `http://${window.location.hostname + port + encodeURI(url)}`;
    },
    getExtensionOfFilename(filename) {
      var _fileLen = filename.length;
      var _lastDot = filename.lastIndexOf(".");
      var _fileExt = filename.substring(_lastDot + 1, _fileLen).toLowerCase();

      return _fileExt;
    },
    fileImg(name) {
      var dot = this.getExtensionOfFilename(name);

      if (configjson.extension.indexOf(dot) !== -1) {
        return dot;
      }
      return "etc";
    },
  },
};
</script>

<style>
</style>