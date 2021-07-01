
export default {
    MoreList(state, { list }) {
        
        state.moreList = list;

    },
    MyInfo(state, { res }) {
        state.main.my.myinfo = res;
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
        state.language[app] = res;

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
        state.recent.splice(index,1)

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
        state.sortdata = res;

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
        state.config = data;

    },
    Color(state, { color }) {        // 
        state.systemcolor = color;
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
                state.config[menu].use = value;
            } else {
                state.config[menu][setting] = value;
            }
        } else if (menu === "alarm" || menu === "font" || menu === "main") {
            state.config[menu][setting] = value;
        } else {
            state.config[menu] = value;
        }




    }

}