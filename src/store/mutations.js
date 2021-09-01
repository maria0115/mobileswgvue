
export default {
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
    // 다국어 데이터
    GetLanguage(state, { res, app }) {
        state.store.language[app] = res;

    },
    // local 시간
    setTime(state) {
        // 지금 이 순간
        var moment = require("moment");
        state.data.created = moment().utc().format("YYYYMMDDTHHmmss");
    },
}