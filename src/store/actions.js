import { MailAutoSave,MailDelay,GreetAdd,SignAdd, SignSet, SignList, ReadFlag, MailMove, MailDelete, MyInfo, PSearch, PUdate, Search, Auto, Recent, AllDelKeyword, DelKeyword, getForm, GetLanguage, Schedule, Board, Approval, Mail } from '../api/index.js';
import config from '../config/key.js';
import $ from "jquery";
import router from '../router/index';
//system 모드이면 무슨 light 인지 dark 인지 감지
const whatcolor = {
    fetch(color) {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            color = "dark";
        } else {
            color = "light";
        }

        return color;

    }
}
export default {
    MailAutoSave({ state, commit }, data) {
        console.log(data);
        MailAutoSave(data)
            .then(response => {
                if (response.status !== 200) {
                    console.log("MailAutoSave not working");
                } else {
                    console.log("잘들어갔다")
                    // commit("GreetViewData", data);

                    // router.push({ name: 'MailAutoSave' });
                }
            });

    },
    MailDelay({ state, commit }, data) {
        console.log(data);
        MailDelay(data)
            .then(response => {
                if (response.status !== 200) {
                    console.log("MailDelay not working");
                } else {
                    console.log("delay잘들어감")
                    // commit("GreetViewData", data);

                    // router.push({ name: 'MailDelay' });
                }
            });

    },
    GreetAdd({ state, commit }, data) {
        GreetAdd(data)
            .then(response => {
                if (response.status !== 200) {
                    console.log("GreetAdd not working");
                } else {
                    commit("GreetViewData", data);

                    router.push({ name: 'GreetAdd' });
                }
            });

    },
    SignAdd({ state, commit }, data) {
        SignAdd(data)
            .then(response => {
                if (response.status !== 200) {
                    console.log("SignAdd not working");
                } else {
                    commit("SignViewData", data);

                    router.push({ name: 'SeeSign' });
                }
            });

    },
    SignSet(state, { unid }) {
        var data = {};
        data.unid = unid;
        SignSet(data)
            .then(response => {
                if (response.status !== 200) {
                    console.log("서명 설정 안됨");
                }
            });
    },
    SignList({ state, commit }) {
        var data = {};
        data.page = 0;
        data.size = state.mail.data.signature.size;
        SignList(data)
            .then(response => {
                if (response.status == 200) {
                    commit('SignList', { res: response.data })
                } else {
                    console.log("서명 목록 data error");
                }
            });
    },
    ReadFlag({ state }, { datas }) {
        // var datas = state.mail.checkBtn.checkedNames;
        var datastr = "";
        for (var i = 0; i < datas.length; i++) {
            datastr += datas[i].unid + ',';
        }
        var data = {};
        data.unid = datastr;
        ReadFlag(data)
            .then(response => {
                if (response.status == 200) {
                    router.push(router.history.current.path);
                    return true;
                }
                return false;
            });

    },
    MailMove({ state, dispatch }, { viewname, folderId }) {
        var data = {};
        var folderstr = "";
        var checkedNames = state.mail.checkBtn.checkedNames;
        if (checkedNames.length > 0) {
            for (var i = 0; i < checkedNames.length; i++) {
                folderstr += `${checkedNames[i].unid},`;
                // console.log(checkedNames[i],"checkedNames")
            }
            data.ids = folderstr;
            data.viewname = viewname;
            data.folderId = folderId;
            // console.log("이동안됨?",data)


            MailMove(data)
                .then(response => {
                    // console.log(response, "삭제됨?");
                    if (response.status == 200) {
                        router.push(router.history.current.path);
                        return true;
                    }
                    return false;
                });

        }
    },

    async tree({ state }, data) {
        var tree = [],
            c = {};
        var item, id, parentId;

        for (var i = 0, length = data.length; i < length; i++) {
            item = data[i];
            id = item['mycode'];
            parentId = item['parentcode'];

            c[id] = c[id] || [];
            item['children'] = c[id];
            if (parentId != "") {
                c[parentId] = c[parentId] || [];

                c[parentId].push(item);

            } else {
                // console.log("else",item)
                tree.push(item);
            }
            console.log(c)
        };

        return tree;
    },
    // 메일 삭제
    MailDelete({ state, dispatch }, { datas, type }) {
        // data는 //unid,unid string
        var datastr = "";
        for (var i = 0; i < datas.length; i++) {
            datastr += datas[i].unid + ',';
        }
        MailDelete(datastr)
            .then(response => {
                console.log(response, "삭제됨?");
                if (response.status == 200) {
                    return true;
                }
                return false;
            });
    },
    // 해당 페이지 이후 데이터가 더 있는지 확인
    GetMoreList({ state, commit }, { data }) {

        var doyouhavemorelist = {};
        doyouhavemorelist.approvaltype = data.approvaltype;
        doyouhavemorelist.page = String(parseInt(data.page) + 1)
        doyouhavemorelist.size = data.size;
        Approval(doyouhavemorelist)
            .then(response => {
                // console.log(response,"GetMoreList");
                if (response.data.data.length > 0) {
                    commit("MoreList", { list: true });
                    // console.log("그다음은 있다")
                }
                else {
                    // console.log("그다음은 없다")
                    commit("MoreList", { list: false });

                }
            })
            .catch(e => {
                commit("MoreList", { list: false });
                // console.log("그다음은 없다?")
            })

    },
    // main의 info
    GetMyInfo({ commit }) {
        MyInfo()
            .then(response => {
                commit('MyInfo', { res: response.data })
            });
    },
    // mail data
    GetMail({ commit, state }, { mailtype, category }) {
        var data = state.main.data.mailtype[mailtype][category];
        data.mailtype = mailtype;
        Mail(data)
            .then(response => {

                commit('Mail', { res: response.data, mailtype, category })
            });
    },
    // maildetail data
    GetMailDetail({ commit, state }, { mailtype, folderId }) {
        // console.log(mailtype,folderId)
        state.mail.data[mailtype].page = 0;
        state.mail.data[mailtype].data = [];
        var data = state.mail.data[mailtype];
        data.mailtype = mailtype;
        data.page = 0;

        if (mailtype == 'custom') {
            // console.log(router.history.current.params)


            data.FolderId = folderId;
        }
        // console.log(data)

        Mail(data)
            .then(response => {
                // console.log(response.data, "response")
                if (response.status == 200) {
                    commit('MailDetail', { res: response.data, mailtype })
                    // if(mailtype == 'custom'){
                    //     router.push('/maillist/custom');

                    // }
                } else {
                    console.log("폴더별 메일데이터 에러")
                }
            });
    },
    // 일정 data
    GetSchedule({ commit, state }, { scheduletype, category }) {
        var data = state.main.data.scheduletype[scheduletype][category];
        data.scheduletype = scheduletype;
        Schedule(data)
            .then(response => {
                commit('Schedule', { res: response.data, scheduletype, category })
            });
    },
    // 게시판 data
    GetBoard({ state, commit }, { boardtype, category }) {
        var data = state.main.data.boardtype[boardtype][category];
        data.boardtype = boardtype;
        Board(data)
            .then(response => {

                commit('Board', { res: response.data, boardtype, category })
            });
    },
    // 전자결재 data
    GetApproval({ state, commit, dispatch }, { approvaltype, category }) {
        var data = state.main.data.approvaltype[approvaltype][category]
        data.approvaltype = approvaltype;
        var result = {};
        data.page = 0;

        Approval(data)
            .then(response => {
                result.data = response.data;
                commit('Approval', { res: response.data, approvaltype, category })
            });
        if (approvaltype === "approve") {

            dispatch("GetMoreList", { data })
        }


    },
    // 다국어 data
    async GetLanguage({ commit }, { app }) {
        await GetLanguage(app)
            .then(response => {
                // console.log("GetLanguagemutation")
                // console.log("@@@@@@@@@@@@@@@@@@@@@",response.data)
                commit('GetLanguage', { res: response.data, app })
                return;

            });
    },
    Children({ commit }, { child }) {
        commit('Children', { child })

    },
    // async getForm({ commit }) {
    //     var data = await getForm()
    //         .then(response => {
    //             commit('setForm', { res: response.data })
    //             return response.data;
    //         });
    //     return data;

    // },
    // 통합검색 최근검색어 선택 삭제
    DelKeyword({ state, commit }, { word, index }) {
        var data = {};
        data.searchword = word;
        DelKeyword(data)
            .then(response => {
                console.log(response);
                commit('DelKeyword', { word, index })
            });

    },
    // 통합검색 최근검색어 전체 삭제
    AllDelKeyword({ commit }) {
        AllDelKeyword()
            .then(response => {
                console.log(response);
                commit('AllDelKeyword');
            });

    },
    // 통합검색 최근검색어 data
    GetRecent({ commit }) {
        Recent()
            .then(response => {
                commit('Recent', { recent: response.data });
            });

    },
    // 자동완성
    autoComplete({ commit, state }, { word, category, timeStamp }) {
        state.timeStamp = timeStamp;
        if (typeof category == "undefined" ||
            typeof category == undefined ||
            category == null ||
            category == "") {
            // empty
        } else {
            state.data.class = category;
        }
        state.tf = true;
        var data = state.data;
        if (word !== undefined) {
            data.searchword = word;
            data.searchwordarr[0] = word;
        }

        var pagenum = config.search.defaultPageNum - 1;
        data.pagenum = pagenum;
        data.term = state.term;

        if (data.class === "allsearch") {
            data.size = config.defaultHomeSize;
            state.data.size = data.size;
        } else {
            data.size = config.search.defaultSize;
            state.data.size = data.size;
        }

        commit('setTime');


        Auto(data)
            .then(response => {
                if (response.data.Success === false) {
                    // empty
                    state.autoList = {};
                } else {
                    commit('autoList', { relation: response.data });

                }
                state.tf = false;
            });
    },
    //검색
    SearchWord({ state, commit, dispatch }, { word, category, what, value, kind, paging }) {
        //created :  word: " ",
        // category: "allsearch",
        if (typeof category == "undefined" ||
            typeof category == undefined ||
            category == undefined ||
            category == null ||
            category == "") {
            // empty
        } else {
            state.data.class = category;
        }
        state.data.from = 0;
        var data = state.data;
        if (word !== undefined) {
            if (word === "") {
                data.searchword = "";
                data.searchwordarr = [];
            } else {
                data.searchword = word;
                data.searchwordarr[0] = word;

            }

        }



        if (data.class === "allsearch") {
            data.size = config.search.defaultHomeSize;
        } else {
            data.size = config.search.defaultSize;
        }

        if (typeof kind !== "undefined" &&
            typeof kind !== undefined &&
            kind !== undefined &&
            kind !== null &&
            kind !== "") {
            // if (kind === "custom") {
            data.dateType = kind;
            // }
            // else{
            //     data.dateType = "default";
            // }
        }

        if ((typeof what !== "undefined" ||
            typeof what !== undefined ||
            what !== undefined ||
            what !== null ||
            what !== "") && (typeof value !== "undefined" ||
                typeof value !== undefined ||
                value !== undefined ||
                value !== null ||
                value !== "")) {

            data[what] = value;

        }

        commit('changeInfiniteId', "searchInfiniteId");

        // if(typeof paging !== "undefined" ||
        // typeof paging !== undefined ||
        // paging !== undefined ||
        // paging !== null ||
        // paging !== ""){
        //      Search(data)
        //     .then(response => {


        //         commit('SearchData', { res: response.data.data, word: word, page: pagenum, what, value,paging:paging });
        //         dispatch("GetRecent");
        //     });
        // }else{
        // config.search.defaultPageNum = 1;

        var pagenum = 0;
        data.pagenum = pagenum;
        // console.log("여기안오냐")
        // }
        commit('setTime');
        // 통합검색 custom 필터에서 lt를 아직 설정하지 않으면 node에 데이터 요청하지 않음
        if (kind === "custom" && (data.lt === undefined)) {
            commit('SearchData', { word: word, page: pagenum, what, value });
            dispatch("GetRecent");
            return;
        }

        // console.log(data,"data")

        return Search(data)
            .then(response => {
                // console.log(response.data,"responseactuib")

                commit('SearchData', { res: response.data.data, word: word, page: pagenum, what, value });
                dispatch("GetRecent");
            });

    },
    // 사용자가 설정한 환경설정을 프로그램 시작할 때 적용
    // 비동기 처리로 dom을 전부 구성하고 나서 css를 적용 
    async setMode({ state, commit }) {
        // 배포용
        if (process.env.NODE_ENV !== 'development') {
            //엘라스틱에서 사용자 설정값 가져와라
            await PSearch()
                .then(response => {
                    state.store.config = response.data;
                    commit("SettingCreated", response.data);
                    if (response.data.mode === "system") {
                        state.store.systemcolor = whatcolor.fetch(response.data.mode);
                        commit("Color", { color: state.store.systemcolor })
                    } else {
                        state.store.systemcolor = state.store.config.mode;
                        commit("Color", { color: state.store.systemcolor })
                    }

                });

        }
        // 개발용 
        else {
            if (state.store.config.mode === "system") {
                state.store.systemcolor = whatcolor.fetch(state.store.config.mode);
                commit("Color", { color: state.store.systemcolor })
            } else {
                state.store.systemcolor = state.store.config.mode;
                commit("Color", { color: state.store.systemcolor })
            }
        }
    },
    // 환경설정 update
    setConfig({ state, commit }, { menu, value, setting }) {
        // 배포용
        // console.log(menu, value, setting, "dd");
        if (process.env.NODE_ENV !== 'development') {
            // 여기!!!!!! 유저마다 환경설정 엘라스틱에 넣어줘야 한다!!!!!!!!!!!!!!!!!!!!!!
            var query = {};
            var pre = state.store.config[menu];
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

                if (menu == "font" && setting == "size") {

                    if (value == "small") {
                        $("html").addClass("small");
                        $("html").removeClass("normal");
                        $("html").removeClass("large");
                        $("html").removeClass("mar15");
                    } else if (value == "normal") {
                        $("html").addClass("normal");
                        $("html").removeClass("small");
                        $("html").removeClass("large");
                        $("html").removeClass("mar15");
                    } else if (value == "large") {
                        $("html").addClass("large");
                        $("html").removeClass("small");
                        $("html").removeClass("normal");
                        $("html").addClass("mar15");
                    }
                }

                state.store.config[menu][setting] = value;
            } else if (menu === "mode") {
                if (value === "system") {
                    state.store.systemcolor = whatcolor.fetch();
                    commit("Color", { color: state.store.systemcolor })
                } else {
                    state.store.systemcolor = value;
                    commit("Color", { color: state.store.systemcolor })
                }
                state.store.config[menu] = value;
            } else {
                state.store.config[menu] = value;
            }
            query.setting = {};
            query.setting[menu] = state.store.config[menu];
            console.log(query)
            commit("Config", { menu, value, setting })
            PUdate(query)
                .then(response => {
                    if (response.status == 200) {
                        console.log("config 잘 바꼇다")
                    }
                });
        }//개발용
        else {
            commit("Config", { menu, value, setting })
        }
    },

}