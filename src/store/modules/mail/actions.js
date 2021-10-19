import {
    MailDetail, FollowupSet, MailAutoSave, MailDelay, MailWrite,
    MailRealDelete,
    FollowUpInfo,
    MailSearch,
    InitOrg,
    MailSave,
    writeForm,
    ToMe,
    SpamSet,
    SignDetail,
    SignGreetDelete,
    GETMailDelay,
    GETMailAutoSave,
    SignEdit,
    GreetEdit,
    GreetList,
    GreetSet,
    GreetAdd,
    GreetDetail, SignAdd, SignSet, SignList, ReadFlag, MailMove, MailDelete, Mail
} from '../../../api/index';
import router from '../../../router/index';
export default {
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
        data.unid = datastr; MailRealDelete(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {

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

                    state.mail.data.followUpInfo = res.data;
                    return true;

                }

            })
    },
    // 메일 검색
    MailSearch({ state, commit, rootState }, { mailtype }) {
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
        data.size = rootState.configjs.store.config.listcount;

        // 

        MailSearch(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    commit("MailDetail", { res: res.data, mailtype });

                }

            })

    },
    MailSave({ state, commit }, { data, menu }) {

        return MailSave(data, menu)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    return true;

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
    SpamSet({ state }, data) {
        SpamSet(data)
            .then(response => {
                if (response.status !== 200) {
                    return false;
                } else { 
                    return true;
                }
            })

    },
    MailWrite({ state, commit }, data) {

        return MailWrite(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    // 
                    return true;
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
    ToMe({ commit ,rootCommit}) {
        return ToMe()
            .then((res) => {
                console.log(res.data)

                commit("ToMe", res.data);
                return res.data;

            })
        //     console.log(result)
        // console.log(commit)

        // await commit("OrgDataInit");
        // commit("AddOrg", { who: "SendTo", value: result });
        // state.mailorg.SendTo.push(data);

    },
    async Org({ state, commit, dispatch }, data) {
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

        // 
        InitOrg(data)
            .then((res) => {
                
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
        } SignGreetDelete(state.store.mailconfig.view[`${where}DetailUnid`])
            .then((response) => {

                if (response.status !== 200) {
                    return false;
                } else {
                    router.push({name:where});

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

        return FollowupSet(data)
            .then(response => {
                if (response.status !== 200) {
                    return false;

                } else {

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
                    commit("BeforeSave"); router.push({ name: 'SeeGreet', params: { before: "add" } });
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
                    commit("BeforeSave"); router.push({ name: 'SeeSign', params: { before: "add" } });
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
        console.log(checkedNames)
        if (checkedNames.length > 0) {
            for (var i = 0; i < checkedNames.length; i++) {
                folderstr += `${checkedNames[i].unid},`;
                // 
            }
            data.ids = folderstr;
            data.viewname = viewname;
            data.folderId = folderId;
            console.log(data,"data")
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
    },    // 메일 삭제
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

    // maildetail data
    GetMailDetail({ commit, state, rootState }, { mailtype, folderId }) {
        state.mail.data[mailtype].page = 0;
        state.mail.data[mailtype].data = [];
        var data = state.mail.data[mailtype];
        data.mailtype = mailtype;
        data.page = 0;
        data.size = rootState.configjs.store.config.listcount;

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
}