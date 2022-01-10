import config from "@/config/config.json";
import option from "@/config/option.json";
import { mapState, mapGetters } from "vuex";
import Body from "@/components/common/body.vue"
export default {
    components:{
        Body
    },
    computed: {
        ...mapGetters(["GetAppL", "GetMConfigL", "GetBoardL", "GetBookL", "GetScheduleL", "GetCommonL"]),

    },
    methods: {
        openDownload(url) {
            // location.href = url;
            window.open(url, 'Download');  
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
        Option(){
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