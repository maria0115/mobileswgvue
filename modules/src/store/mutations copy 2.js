
export default {
    CalDetail(state, { data, which }) {
        state.schedule.data.calDetail[which] = data;
    },
    SearchOrgInit(state) {
        state.autosearchorg = {
            mail: {
                SendTo: [],
                CopyTo: [],
                BlindCopyTo: []
            },schedule: {
                SendTo: [],
                CopyTo: [],
                BlindCopyTo: []
            }
        };
    },
    
    AutoSearchOrg(state, { data, menu }) {
        state.autosearchorg[menu.menu][menu.who] = data;
    },
    // 스크롤페이징 업데이트
    changeInfiniteId(state, value) {
        state[value] += 1;

    },
    // 목록이 더 있는지 확인
    MoreList(state, { list }) {

        state.moreList = list;

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
    // local 시간
    setTime(state) {
        // 지금 이 순간
        var moment = require("moment");
        state.data.created = moment().utc().format("YYYYMMDDTHHmmss");
    },

}