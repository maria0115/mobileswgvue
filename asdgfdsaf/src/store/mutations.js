
export default {
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

    },
    MailOrgTransData(state, data) {
        state.mail.data.org.trans = data;

    },
    MailOrgPointer(state, point) {
        state.mailorg.pointer = point;
    },
    ToMe(state, data) {
        state.mail.data.myinfo = data;
    },
    MailOrgData(state, data) {
        state.mailorg[state.mailorg.pointer].push(data);

        state.mailorg[state.mailorg.pointer] = state.mailorg[state.mailorg.pointer].filter(function (a, i, self) {
            return self.indexOf(a) === i;
        });

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
        // console.log(state.mail.checkBtn.allchecked)
        // state.mail.checkBtn.allchecked = !state.mail.checkBtn.allchecked;
        state.mail.checkBtn.allchecked = !state.mail.checkBtn.allchecked;
        // console.log(state.mail.checkBtn.allchecked)
        console.log("allcheck")
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
    // 체크모드 활성화
    editClick(state) {
        state.mail.checkBtn.editclicked = !state.mail.checkBtn.editclicked;
        state.mail.checkBtn.photoon = !state.mail.checkBtn.photoon;
    },
    // 메일 삭제
    mailDelete(state, { type }) {
        var data = state.mail.data[type].data.data;
        for (var i = 0; i < state.mail.checkBtn.checkedNames.length; i++) {
            data.splice(state.mail.checkBtn.checkedNames[i].key, 1);
        }
        state.mail.checkBtn.checkedNames = [];
    },
    // 메일 목록 데이터
    MailDetail(state, { res, mailtype }) {
        if (Object.keys(res).length === 0) {
            res.total = 0;
        }
        state.mail.data[mailtype].data = res;
        // console.log(state.mail.data[mailtype].data)
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
        console.log(res)
        if (res !== undefined) {
            console.log("sortdata")
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