import {
     MyInfo,Mail,Board,Approval,Schedule
} from '../../../api/index';
export default {
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
                console.log(response.data)
                result.data = response.data;
                commit('Approval', { res: response.data, approvaltype, category })
            });
        if (approvaltype === "approve") {

            dispatch("GetMoreList", { data })
        }


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
                    commit("MoreList", { list: true,type:data.approvaltype });
                    // 
                }
                else {
                    // 
                    commit("MoreList", { list: false,type:data.approvaltype });

                }
            })
            .catch(e => {
                commit("MoreList", { list: false,type:data.approvaltype });
                // 
            })

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
}