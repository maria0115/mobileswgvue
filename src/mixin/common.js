import config from "@/config/config.json";
import option from "@/config/option.json";
import { mapState, mapGetters } from "vuex";
import cookie from 'vue-cookies';

import Body from "@/components/common/body.vue"
import Viewer from "@/components/common/viewer.vue"
export default {
    components: {
        Body,
        Viewer
    },
    computed: {
        ...mapGetters(["GetAppL", "GetMConfigL", "GetBoardL", "GetBookL", "GetScheduleL", "GetCommonL"]),

    },
    methods: {
        getToKen(){
            return cookie.get("LtpaToken");
        },
        isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
                if (this.Option().viewer == "origin") {
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
                }else if (this.Option().viewer == "synap") {
                    // 첨부변환서버 원문보기
                    this.$refs.viewer.$refs.editor.openDownload(this.detail.openurl);
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