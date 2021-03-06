
export default {
    MAIL_DETAIL_INIT(state) {
        state.store.maildetail = {
            attach: [],
            author: { name: '', }
        };
        state.store.maildetail.unid = '';
    },
    MailSearchOptionInit(state) {
        state.store.mailconfig.searchOption = {
            size: "14",
            page: "0",
            searchType: "",
            searchfield: "",
            searchword: ""
        }
    },
    MailSearchOption(state, data) {
        state.store.mailconfig.searchOption = data;

        return;

    },
    From(state, from) {
        state.from = from;
    },
    MailOrgTransData(state, data) {
        state.mail.data.org.trans = data;
    },
    ToMe(state, data) {
        // 
        state.mail.data.myinfo = data;

    },
    AllReply(state, data) {
        state.mailorg = {
            pointer: "SendTo",
            SendTo: state.store.maildetail.sendTo,
            CopyTo: state.store.maildetail.copyTo,
            BlindCopyTo: []
        };
        state.mailorg.SendTo.push(state.store.maildetail.author);
        state.mailorg['SendTo'] = state.mailorg['SendTo'].filter((element) => element.id !== state.mail.data.myinfo.id);
        state.mailorg['CopyTo'] = state.mailorg['CopyTo'].filter((element) => element.id !== state.mail.data.myinfo.id);

        var send = state.mailorg['SendTo'];
        var copy = state.mailorg['CopyTo'];

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

        state.mailorg['SendTo'] = send;
        state.mailorg['CopyTo'] = copy;

    },
    MailOrgInit(state) {
        state.mailorginit = false;
    },
    MailConfigUnid(state, { unid, what }) {
        state.store.mailconfig.view[what] = unid;
    },
    MailDetailFolder(state, folderName) {

        state.store.folderName = folderName;
    },
    MailDetailUnid(state, { unid, type }) {

        state.store.maildetail.unid = unid;
        state.store.maildetail.type = type;
    },
    GetSend(state, data) {
        for (var key in data) {
            state.store.maildetail[key] = data[key];
        }
    },
    MailDetailData(state, data) {

        var unid = state.store.maildetail.unid;
        state.store.maildetail = data;
        state.store.maildetail.unid = unid;

    },
    GreetViewData(state, data) {
        state.store.greetviewdata = data;
        return;
    },
    SignViewData(state, data) {
        state.store.signviewdata = data;
        return;
    },
    BeforeSave(state,) {
        state.store.mailconfig.beforesave = true;

    },
    DisBeforeSave(state,) {
        state.store.mailconfig.beforesave = false;

    },
    MailCustomFolderTitle(state, title) {
        state.store.mailCustomFolderTitle = title;
    },
    SignList(state, { res }) {
        state.mail.data.signature.data = res;
    },
    GreetList(state, { res }) {
        state.mail.data.greetings.data = res;
    },
    // ?????? ?????? ??????
    disAllCheck(state) {
        state.mail.checkBtn.allchecked = false;

    },
    // ?????? ??????
    allCheck(state, path) {
        // 
        // state.mail.checkBtn.allchecked = !state.mail.checkBtn.allchecked;
        state.mail.checkBtn.allchecked = !state.mail.checkBtn.allchecked;
        // 

        if (state.mail.checkBtn.allchecked) {
            state.mail.checkBtn.checkedNames = [];
            var data = state.mail.data[path].data.data;
            for (var i = 0; i < data.length; i++) {
                var res = {};
                res.unid = data[i].unid;
                res.key = i;
                state.mail.checkBtn.checkedNames.push(res);
            }
        } else {
            state.mail.checkBtn.checkedNames = [];
        }
    },
    // ???????????? ??????
    Back(state) {
        state.mail.checkBtn.editclicked = false;
        state.mail.checkBtn.photoon = true;
        state.mail.checkBtn.checkedNames = [];
        state.mail.checkBtn.allchecked = false;
    },
    checkedNamesRemove(state) {
        state.mail.checkBtn.checkedNames = [];

    },
    checkedNamesPush(state, unid) {
        state.mail.checkBtn.checkedNames = [];

        var data = {};
        data.unid = unid;
        data.key = unid;
        state.mail.checkBtn.checkedNames.push(data);
        return;
    },
    // ???????????? ?????????
    editClick(state) {
        state.mail.checkBtn.editclicked = !state.mail.checkBtn.editclicked;
        state.mail.checkBtn.photoon = !state.mail.checkBtn.photoon;
    },
    // ?????? ??????
    mailDelete(state, { type }) {
        var data = state.mail.data[type].data.data;
        var checked = state.mail.checkBtn.checkedNames;
        for (var i = 0; i < checked.length; i++) {
            data = data.filter((element) => element.unid !== checked[i].unid);
        }
        state.mail.data[type].data.data = data;
        state.mail.data[type].data.total -= checked.length;

        checked = [];
    },
    // ?????? ?????? ?????????
    MailDetail(state, { res, mailtype }) {
        if (Object.keys(res).length === 0) {
            res.total = 0;
        }

        state.mail.data[mailtype].data = res;
        // 
    },


}