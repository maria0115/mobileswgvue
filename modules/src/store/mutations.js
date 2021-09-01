
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
    
    // 검색어 초기화
    WordReset(state) {
        state.data.searchword = "";
        state.data.searchwordarr = [];

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