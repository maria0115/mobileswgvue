import config from "@/config/config.json";
import option from "@/config/option.json";
import { mapState, mapGetters } from "vuex";
import cookie from 'vue-cookies';

import Body from "@/components/common/body.vue"
import Viewer from "@/components/common/viewer.vue"
import Date from "@/components/common/date.vue"
import Time from "@/components/common/time.vue"
import ATime from "@/components/common/Atime.vue"
import { FormTagsPlugin } from "bootstrap-vue";
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
        Viewer,
        Time,
        Date,
        ATime
    },
    computed: {
        ...mapState("mailjs", ["from"]),
        ...mapGetters("mailjs", ["GetMailDetail"]),
        ...mapGetters(["GetAppL", "GetMConfigL", "GetBoardL", "GetBookL", "GetScheduleL", "GetCommonL"]),

    },
    methods: {
        getMe() {
            setTimeout(() => {
                var scrollentity = $(".organlist");
                scrollentity.animate(
                    { scrollTop: document.querySelectorAll(".meme")[0].offsetTop - 100 },
                    0
                );
            }, 1);
        },
        addScript() {
            let scripts = [
                // "../../mobile/synap/synapeditor.config.js",
                "../../mobile/synap/synapeditor.min.js",
                //   "../../mobile/synap/plugins/shapeEditor/shapeEditor.min.js",
                //   "../../mobile/synap/plugins/personalDataProtection/personalDataProtection.min.js",
                //   "../../mobile/synap/plugins/characterPicker/characterPicker.min.js",
                //   "../../mobile/synap/plugins/webAccessibilityChecker/webAccessibilityChecker.min.js",
                //   "../../mobile/synap/plugins/tuiImageEditor/tuiImageEditor.min.js",
                //   "../../mobile/synap/plugins/horizontalLineExtension/horizontalLineExtension.min.js",
                //   "../../mobile/synap/plugins/quoteExtension/quoteExtension.min.js",
                //   "../../mobile/synap/externals/formulaParser/formula-parser.min.js",
                // "../../mobile/synap/externals/SEDocModelParser/SEDocModelParser.min.js",
                //   "../../mobile/synap/externals/SEShapeManager/SEShapeManager.min.js",
                // "../../mobile/synap/externals/codeMirror/codemirror.min.js",
                // "../../mobile/synap/externals/codeMirror/xml.min.js",
            ];
            for (let i = 0, len = scripts.length; i < len; i++) {
                let script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", scripts[i]);
                script.async = true;
                script.defer = true;
                document.getElementsByTagName("body")[0].appendChild(script);
            }
        },
        async getUrlBody() {
            if (this.Config().env == "dev") {
                this.Body_Text = this.Option().host + this.Body_Text;
            }
            this.Body_Text = await this.$store.dispatch(
                "getUrlBody",
                this.Body_Text
            );
            this.$forceUpdate();
            return;
        },
        isOpenFiled(url) {
            return url.toLowerCase().indexOf("openfield") !== -1 || this.bodyurl;
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
        IS(service) {
            if (!service) {
                return { display: "none" };
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
        getLanguage(app) {
            this.$store.dispatch("GetLanguage", { app });
        },
        brReplace(value) {
            return this.replaceAll(value, "<br>", " ");
        },
        replaceAll(str, searchStr, replaceStr) {
            return str.split(searchStr).join(replaceStr);
        },
        etcLogo() {
            if (this.Config().company == "ace") {
                return "https://gw.ace-group.co.kr/dwplibs/images/login/login_logo.png";
            }
            return "";
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
        isA() {
            // var IorA = navigator.userAgent.toLowerCase();

            // if (IorA.indexOf("android") !== -1) {
            //     return true;
            // }
            // return false;
            return /android|webos|blackberry|iemobile|opera mini/i.test((navigator.userAgent || navigator.vendor || window.opera).toLowerCase());
        },
        isI() {
            // var IorA = navigator.userAgent || navigator.vendor || window.opera.toLowerCase();

            // if(IorA.indexOf("iphone") !== -1){
            //     return true;
            // }
            // return false;
            return /iphone|ipad|ipod/i.test((navigator.userAgent || navigator.vendor || window.opera).toLowerCase());
        },
        isApp() {
            var device = JSON.parse(
                localStorage.getItem(`${this.Config().packageName}deviceInformation`)
            );
            if (device && device.deviceId && device.deviceId.length > 0) {
                return true;
            }
            return false;
        },
        strLeft(str, sKey, ContainsKey) {
            if (!ContainsKey) ContainsKey = false;

            var nIndex;
            var sRet = "";

            nIndex = str.indexOf(sKey);

            if (nIndex != -1) {
                sRet = str.substr(0, nIndex);
                if (ContainsKey) sRet += sKey;
            }
            return sRet;
        },
        strRight(str, sKey, ContainsKey) {
            if (!ContainsKey) ContainsKey = false;

            var nIndex;
            var sRet = "";

            nIndex = str.indexOf(sKey);
            if (nIndex != -1) {
                if (ContainsKey) {
                    sRet = str.substr(nIndex, str.length);
                } else {
                    sRet = str.substr(nIndex + sKey.length, str.length);
                }
            }
            return sRet;
        },
        languageConverter(val, language, separator1, separator2) {
            if (typeof val == "string") {
                // val = ko:박광순,en:Park Gwangsun
                var valArr = val.split(separator1); //["ko:박광순","en:Park Gwangsun"]
                var obj = {};
                var key, val, keyVal = "";
                for (var langIndex = 0; langIndex < valArr.length; langIndex++) {
                    keyVal = valArr[langIndex];  //ko:박광순
                    key = this.strLeft(keyVal, separator2); //ko
                    val = this.strRight(keyVal, separator2); //박광순
                    obj[key] = val; // {"ko":"박광순","en":"Park Gwangsun"}
                }
            }
            return obj[language];
        },
        nowLang() {
            var device = JSON.parse(
                localStorage.getItem(`${this.Config().packageName}deviceInformation`)
            );
            return device.strLocale;
        },
        generateRandomCode(n) {
            let str = "";
            for (let i = 0; i < n; i++) {
                str += Math.floor(Math.random() * 10);
            }
            return str;
        },
        setViewPort(content) {
            var meta = document.createElement("meta");
            meta.name = "viewport";
            meta.content = content;
            document.getElementsByTagName("head")[0].appendChild(meta);
        },
        async getSrcUrl(url) {
            if (url.length !== 0) {
                // params.search || 
                if (this.Option().viewer == "origin") {
                    return url;
                } else if (this.Option().viewer == "synap") {
                    // 첨부변환서버 원문보기
                    var data = {};
                    data.fileType = "URL";
                    data.filePath = decodeURIComponent(url);
                    data.fid = this.generateRandomCode(10);
                    data.kind = "synap";
                    data.accessCookieData = btoa(`{"LtpaToken":"${this.getToKen()}"}`);
                    return await this.callUrl(data);
                }
            }
        },
        async callUrl(data) {
            var result = await this.$store.dispatch("editorJsonPost", data)

            if (result.key) {
                return (result.viewUrlPath);
            }
        },
        call(data) {
            this.$store.dispatch("editorJsonPost", data).then((res) => {
                if (res.key) {
                    this.go(res.viewUrlPath)
                }
            });
        },
        go(url) {
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
        OriginView(params) {
            // node 원문보기
            if (params.url.length !== 0) {
                // params.search || 
                if (params.search || this.Option().viewer == "origin" || (this.detail && this.detail.isMig)) {
                    if (params.search) {
                        var filepath = params.url || params.openurl;
                        params.url = decodeURIComponent(filepath + "&fullscroll=1");
                        if (params.category !== "approval") {
                            params.url = this.Config().originPage + params.url;
                        }
                    }
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
                    if (params.search) {
                        var data = {};
                        data.fileType = "URL";

                        var filepath = params.url || params.openurl;
                        data.filePath = decodeURIComponent(filepath + "&fullscroll=1");
                        // if (params.category == "approval") {
                        if (params.category !== "approval") {
                            params.url = this.Config().originPage + data.filePath;
                        }
                        // } else {
                        //     data.filePath = data.filePath;
                        // }
                        data.fid = this.generateRandomCode(10);
                        data.kind = "synap";
                        data.accessCookieData = btoa(`{"LtpaToken":"${this.getToKen()}"}`);
                        this.call(data);

                    } else {
                        this.$refs.viewer.$refs.editor.openDownload({ unid: params.unid, url: this.detail.openurl });
                    }
                }
            }
        },
        host() {
            var host = "";
            if (window.origin.indexOf("localhost") !== -1) {
                host = this.Option().host;
            }
            return host;
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
        folSet(value) {
            var data = {};
            this.$emit("isnClick");
            data.use = !value.followup;
            data.date = "2000-00-00";
            data.unid = value.unid;
            data.time = `00:00:00`;
            // data.body = this.editor.getHTML();
            data.body = "";

            this.$store.dispatch("mailjs/FollowupSet", data);

        },
    }
}