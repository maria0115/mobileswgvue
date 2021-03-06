import moment from "moment";
let NowTime = {
    data() {
        return {
            descSpeed: 500,
            daysSort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            timeSort: [
                "00:00",
                "01:00",
                "02:00",
                "03:00",
                "04:00",
                "05:00",
                "06:00",
                "07:00",
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00",
                "23:00",
                "24:00",
            ],
            today: 0,
            theDayOfWeek: 0,

            check: false,
            now: 74.88,
            hour: 0,
            calmenu: false,
            thisWeek: [],
            fulldate: "",
            currentYear: 0,
            currentMonth: 0,
            currentDay: 0,
            year: 0,
            month: 0,
        }
    },
    // mounted() {
    //     // anime.js 라이브러리 사용
    //     // main.js에 전역으로 import하였음. (Vue.prototype.$anime = anime)
    //     var scrollentity = $("html,body");
    //     if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
    //         scrollentity = $("html");
    //     }
    //     scrollentity.animate({ scrollTop: this.min }, 500);
    // },
    computed: {
        redate() {
            return this.replaceAll(this.fulldate, ".", "/");
        },
        senddate() {
            return this.replaceAll(this.fulldate, ".", "-");
        },
    },
    methods: {

        GetHoliday() {
            var data = {};
            data.year = this.year;
            data.month = this.fill(2, this.month);
            data.menu = "holiday";

            this.$store.dispatch("calendarjs/Holiday", data);
        },
        setFull() {
            this.fulldate = `${this.year}.${this.fill(2, this.month)}.${this.fill(
                2,
                this.today
            )}`;
        },
        Start(e) {
            this.startX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
            this.check = true;
        },
        End(e) { },
        Move(e) {
            this.nowclientX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
            if (this.nowclientX - this.startX > 100 && this.check) {
                this.MoveChange(-1);
                this.check = false;
            } else if (this.nowclientX - this.startX < -100 && this.check) {
                this.MoveChange(1);
                this.check = false;
            }
            // this.nowclientY = e.touches[0].pageY - e.touches[0].target.offsetTop;
        },
        nowTimeGo() {
            var scrollentity = $("html,body");
            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                scrollentity = $("html");
            }
            scrollentity.animate({ scrollTop: this.min }, this.descSpeed);
        },
        CalMenu() {
            this.calmenu = true;
        },
        CalMenuOff() {
            this.calmenu = false;
        },
        timeStyle(value) {
            if (!value.allDay) {

                var s = moment(`2000-01-01 ${value.starttime}`, "YYYYMMDDHHmmss");
                var start = s.valueOf();
                var startmin = s.minutes();
                var starth = s.hours();
                var end = moment(`2000-01-01 ${value.endtime}`, "YYYYMMDDHHmmss").valueOf();
                var elapsed = (end - start) / 1000 / 60;

                return `top: ${startmin + starth * 60
                    }px;height: ${elapsed}px;`;
            }
            return "";
            // style="top: 60px; height: 70px"
        },
        Today() {
            this.Init();
        },
        ReDate() {
            var currentDay = new Date(this.redate);
            this.theDayOfWeek = currentDay.getDay();
        },
        dateMove(arg) {
            var moment = require("moment");
            if (arg > 0) {
                this.fulldate = moment(this.redate).add(this.days, "d").format("YYYY.MM.DD");
            } else {
                // -1
                this.fulldate = moment(this.redate).subtract(this.days, "d").format("YYYY.MM.DD");
            }
            this.year = parseInt(this.fulldate.split(".")[0]);
            this.month = parseInt(this.fulldate.split(".")[1]);
            this.today = parseInt(this.fulldate.split(".")[2]);
            this.setFull();

        },
        InitForm() {
            var currentDay = new Date();

            this.currentYear = currentDay.getFullYear();
            this.currentMonth = currentDay.getMonth() + 1;
            this.year = this.currentYear;
            this.month = this.currentMonth;
            this.today = currentDay.getDate();
            this.currentDay = this.today;
            this.setFull();

        },
        InitSet() {
            var currentDay = new Date();
            this.InitForm();

            this.hour = currentDay.getHours(); //시간
            this.min = currentDay.getMinutes(); //분
            this.min += this.hour * 60;
            this.now = this.min + 74.88;
            this.nowTimeGo();

            this.theDayOfWeek = currentDay.getDay();
        },
        fullSetting(arg) {
            if (arg) {
                var moment = require("moment");
                var d = `${this.year}-${this.month}-${this.today}`;
                var type = "months";
                if(this.$route.name == "calday"){
                    type = "d";
                }else if(this.$route.name == "calweek"){
                    type = "w";
                }
                var red = moment(d,"YYYY-MM-DD").add(arg, type);

                this.month = red.format("MM");
                this.year = red.format("YYYY");
                this.today = red.format("DD");
            }
        },

        calendarDataSet(arg) {
            this.fullSetting(arg);
            this.setFull();
        },
        SetDate(date) {
            this.year = parseInt(date.split(".")[0]);
            this.month = parseInt(date.split(".")[1]);
            this.today = parseInt(date.split(".")[2]);
        },

    },
};
export default NowTime