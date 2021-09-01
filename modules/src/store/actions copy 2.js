import {
    OrgAutoSearch,GetLanguage, Board, Approval
} from '../api/index.js';
import $, { data } from "jquery";
export default {
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

}