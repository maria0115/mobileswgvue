import {
    MailDetail, FollowupSet, MailAutoSave, MailDelay, MailWrite,
    DocApproval,
    MailRealDelete,
    CalDelete,
    CalDetail,
    CalList,
    FollowUpInfo,
    MailSearch,
    MailSave,
    writeForm,
    Holiday,
    OrgAutoSearch,
    ToMe,
    SpamSet,
    InitOrg,
    Org,
    SignDetail,
    SignGreetDelete,
    GETMailDelay,
    GETMailAutoSave,
    SignEdit,
    GreetEdit,
    GreetList,
    GreetSet,
    GreetAdd,
    GreetDetail, SignAdd, SignSet, SignList, ReadFlag, MailMove, MailDelete, MyInfo, PSearch, PUdate, Search, Auto, Recent, AllDelKeyword, DelKeyword, getForm, GetLanguage, Schedule, Board, Approval, Mail
} from '../api/index.js';
import config from '../config/key.js';
import $, { data } from "jquery";
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
    DocApproval({state,commit},{type}){

        DocApproval(type)
        .then((res) => {

            if (res.status !== 200) {
                return false;
            } else {
                commit("GetApprovalList",{menu:type,data:res.data})
                return true;

            }

        })

    },
    GetApprovalList({state,commit},{type}){
        var data = {};
        data.page = 0;
        data.size = state.approval.data[type].size;
        data.approvaltype = type;
        Approval(data)
        .then((res) => {

            if (res.status !== 200) {
                return false;
            } else {
                console.log("GetApprovalList", res.data,type)
                commit("GetApprovalList",{menu:type,data:res.data})
                return true;

            }

        })
    },
    MailRealDelete({ state, dispatch }, { datas, type }) {
        // data는 //unid,unid string
        var datastr = "";
        for (var i = 0; i < datas.length; i++) {
            if (datas.length - 1 !== i) {
                datastr += datas[i].unid + ',';
            } else {
                datastr += datas[i].unid
            }
        }
        var data = {};
        data.unid = datastr;

        console.log(data)
        MailRealDelete(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    console.log("CalDelete", res.data)
                    return true;

                }

            })
    },
    CalDelete({ state }, data) {
        return CalDelete(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    console.log("CalDelete", res.data);
                    return true;

                }

            })
    },
    CalDetail({ state, commit }, { data, path, which }) {
        return CalDetail(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    commit("CalDetail", { data: res.data, which });
                    return true;

                }

            })
    },
    CalList({ state, commit }, { data, which }) {
        CalList(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    commit("CalList", { data: res.data, which, option: data })
                    return true;

                }

            })
    },
    async FollowUpInfo({ state, commit }, unid) {
        return await FollowUpInfo(unid)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    console.log(res.data, "FollowUpInfo");
                    state.mail.data.followUpInfo = res.data;
                    return true;

                }

            })
    },
    // 메일 검색
    MailSearch({ state, commit }, { mailtype }) {
        // var data = state.mail.searchOption;
        state.mail.data[mailtype].page = 0;
        state.mail.data[mailtype].data = [];
        // var data = state.mail.data[mailtype];
        var data = {};
        data.mailtype = mailtype;
        data.page = 0;

        data.searchType = mailtype;
        data.searchfield = state.store.mailconfig.searchOption.searchfield;

        data.searchword = state.store.mailconfig.searchOption.searchword;

        // console.log(state.mail.searchOption,"action")

        MailSearch(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    // console.log(res)/s
                    // state.mail.data[data.path] = res.data;
                    commit("MailDetail", { res: res.data, mailtype });

                }

            })

    },
    MailSave({ state, commit }, { data, menu }) {

        MailSave(data, menu)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {

                    // commit("MailOrgDataInit")
                    // router.push(`/maillist/sent_detail`);

                }

            })
    },
    writeForm({ state, commit },) {
        return writeForm()
            .then(response => {
                if (response.status !== 200) {
                    return false;
                } else {

                    state.mail.data.writeForm = response.data;
                    return true;
                }
            })
    },
    async Holiday({ state, commit }, data) {
        state.schedule.data.holiday = {};
        var result = await Holiday(data)
            .then(response => {
                if (response.status !== 200) {
                    return false;
                } else {
                    if (response.data.item) {
                        return response.data.item;
                    } else {
                        return {};
                    }
                }
            })

        if (result) {
            state.schedule.data.holiday = result;

        }
        return;
    },
    SpamSet({ state }, data) {
        SpamSet(data)
            .then(response => {
                if (response.status !== 200) {
                    return false;
                } else {


                }


            })

    },
    OrgAutoSearch({ state, commit }, data) {
        console.log(data)

        OrgAutoSearch(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    console.log(res.data)
                    commit("AutoSearchOrg", { data: res.data, menu: data })

                }

            })
    },
    ModalOrgAutoSearch({ state, commit }, data) {

        OrgAutoSearch(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    console.log(res.data, "ModalOrgAutoSearch");

                }

            })
    },
    MailWrite({ state, commit }, data) {

        MailWrite(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    // 
                    commit("MailOrgDataInit")
                    router.push(`/maillist/sent_detail`);

                }

            })
    },
    async ToMeInfo({ commit }) {
        var result = await ToMe()
            .then((res) => {

                return res.data;

            })
        commit("ToMe", result);
        return;

    },
    async ToMe({ commit }) {
        var result = await ToMe()
            .then((res) => {

                return res.data;

            })
        commit("ToMe", result);

        await commit("MailOrgDataInit");
        commit("AddOrg", { who: "SendTo", value: result });
        // state.mailorg.SendTo.push(data);

    },
    async Org({ state, commit, dispatch }, data) {
        // 
        var chdata = await Org(data)
            .then((res) => {
                return res.data;

            })
        return chdata;
        // dispatch("MoreOrg",chdata);
        // await commit("MailOrgData", chdata);
        // var result = await tree.fetch(state.mailorg);
        // commit("MailOrgTransData", result)
    },
    async MoreOrg({ state, commit }, value) {

        for (var i = 0; i < value.length; i++) {
            var data = {};
            data.menu = "mail";
            data.departmentcode = value[i].mycode;
            if (value[i].companycodecopy) {
                data.companycode = value[i].companycodecopy;
            } else {
                data.companycode = value[i].companycode;
            }
            // 
            var chdata = await Org(data)
                .then((res) => {
                    return res.data;

                })

            await commit("MailOrgData", chdata);
            var result = await tree.fetch(state.mailorg);
            // 
            commit("MailOrgTransData", result)

        }

    },
    InitOrg({ state, commit, dispatch }, data) {
        console.log(data)
        // 
        InitOrg(data)
            .then((res) => {
                console.log(res.data)

                commit("MailOrgTransData", res.data);
            })
    },
    GETMailDelay({ state }) {
        GETMailDelay()
            .then((res) => {
                // 
                state.store.mailconfig.delay.config = res.data;

            })

    },
    GETMailAutoSave({ state }) {
        GETMailAutoSave()
            .then((res) => {
                // 
                state.store.mailconfig.autosave.config = res.data;

            })
    },
    SignGreetDelete({ state, commit }, { where }) {
        if (router.history.current.fullPath == "/mailconfig/modifygreet") {
            where = "greet";
        } else {
            where = "sign";
        }


        SignGreetDelete(state.store.mailconfig.view[`${where}DetailUnid`])
            .then((response) => {

                if (response.status !== 200) {
                    return false;
                } else {
                    router.push(`/mailconfig/${where}`);

                }


            })
    },
    SignEdit({ state, commit }, data) {

        return SignEdit(data)
            .then(response => {

                if (response.status !== 200) {
                    return false;
                }
                return true;

            })

    },
    GreetEdit({ state, commit }, data) {

        return GreetEdit(data)
            .then(response => {

                if (response.status !== 200) {
                    return false;
                }
                return true;

            })

    },
    async MailDetail({ state, commit }, data) {

        return await MailDetail(data)
            .then(response => {

                if (response.status !== 200) {

                } else {



                    commit("MailDetailData", response.data);
                    return true;

                    // router.push({ name: 'MailAutoSave' });
                }
            });

    },
    FollowupSet({ state, commit }, data) {
        console.log(data)
        return FollowupSet(data)
            .then(response => {
                if (response.status !== 200) {
                    return false;

                } else {
                    console.log(response)
                    return true

                    // commit("GreetViewData", data);

                    // router.push({ name: 'MailAutoSave' });
                }
            });
    },
    MailAutoSave({ state, commit }, data) {
        MailAutoSave(data)
            .then(response => {
                if (response.status !== 200) {

                } else {

                    // commit("GreetViewData", data);

                    // router.push({ name: 'MailAutoSave' });
                }
            });

    },
    MailDelay({ state, commit }, data) {

        MailDelay(data)
            .then(response => {
                // 
                if (response.status !== 200) {

                } else {

                    // commit("GreetViewData", data);

                    // router.push({ name: 'MailDelay' });
                }
            });

    },
    // async MailDetail({ state, commit }, data) {
    //     
    //     return await MailDetail(data)
    //         .then(response => {
    //             
    //             if (response.status !== 200) {
    //                 
    //             } else {
    //                 


    //                 commit("MailDetailData", response.data);
    //                 return true;

    //                 // router.push({ name: 'MailAutoSave' });
    //             }
    //         });

    // },
    async GreetDetail({ state, commit }, { unid }) {
        var result = await GreetDetail(unid)
            .then(response => {

                var r = {};
                r.data = response.data;

                if (response.status !== 200) {

                    r.boo = false;
                } else {

                    r.boo = true;
                }
                return r;
            })

        if (result.boo) {
            // 
            await commit("GreetViewData", result.data);
            return;

            // router.push({ name: 'SeeGreet' });

        }
        // .then(response => {
        //     if(response){
        //     }
        // })

    },
    GreetAdd({ state, commit }, data) {
        GreetAdd(data)
            .then(response => {
                if (response.status !== 200) {

                } else {
                    commit("GreetViewData", data);
                    commit("BeforeSave");


                    router.push({ name: 'SeeGreet', params: { before: "add" } });
                }
            });

    },
    GreetSet(state, { unid }) {
        var data = {};
        data.unid = unid;
        GreetSet(data)
            .then(response => {
                if (response.status !== 200) {

                }
            });
    },
    GreetList({ state, commit }) {
        var data = {};
        data.page = 0;
        data.size = state.mail.data.greetings.size;
        GreetList(data)
            .then(response => {
                if (response.status == 200) {
                    commit('GreetList', { res: response.data })
                } else {

                }
            });
    },
    async SignDetail({ state, commit }, { unid }) {
        var result = await SignDetail(unid)
            .then(response => {
                var r = {};
                r.data = response.data;

                if (response.status !== 200) {

                    r.boo = false;
                } else {

                    r.boo = true;
                }
                return r;
            })

        if (result.boo) {

            // 
            await commit("SignViewData", result.data);
            return;

            // router.push({ name: 'SeeGreet' });

        }

    },
    SignAdd({ state, commit }, data) {
        SignAdd(data)
            .then(response => {
                if (response.status !== 200) {

                } else {
                    commit("SignViewData", data);
                    commit("BeforeSave");


                    router.push({ name: 'SeeSign', params: { before: "add" } });
                }
            });

    },
    SignSet(state, { unid }) {
        var data = {};
        data.unid = unid;
        SignSet(data)
            .then(response => {
                if (response.status !== 200) {

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
    async MailMove({ state, commit }, { viewname, folderId }) {
        var data = {};
        var folderstr = "";
        var checkedNames = state.mail.checkBtn.checkedNames;
        if (checkedNames.length > 0) {
            for (var i = 0; i < checkedNames.length; i++) {
                folderstr += `${checkedNames[i].unid},`;
                // 
            }
            data.ids = folderstr;
            data.viewname = viewname;
            data.folderId = folderId;



            return await MailMove(data)
                .then(response => {

                    if (response.status == 200) {
                        commit("checkedNamesRemove");
                        commit("Back");
                        // router.push(router.history.current.path);
                        return true;
                    }
                    return false;
                });


        }
    },


    // 메일 삭제
    async MailDelete({ state, dispatch }, { datas, type }) {
        // data는 //unid,unid string
        var datastr = "";
        for (var i = 0; i < datas.length; i++) {
            datastr += datas[i].unid + ',';
        }

        return await MailDelete(datastr)
            .then(response => {

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
                // 
                if (response.data.data.length > 0) {
                    commit("MoreList", { list: true });
                    // 
                }
                else {
                    // 
                    commit("MoreList", { list: false });

                }
            })
            .catch(e => {
                commit("MoreList", { list: false });
                // 
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
        state.mail.data[mailtype].page = 0;
        state.mail.data[mailtype].data = [];
        var data = state.mail.data[mailtype];
        data.mailtype = mailtype;
        data.page = 0;

        if (mailtype == 'custom') {
            data.FolderId = folderId;
        }
        Mail(data)
            .then(response => {
                // 
                if (response.status == 200) {
                    commit('MailDetail', { res: response.data, mailtype })
                } else {
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
                // 
                // 
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
        console.log(data)
        DelKeyword(data)
            .then(response => {
                console.log(response)

                commit('DelKeyword', { word, index })
            });

    },
    // 통합검색 최근검색어 전체 삭제
    AllDelKeyword({ commit }) {
        AllDelKeyword()
            .then(response => {

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
        // 
        // }
        commit('setTime');
        // 통합검색 custom 필터에서 lt를 아직 설정하지 않으면 node에 데이터 요청하지 않음
        if (kind === "custom" && (data.lt === undefined)) {
            commit('SearchData', { word: word, page: pagenum, what, value });
            dispatch("GetRecent");
            return;
        }

        // 

        return Search(data)
            .then(response => {
                // 

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
        return state.store.config.display;
    },
    // 환경설정 update
    setConfig({ state, commit }, { menu, value, setting }) {
        // 배포용
        // 
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

            commit("Config", { menu, value, setting })
            PUdate(query)
                .then(response => {
                    if (response.status == 200) {

                    }
                });
        }//개발용
        else {
            commit("Config", { menu, value, setting })
        }
    },

}