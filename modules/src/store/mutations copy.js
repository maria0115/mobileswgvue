
export default {
    ScheduleOrgDataDelete(state, { data, pointer }) {
        state.scheduleorg[pointer] = state.scheduleorg[pointer].filter((element) => element !== data);
    },
    ScheduleOrgDataInit(state) {
        state.scheduleorg = {
            pointer: "SendTo",
            SendTo: [],
            CopyTo: [],
            BlindCopyTo: []
        };
        return;
    },
    // ScheduleOrgTransData(state, data) {
    //     state.mail.data.org.trans = data;
    // },
    ScheduleOrgPointer(state, point) {
        state.scheduleorg.pointer = point;
    },
    ScheduleOrgData(state, data) {
        var scheduleorg = state.scheduleorg[state.scheduleorg.pointer];
        if (data.kinds === "Department") {
            data.id = data.mycode;
            data.shortname = data.name;
        }
        scheduleorg.push(data);

        var result = scheduleorg.filter(function (item1, idx1) {
            return scheduleorg.findIndex(function (item2, idx) {
                if (item1.email) {
                    return item1.email == item2.email;
                } else {
                    return item1.name == item2.name;
                }
            }) == idx1;
        });



        state.scheduleorg[state.scheduleorg.pointer] = result;


    },
    GetApprovalList(state,{data,menu}){
        state.approval.data[menu].data = data;
    },
    CalDetail(state, { data, which }) {
        state.schedule.data.calDetail[which] = data;
    },
    SaveScheduleUnid(state, {unid,where}) {
        state.store.schedule.detail.unid = unid;
        state.store.schedule.detail.where= where;
    },

    SaveScheduleList(state, {data,date}) {
        state.store.schedulelist.date = date;
        state.store.schedulelist.data = data;
        return;
    },

    // var tree = [],
    //     c = {};
    // var item, id, parent;

    // for (var i = 0; i < data.length; i++) {
    //     // var item = {};
    //     // item.name = data[i].nodetitle.ko;
    //     id = data[i].mycode;
    //     parent = data[i].parentcode;

    //     c[id] = c[id] || [];
    //     data[i]['children'] = c[id];
    //     if (parent != "") {
    //         c[parent] = c[parent] || [];

    //         c[parent].push(data[i]);

    //     } else {
    //         // console.log("else",item)
    //         tree.push(data[i]);
    //     }
    //     // console.log(c)
    // };
    CalList(state, { data, which,option }) {
        if (which === "week") {
            var result = [], d = {}, c = {};
            var daysSort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            let range_s = Math.floor(+new Date(option.start) / 1000);
            let range_e = Math.floor(+new Date(option.end) / 1000);
            for (var i = 0; i < data.length; i++) {
                var start = data[i].startdate;
                let current = Math.floor(+new Date(start) / 1000);

                var year = start.split("-")[0];
                var month = start.split("-")[1];
                var date = start.split("-")[2];
                var day = new Date(year, month - 1, date).getDay();
                // console.log(daysSort[day])
                d[daysSort[day]] = d[daysSort[day]] || [];

                var endtime = data[i].endtime.split(":")[0];
                var starttime = data[i].starttime.split(":")[0];
                var chai = parseInt(endtime) - parseInt(starttime); //
                if (d[daysSort[day]].length === 0) {
                    for (var h = 0; h < 24; h++) {
                        d[daysSort[day]].push([]);
                    }
                }
                for(var j = 0; j <chai; j++) {
                        d[daysSort[day]][parseInt(starttime)+j].push(data[i]);
                }
            }
            data = d;

        }else if(which ==="day"){
            var d = {};
            for (var i = 0; i < data.length; i++) {
                var endtime = data[i].endtime.split(":")[0];
                var starttime = data[i].starttime.split(":")[0];
                var chai = parseInt(endtime) - parseInt(starttime); //
                for (var h = 0; h < 24; h++) {
                    d[h] = d[h] || [];
                }
                for(var j = 0; j <chai; j++) {
                    d[parseInt(starttime)+j].push(data[i]);
                }

            }
            data = d;

        }
        state.schedule.data.calList[which] = data;
    },
    MailSearchOptionInit(state) {
        state.store.mailconfig.searchOption = {
            size: "14",
            page: "0",
            searchType: "",
            searchfield: "",
            searchword: ""
        }
    },
    MailSearchOption(state, data) {
        state.store.mailconfig.searchOption = data;

        return;

    },
    From(state, from) {
        state.from = from;
    },
    SearchOrgInit(state) {
        state.autosearchorg = {
            mail: {
                SendTo: [],
                CopyTo: [],
                BlindCopyTo: []
            },schedule: {
                SendTo: [],
                CopyTo: [],
                BlindCopyTo: []
            }
        };
    },
    ScheduleAddOrg(state, { who, value, menu }) {
        var scheduleorg = state.scheduleorg[who];
        scheduleorg.push(value);

        var result = scheduleorg.filter(function (item1, idx1) {
            return scheduleorg.findIndex(function (item2, idx) {
                return item1.email == item2.email
            }) == idx1;
        });

        state.scheduleorg[who] = result;

        return;

    },
    AddOrg(state, { who, value, menu }) {
        var mailorg = state.mailorg[who];
        mailorg.push(value);

        var result = mailorg.filter(function (item1, idx1) {
            return mailorg.findIndex(function (item2, idx) {
                return item1.email == item2.email
            }) == idx1;
        });

        state.mailorg[who] = result;

        return;

    },
    AutoSearchOrg(state, { data, menu }) {
        state.autosearchorg[menu.menu][menu.who] = data;
    },
    MailOrgDataDelete(state, { data, pointer }) {
        state.mailorg[pointer] = state.mailorg[pointer].filter((element) => element !== data);
    },
    MailOrgDataInit(state) {
        state.mailorg = {
            pointer: "SendTo",
            SendTo: [],
            CopyTo: [],
            BlindCopyTo: []
        };
        return;
    },
    MailOrgTransData(state, data) {
        state.mail.data.org.trans = data;
    },
    MailOrgPointer(state, point) {
        state.mailorg.pointer = point;
    },
    ToMe(state, data) {
        // 
        state.mail.data.myinfo = data;

    },
    AllReply(state, data) {
        state.mailorg = {
            pointer: "SendTo",
            SendTo: state.store.maildetail.sendTo,
            CopyTo: state.store.maildetail.copyTo,
            BlindCopyTo: []
        };
        state.mailorg.SendTo.push(state.store.maildetail.author);
        state.mailorg['SendTo'] = state.mailorg['SendTo'].filter((element) => element.id !== state.mail.data.myinfo.id);
        state.mailorg['CopyTo'] = state.mailorg['CopyTo'].filter((element) => element.id !== state.mail.data.myinfo.id);
    },
    MailOrgData(state, data) {
        var mailorg = state.mailorg[state.mailorg.pointer];
        if (data.kinds === "Department") {
            data.id = data.mycode;
            data.shortname = data.name;
        }
        mailorg.push(data);

        var result = mailorg.filter(function (item1, idx1) {
            return mailorg.findIndex(function (item2, idx) {
                if (item1.email) {
                    return item1.email == item2.email;
                } else {
                    return item1.name == item2.name;
                }
            }) == idx1;
        });



        state.mailorg[state.mailorg.pointer] = result;


    },
    MailOrgInit(state) {
        state.mailorginit = false;
    },
    MailConfigUnid(state, { unid, what }) {
        state.store.mailconfig.view[what] = unid;
    },
    MailDetailUnid(state, unid) {
        state.store.maildetail.unid = unid;
    },
    MailDetailData(state, data) {
        var unid = state.store.maildetail.unid;
        state.store.maildetail = data;
        state.store.maildetail.unid = unid;

    },
    GreetViewData(state, data) {
        state.store.greetviewdata = data;
        return;
    },
    SignViewData(state, data) {
        state.store.signviewdata = data;
        return;
    },
    BeforeSave(state,) {
        state.store.mailconfig.beforesave = true;

    },
    DisBeforeSave(state,) {
        state.store.mailconfig.beforesave = false;

    },
    MailCustomFolderTitle(state, title) {
        state.store.mailCustomFolderTitle = title;
    },
    SignList(state, { res }) {
        state.mail.data.signature.data = res;
    },
    GreetList(state, { res }) {
        state.mail.data.greetings.data = res;
    },
    // 스크롤페이징 업데이트
    changeInfiniteId(state, value) {
        state[value] += 1;

    },
    // 모두 체크 해제
    disAllCheck(state) {
        state.mail.checkBtn.allchecked = false;

    },
    // 모두 체크
    allCheck(state, path) {
        // 
        // state.mail.checkBtn.allchecked = !state.mail.checkBtn.allchecked;
        state.mail.checkBtn.allchecked = !state.mail.checkBtn.allchecked;
        // 

        if (state.mail.checkBtn.allchecked) {
            state.mail.checkBtn.checkedNames = [];
            var data = state.mail.data[path].data.data;
            for (var i = 0; i < data.length; i++) {
                var res = {};
                res.unid = data[i].unid;
                res.key = i;
                state.mail.checkBtn.checkedNames.push(res);
            }
        } else {
            state.mail.checkBtn.checkedNames = [];
        }
    },
    // 체크모드 해제
    Back(state) {
        state.mail.checkBtn.editclicked = false;
        state.mail.checkBtn.photoon = true;
        state.mail.checkBtn.checkedNames = [];
        state.mail.checkBtn.allchecked = false;
    },
    checkedNamesRemove(state) {
        state.mail.checkBtn.checkedNames = [];

    },
    checkedNamesPush(state, unid) {
        state.mail.checkBtn.checkedNames = [];

        var data = {};
        data.unid = unid;
        data.key = unid;
        state.mail.checkBtn.checkedNames.push(data);
        return;
    },
    // 체크모드 활성화
    editClick(state) {
        state.mail.checkBtn.editclicked = !state.mail.checkBtn.editclicked;
        state.mail.checkBtn.photoon = !state.mail.checkBtn.photoon;
    },
    // 메일 삭제
    mailDelete(state, { type }) {
        var data = state.mail.data[type].data.data;
        for (var i = 0; i < state.mail.checkBtn.checkedNames.length; i++) {
            data = data.filter((element) => element.unid !== state.mail.checkBtn.checkedNames[i].unid);
        }
        state.mail.data[type].data.data = data;
        state.mail.checkBtn.checkedNames = [];
    },
    // 메일 목록 데이터
    MailDetail(state, { res, mailtype }) {
        if (Object.keys(res).length === 0) {
            res.total = 0;
        }

        state.mail.data[mailtype].data = res;
        // 
    },
    // 목록이 더 있는지 확인
    MoreList(state, { list }) {

        state.moreList = list;

    },
    // info data
    MyInfo(state, { res }) {
        // state.myinfo={};
        state.store.myinfo = res;
    },
    // 검색어 초기화
    WordReset(state) {
        state.data.searchword = "";
        state.data.searchwordarr = [];

    },
    // 메일 데이터
    Mail(state, { res, mailtype, category }) {
        state.main.data.mailtype[mailtype][category].data = res;
    },
    // 일정 데이터
    Schedule(state, { res, scheduletype, category }) {
        state.main.data.scheduletype[scheduletype][category].data = res;
    },
    // 게시판 데이터
    Board(state, { res, boardtype, category }) {
        state.main.data.boardtype[boardtype][category].data = res;
    },
    // 전자결재 데이터
    Approval(state, { res, approvaltype, category }) {
        state.main.data.approvaltype[approvaltype][category].data = res.data;
        state.main.data.approvaltype[approvaltype][category].cnt = res.cnt;
    },
    // 다국어 데이터
    GetLanguage(state, { res, app }) {
        state.store.language[app] = res;

    },
    Children(state, { child }) {
        state.children = child;

    },
    setForm(state, { res }) {
        state.form = res.form;

    },
    // 모든 최근검색어 삭제
    AllDelKeyword(state) {
        state.recent = [];

    },
    // 선택된 최근검색어 삭제
    DelKeyword(state, { word, index }) {
        state.recent.splice(index, 1)

    },
    // 최근검색어 데이터
    Recent(state, { recent }) {
        state.recent = recent;

    },
    // 입력된 검색어
    setWord(state, { word }) {
        if (word !== undefined) {

            if (word === "") {
                state.data.searchword = "";
                state.data.searchwordarr = [];
            } else {
                state.data.searchword = word;
                state.data.searchwordarr[0] = word;

            }
        }

    },
    // 검색 데이터
    SearchData(state, { res, word, page, what, value, paging }) {

        var result = {};

        if (res !== undefined) {

            state.sortdata = res;

        }

        if (word !== undefined && page !== undefined) {

            if (word === "") {
                state.data.searchword = "";
                state.data.searchwordarr = [];
            } else {
                state.data.searchword = word;
                state.data.searchwordarr[0] = word;

            }
            state.data.pagenum = page;
        }

        if ((typeof what !== "undefined" ||
            what !== undefined ||
            what !== null ||
            what !== "") && (typeof value !== "undefined" ||
                value !== undefined ||
                value !== null ||
                value !== "")) {
            state.data[what] = value;
        }

    },
    // 자동완성 검색 결과
    autoList(state, { relation }) {
        var result = [];
        for (var i = 0; i < relation.length; i++) {
            relation[i].key = relation[i].key.trim();
            result.push(relation[i].key.trim());
        }
        state.autoList = Array.from(new Set(result));
    },
    // local 시간
    setTime(state) {
        // 지금 이 순간
        var moment = require("moment");
        state.data.created = moment().utc().format("YYYYMMDDTHHmmss");
    },
    // created 일때 환경설정 불러오기
    SettingCreated(state, data) {
        state.store.config = data;

    },
    // display mode
    Color(state, { color }) {        // 
        state.store.systemcolor = color;
    },
    // 환경설정 바꾸기
    Config(state, { menu, value, setting }) {
        if (menu === "etiquette") {
            if (
                typeof setting == "undefined" ||
                typeof setting == undefined ||
                setting == undefined ||
                setting == null ||
                setting == ""
            ) {
                state.store.config[menu].use = value;
            } else {
                state.store.config[menu][setting] = value;
            }
        } else if (menu === "alarm" || menu === "font" || menu === "main") {
            state.store.config[menu][setting] = value;
        } else {
            state.store.config[menu] = value;
        }




    }

}