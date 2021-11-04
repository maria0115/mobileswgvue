
export default {
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
    MailDetailUnid(state, unid) {
        
        state.store.maildetail.unid = unid;
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
    // 모두 체크 해제
    disAllCheck(state) {
        state.mail.checkBtn.allchecked = false;

    },
    // 모두 체크
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
    // 체크모드 해제
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
    // 체크모드 활성화
    editClick(state) {
        state.mail.checkBtn.editclicked = !state.mail.checkBtn.editclicked;
        state.mail.checkBtn.photoon = !state.mail.checkBtn.photoon;
    },
    // 메일 삭제
    mailDelete(state, { type }) {
        var data = state.mail.data[type].data.data;
        var checked = state.mail.checkBtn.checkedNames;
        console.log(checked,data)
        for (var i = 0; i < checked.length; i++) {
            data = data.filter((element) => element.unid !== checked[i].unid);
        }
        state.mail.data[type].data.data = data;
        state.mail.data[type].data.total -= checked.length;

        checked = [];
    },
    // 메일 목록 데이터
    MailDetail(state, { res, mailtype }) {
        if (Object.keys(res).length === 0) {
            res.total = 0;
        }

        state.mail.data[mailtype].data = res;
        // 
    },
    
    
}