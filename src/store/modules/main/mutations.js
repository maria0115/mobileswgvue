
export default {
    // info data
    MyInfo(state, { res }) {
        if(res.info.notesid){
            res.info.notesid = res.info.notesid.toUpperCase();
        }
        state.store.myinfo = res;
    },
    MyInfoMaster(state, data) {
        state.store.myinfo.master = data;
    },
    // 메일 데이터
    Mail(state, { res, mailtype, category }) {
        state.main.data.mailtype[mailtype][category].data = res;
    },
    // 게시판 데이터
    Board(state, { res, boardtype, category }) {
        state.main.data.boardtype[boardtype][category].data = res;
    },
    // 전자결재 데이터
    Approval(state, { res, approvaltype, category }) {
        if(res.length > 0 || Object.keys(res).length>0){
            state.main.data.approvaltype[approvaltype][category].data = res.data;
            state.main.data.approvaltype[approvaltype][category].cnt = res.cnt;
        }
    },
    
    // 목록이 더 있는지 확인
    MoreList(state, { list,type }) {
        state.moreList[type] = list;

    },
    MoreListInit(state, { list,type }) {
        state.moreList.approve = true;
        state.moreList.approving = true;

    },
    // 일정 데이터
    Schedule(state, { res, scheduletype, category }) {
        state.main.data.scheduletype[scheduletype][category].data = res;
    },
}