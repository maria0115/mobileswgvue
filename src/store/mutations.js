
export default {
    OrgInit(state) {
        state.orginit = false;
    },
    AllReply(state, data) {
        state.org = {
            pointer: "SendTo",
            SendTo: state.mailjs.store.maildetail.sendTo,
            CopyTo: state.mailjs.store.maildetail.copyTo,
            BlindCopyTo: []
        };
        state.org.SendTo.push(state.mailjs.store.maildetail.author);
        state.org['SendTo'] = state.org['SendTo'].filter((element) => element.id !== state.mailjs.mail.data.myinfo.id);
        state.org['CopyTo'] = state.org['CopyTo'].filter((element) => element.id !== state.mailjs.mail.data.myinfo.id);

        var send = state.org['SendTo'];
        var copy = state.org['CopyTo'];

        var send = send.filter(function (item1, idx1) {
            return send.findIndex(function (item2, idx) {
                return item1.id == item2.id
            }) == idx1;
        });
        var copy = copy.filter(function (item1, idx1) {
            return copy.findIndex(function (item2, idx) {
                return item1.id == item2.id
            }) == idx1;
        });

        state.org['SendTo'] = send;
        state.org['CopyTo'] = copy;
        console.log(state.org)

    },
    SetBack(state, value) {
        state.back.isBacked = value;
    },
    SetBackPage(state, num) {
        state.back.page = num;

    },
    SetTop(state, num) {
        state.back.top = num;

    },
    SetHeader(state, data) {
        // state.store.header.prevmenu = state.store.header.menu;
        state.store.header.menu = data;

    },
    ListOfCategory(state, { id, list }) {
        state.listOfCategory[id] = list;
    },
    CategoryList(state, { id, list }) {
        if (id == "") {
            id = "main";
        }
        state.store.category[id] = list;
    },
    OrgDataDelete(state, { data, pointer }) {
        state.org[pointer] = state.org[pointer].filter((element) => element !== data);
        state.orgdata = state.orgdata.filter((item, idx) => {
            return item.item.notesId !== data.notesId || item.point !== pointer;
        });
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
                if (item1.notesId) {
                    return item1.notesId == item2.notesId;
                } else {
                    return (item1.name == item2.name || item1.id == item2.id);
                }
            }) == idx1;
        });
        state.org[state.org.pointer] = result;

    },
    duplicateRemove(state) {
        state.orgdata = state.orgdata.filter(function (item1, idx1) {
            return state.orgdata.findIndex(function (item2, idx) {
                return item1.item.notesId == item2.item.notesId && item1.point == item2.point;
            }) == idx1;
        });

    },
    OrgDataAdd(state, item) {
        var result = state.orgdata.findIndex((item1, idx) => {
            return item1.item.notesId == item.item.notesId && item1.point == item.point;
        });

        if (result == -1) {
            state.orgdata.push(item);
        }
    },
    InitOrgData(state) {
        state.orgdata = [];
    },
    DeleteOrgData(state, { val, index }) {
        // state.org[val.point] = state.org[val.point].filter((element) => element.notesId !== val.item.notesId);

        state.orgdata = state.orgdata.filter((item, idx) => {
            return index !== idx || item.item.notesId !== val.item.notesId || item.point !== val.point;
        });
    },
    SetOrgData(state, data) {
        for (var i = 0; i < data.length; i++) {
            var d = data[i].item;
            if (d.kinds === "Department") {
                d.id = d.mycode;
                d.shortname = d.name;
            }
            if (d.Id) {
                d.id = d.Id;
            }
            state.org[data[i].point].push(d);
        }
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
        return res;

    },
    // local 시간
    setTime(state) {
        // 지금 이 순간
        var moment = require("moment");
        state.data.created = moment().utc().format("YYYYMMDDTHHmmss");
    },
}