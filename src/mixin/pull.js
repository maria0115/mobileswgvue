// import PullTo from "vue-pull-to";

export default {
    components: {
        // PullTo,
    },
    mounted() { },
    data() {
        return {
            load: null,
            isLoading: false,
            settranslateY: "transform: translateY(-100px)",
            TOP_DEFAULT_CONFIG: {
                pullText: "당겨서 새로고침..", // The text is displayed when you pull down
                triggerText: "놓아서 새로고침", // The text that appears when the trigger distance is pulled down
                loadingText: "로드중...", // The text in the load
                doneText: "끝", // Load the finished text
                failText: "실패", // Load failed text
                loadedStayTime: 400, // Time to stay after loading ms
                stayDistance: 50, // Trigger the distance after the refresh
                triggerDistance: 70, // Pull down the trigger to trigger the distance
            },
        };
    },
    methods: {
        refresh(loaded) {
            this.timeout = setTimeout(() => {
                this.Refresh();

                loaded("done");
            }, 1000);
            //   loaded("done");
            // setTimeout(() => {loaded("done")}, 2.0*1000);
            //   fetchDataList().then((res) => {
            //     this.dataList = res.data.dataList;
            //   });
        },
        Change(state) {
            if (state == "pull") {
                this.settranslateY = `transform: translateY(0px)`;
                this.isLoading = true;
            } else if (state == "loaded-done") {
                this.settranslateY = `transform: translateY(-50px)`;

                this.isLoading = false;
            }
        },
    },
}