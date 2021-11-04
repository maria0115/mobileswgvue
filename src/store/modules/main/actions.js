import {
    MyInfo, Mail, Board, Approval, Schedule
} from '../../../api/index';
export default {
    // main의 info
    GetMyInfo({ commit, rootState }) {
        rootState.tf = true;
        MyInfo()
            .then(response => {
                rootState.tf = false;
                commit('MyInfo', { res: response.data })
            });
    },
    // mail data
    GetMail({ commit, rootState, state }, { mailtype, category }) {
        var data = state.main.data.mailtype[mailtype][category];
        data.mailtype = mailtype;
        rootState.tf = true;
        Mail(data)
            .then(response => {
                rootState.tf = false;

                commit('Mail', { res: response.data, mailtype, category })
            });
    },
    // 게시판 data
    GetBoard({ state, commit, rootState }, { boardtype, category }) {
        var data = state.main.data.boardtype[boardtype][category];
        data.boardtype = boardtype;

        rootState.tf = true;
        Board(data)
            .then(response => {
                rootState.tf = false;

                commit('Board', { res: response.data, boardtype, category })
            });
    },
    // 전자결재 data
    GetApproval({ state, commit, dispatch, rootState }, { approvaltype, category }) {
        var data = state.main.data.approvaltype[approvaltype][category]
        data.approvaltype = approvaltype;
        var result = {};
        data.page = 0;

        rootState.tf = true;
        Approval(data)
            .then(response => {
                rootState.tf = false;


                result.data = response.data;
                commit('Approval', { res: response.data, approvaltype, category })
            });
        // if (approvaltype === "approve") {

        dispatch("GetMoreList", { data })
    },
    // 해당 페이지 이후 데이터가 더 있는지 확인
    GetMoreList({ state, commit, rootState }, { data }) {

        var doyouhavemorelist = {};
        doyouhavemorelist.approvaltype = data.approvaltype;
        doyouhavemorelist.page = String(parseInt(data.page) + 1)
        doyouhavemorelist.size = data.size;
        rootState.tf = true;
        Approval(doyouhavemorelist)
            .then(response => {
                rootState.tf = false;

                // 
                if (response.data.data && response.data.data.length > 0) {
                    commit("MoreList", { list: true, type: data.approvaltype });
                    // 
                }
                else {
                    // 
                    commit("MoreList", { list: false, type: data.approvaltype });

                }
            })
            .catch(e => {

                commit("MoreList", { list: false, type: data.approvaltype });
                // 
            })

    },
    // 일정 data
    GetSchedule({ commit, rootState, state }, { scheduletype, category }) {
        var data = state.main.data.scheduletype[scheduletype][category];
        data.scheduletype = scheduletype;
        rootState.tf = true;
        Schedule(data)
            .then(response => {
                rootState.tf = false;
                commit('Schedule', { res: response.data, scheduletype, category })
            });
    },
}