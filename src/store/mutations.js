
export default {
    ListOfCategory(state,{id, list}){
        state.listOfCategory[id] = list;
    },
    CategoryList(state,{id,list}) {
        if(id==""){
            id="main";
        }
        state.store.category[id] = list;
    },
    OrgDataDelete(state, { data, pointer }) {
        state.org[pointer] = state.org[pointer].filter((element) => element !== data);
    },
    OrgPointer(state, point) {
        state.org.pointer = point;
    },
    OrgData(state, data) {

        var org = state.org[state.org.pointer];
        if (data.kinds === "Department") {
            data.id = data.mycode;
            data.shortname = data.name;
        }

        if (data.Id) {
            data.id = data.Id;

        }
        org.push(data);

        var result = org.filter(function (item1, idx1) {
            return org.findIndex(function (item2, idx) {
                if (item1.email) {
                    return item1.email == item2.email;
                } else {
                    return (item1.name == item2.name||item1.id == item2.id);
                }
            }) == idx1;
        });
        state.org[state.org.pointer] = result;

    },
    AddOrg(state, { who, value, menu }) {
        var org = state.org[who];
        org.push(value);

        var result = org.filter(function (item1, idx1) {
            return org.findIndex(function (item2, idx) {
                return item1.email == item2.email
            }) == idx1;
        });

        state.org[who] = result;

        return;

    },
    SearchOrgInit(state) {
        state.autosearchorg = {
                SendTo: [],
                CopyTo: [],
                BlindCopyTo: []
        };
    },
    OrgDataInit(state) {
        state.org = {
            pointer: "SendTo",
            SendTo: [],
            CopyTo: [],
            BlindCopyTo: []
        };
        return;
    },
    AutoSearchOrg(state, { data, menu }) {
        state.autosearchorg[menu.who] = data;
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