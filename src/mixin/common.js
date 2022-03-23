import config from "@/config/config.json";
import option from "@/config/option.json";
import { mapState, mapGetters } from "vuex";
import cookie from 'vue-cookies';

import Body from "@/components/common/body.vue"
import Viewer from "@/components/common/viewer.vue"
export default {
    beforeDestroy() {
        clearTimeout(this.timeout);
    },
    data() {
        return {
            timeout: null
        }
    },
    components: {
        Body,
        Viewer
    },
    computed: {
        ...mapState("mailjs", ["from"]),
        ...mapGetters("mailjs", ["GetMailDetail"]),
        ...mapGetters(["GetAppL", "GetMConfigL", "GetBoardL", "GetBookL", "GetScheduleL", "GetCommonL"]),

    },
    methods: {
        async urlBody() {
            this.Body = this.body;
            if (
                this.from === "Relay" ||
                this.from === "AllReply" ||
                this.from === "Reply" ||
                this.isDraftEdit()
            ) {
                if (this.body && this.body.length > 0) {
                    this.Body = await this.$store.dispatch(
                        "mailjs/GetBody",
                        this.GetMailDetail
                    );
                    return;
                } else {
                    this.Body = "";
                    return;
                }
            }
            return;
        },
        /*
 * path : 전송 URL
 * params : 전송 데이터 {'q':'a','s':'b','c':'d'...}으로 묶어서 배열 입력
 * method : 전송 방식(생략가능)
 */
        XMLReq() {
            var oReq = new XMLHttpRequest();
            oReq.open("GET", "PATHTO");
            oReq.setRequestHeader('ExtraInfo', 28473432894789238473293874329);
            oReq.send();
        },
        IS(service){
            if(!service){
              return {display:"none"};
            }
            return {};
          },
        post_to_url(path, params, method) {
            // var xhr = new XMLHttpRequest();
            // path="/test.html";
            method = method || "post";

            var ff = document.createElement('form');
            ff.setAttribute("method", "POST");
            ff.setAttribute("action", path);
            for (var key in params) {
                // form.append(key, params[key]);
                var in1 = document.createElement('input');
                in1.setAttribute("type", "hidden");
                in1.setAttribute("name", key);
                in1.setAttribute("value", params[key]);
                ff.appendChild(in1);
            }

            // ff.enctype = 'multipart/form-data';
            // ff.method = method;
            // ff.action = path;
            document.body.appendChild(ff);

            ff.submit();
            return;
            // var fd = new FormData(ff);
            // fd.append('subject', "subject222222");
            // xhr.onreadystatechange = this.cb;
            // xhr.open('GET', path, false);

            try {
                xhr.send();
                if (xhr.status != 200) {
                    alert(`Error ${xhr.status}: ${xhr.statusText}`);
                } else {
                    alert(xhr.response);
                }
            } catch (err) { // instead of onerror
                alert("Request failed");
            }
            return;
            method = method || "post";
            var xhr = new XMLHttpRequest();
            var ff = document.createElement('form');
            for (var key in params) {
                // form.append(key, params[key]);
                var in1 = document.createElement('input');
                in1.name = key;
                in1.value = params[key];
                ff.appendChild(in1);
            }

            ff.enctype = 'multipart/form-data';
            ff.method = method;
            ff.action = path;
            var fd = new FormData(ff);
            fd.append('subject', "subject222222");
            xhr.onreadystatechange = this.cb;
            xhr.open(method, path, true);
            xhr.send(fd);




            // var xhr = new XMLHttpRequest();
            // method = method || "post";
            // // var form = document.createElement("form");
            // var form = new FormData();
            // form.enctype = 'multipart/form-data';
            // form.method = 'post';
            // form.action = path;
            // // var fd = new FormData(form);
            // for (var key in params) {
            //     form.append(key, params[key]);
            // }
            // console.log(path, params, method, form)
            // xhr.setRequestHeader("Content-Type", "multipart/form-data");
            // xhr.open('post', path, true);
            // xhr.send(form);
        },
        replaceAll(str, searchStr, replaceStr) {
            return str.split(searchStr).join(replaceStr);
        },
        cb(e) {
            console.log(e);
        },
        getToKen() {
            return cookie.get("LtpaToken");
        },
        isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        isApp() {
            var device = JSON.parse(
                localStorage.getItem(`${this.Config().packageName}deviceInformation`)
            );
            if (device.deviceId && device.deviceId.length > 0) {
                return true;
            }
            return false;
        },
        generateRandomCode(n) {
            let str = "";
            for (let i = 0; i < n; i++) {
                str += Math.floor(Math.random() * 10);
            }
            return str;
        },
        OriginView(params) {
            // node 원문보기
            if (params.url.length !== 0) {
                if (this.Option().viewer == "origin"||this.detail.isMig) {
                    this.$router.push({
                        name: "originalPage",
                        params,
                    });
                } else if (this.Option().viewer == "sat") {
                    // 첨부변환서버 원문보기
                    this.$refs.viewer.$refs.editor.goOriginView({
                        url: this.detail.openurl,
                        name: this.detail.subject,
                    });
                } else if (this.Option().viewer == "synap") {
                    // 첨부변환서버 원문보기
                    this.$refs.viewer.$refs.editor.openDownload({ unid: params.unid, url: this.detail.openurl });
                }
            }
        },
        fileImg(name) {
            var dot = this.getExtensionOfFilename(name);

            if (config.extension.indexOf(dot) !== -1) {
                return dot;
            }
            return "etc";
        },
        getExtensionOfFilename(filename) {
            var _fileLen = filename.length;
            var _lastDot = filename.lastIndexOf(".");
            var _fileExt = filename.substring(_lastDot + 1, _fileLen).toLowerCase();

            return _fileExt;
        },
        menuOfIdx({ menu, categorys, type }) {
            if (categorys) {
                return categorys.findIndex(function (item, idx) {
                    return item[type] == menu;
                });
            }
            return -1;
        },
        CategoryChoice({ menu, categorys, type }) {
            if (categorys) {
                return categorys[this.menuOfIdx({ menu, categorys, type })];
            }
            return [];
        },
        appInit() {
            this.page = 0;
            this.option = {};
            this.option.page = this.page;
            this.$route.name == "approvalfirst" ? this.option.type = "approve" : this.option.type = this.$route.name.substr(3);
            this.option.size = this.GetConfig.listcount;
            this.infiniteId += 1;
            return;
        },
        infiniteInit() {
            this.page = 0;
            this.infiniteId += 1;
        },
        Config() {
            return config;
        },
        Option() {
            return option[config.company];
        },
        setPullTo() {
            var here = this;
            PullToRefresh.init({
                mainElement: ".formdiv",
                instructionsPullToRefresh: here.GetCommonL.pullDownRe,
                instructionsReleaseToRefresh: here.GetCommonL.releaseRe,
                instructionsRefreshing: here.GetCommonL.refresh,
                refreshTimeout: 200,
                onRefresh: function () {
                    here.Refresh();
                },
            });
        },
        fill(width, number) {
            number = number + ""; //number를 문자열로 변환하는 작업
            var str = "";
            for (var i = 0; i < width - number.length; i++) {
                str = str + "0";
            }
            str = str + number;
            return str;
        },
    }
}