
export default {
    changeInfiniteId(state, value) {
        state[value] += 1;

    },
    disAllCheck(state) {
        state.mail.checkBtn.allchecked = false;

    },
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
    Back(state) {
        state.mail.checkBtn.editclicked = false;
        state.mail.checkBtn.photoon = true;
        state.mail.checkBtn.checkedNames = [];
        state.mail.checkBtn.allchecked = false;
    },
    editClick(state) {
        state.mail.checkBtn.editclicked = !state.mail.checkBtn.editclicked;
        state.mail.checkBtn.photoon = !state.mail.checkBtn.photoon;
    },
    mailDelete(state, { type }) {
        var data = state.mail.data[type].data.data;
        for (var i = 0; i < state.mail.checkBtn.checkedNames.length; i++) {
            data.splice(state.mail.checkBtn.checkedNames[i].key, 1);
        }
        state.mail.checkBtn.checkedNames = [];
    },
    MailDetail(state, { res, mailtype }) {

        if (Object.keys(res).length > 0) {
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].photoerror = true;
            }
        }
        state.mail.data[mailtype].data = res;
    },
    MoreList(state, { list }) {

        state.moreList = list;

    },
    MyInfo(state, { res }) {
        // state.myinfo={};
        state.store.myinfo = res;
    },
    WordReset(state) {
        state.data.searchword = "";
        state.data.searchwordarr = [];

    },
    Mail(state, { res, mailtype, category }) {
        state.main.data.mailtype[mailtype][category].data = res;
    },
    Schedule(state, { res, scheduletype, category }) {
        state.main.data.scheduletype[scheduletype][category].data = res;
    },
    Board(state, { res, boardtype, category }) {
        state.main.data.boardtype[boardtype][category].data = res;
    },
    Approval(state, { res, approvaltype, category }) {
        state.main.data.approvaltype[approvaltype][category].data = res.data;
        state.main.data.approvaltype[approvaltype][category].cnt = res.cnt;
    },
    GetLanguage(state, { res, app }) {
        state.store.language[app] = res;
        // console.log(state.store.language)

    },
    Children(state, { child }) {
        state.children = child;

    },
    setForm(state, { res }) {
        state.form = res.form;

    },
    AllDelKeyword(state) {
        state.recent = [];

    },
    DelKeyword(state, { word, index }) {
        state.recent.splice(index, 1)

    },
    Recent(state, { recent }) {
        state.recent = recent;

    },
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
        // if(typeof paging !== "undefined" ||
        // typeof paging !== undefined ||
        // paging !== undefined ||
        // paging !== null ||
        // paging !== ""){        //     
        //     if(res.person.data.length) {
        //         state.sortdata.person.data = state.sortdata.person.data.concat(res.person.data)
        //         paging.loaded()
        //         state.data.pagenum += 1        //         
        //         // 끝 지정(No more data) - 데이터가 EACH_LEN개 미만이면 
        //         if(res.person.data.length / config.defaultSize < 1) {
        //             paging.complete()
        //         }
        //       } else {
        //         // 끝 지정(No more data)
        //         paging.complete()
        //     }

        // }

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
    setTime(state) {
        // 지금 이 순간
        var moment = require("moment");
        state.data.created = moment().utc().format("YYYYMMDDTHHmmss");
    },
    SettingCreated(state, data) {
        state.store.config = data;

    },
    Color(state, { color }) {        // 
        state.store.systemcolor = color;
    },
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