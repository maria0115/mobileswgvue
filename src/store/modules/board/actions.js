import {
    ReplyInfo,BoardSearch, BoardWrite, Board, BoardDetail, WriteReply, DeleteReply, Likeit, DeleteBoard, BoardEdit, GetBoardSet
} from '../../../api/index';
import router from '../../../router/index';
//system 모드이면 무슨 light 인지 dark 인지 감지
export default {
    GetBoardSet({ state,commit }, {lnbid,type}){
        return GetBoardSet({lnbid,type})
        .then((res) => {
            // rootState.tf = false;
            if (res.status !== 200) {
                return false;
            } else {
                console.log(res.data)
                commit("GetBoardSet", res.data);
                return res.data;
            }

        })
    },
    BoardSearch({ state, commit, rootState }, data) {
        rootState.tf = true;
        return BoardSearch(data)
            .then((res) => {
                rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {
                    // commit("ListOfCategory", { id: data.lnbid, list: res.data });
                    return res.data;
                }

            })
    },
    BoardEdit({ state, commit, rootState }, data) {
        rootState.tf = true;
        return BoardEdit(data)
            .then((res) => {
                rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {
                    // router.push({
                    //     name: "boardlist",
                    //     query: {
                    //         data: JSON.stringify({
                    //             type: state.store.board.path
                    //         })
                    //     }
                    // });
                    // commit("BoardWrite", { menu: type, data: res.data })
                    return true;
                }
            })

    },
    EditMode({ state, commit, rootState }, boo) {
            // router.replace({name:"boardwrite"});
        commit("EditMode", boo);

    },
    DeleteBoard({ state, commit, rootState }, data) {
        rootState.tf = true;
        return DeleteBoard(data)
            .then((res) => {
                rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {
                    // router.replace({
                    //     name: "boardlist",
                    //     query: {
                    //         data: JSON.stringify({
                    //             type: state.store.board.path
                    //         })
                    //     }
                    // });
                    // dispatch("BoardDetail", { menu: undefined, unid: undefined,comment:true });

                    return true;
                }
            })

    },
    Likeit({ dispatch,rootState }, data) {
        rootState.tf = true;
        return Likeit(data)
            .then((res) => {
                rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {

                    // dispatch("BoardDetail", { menu: undefined, unid: undefined, comment: true });

                    return res.data;
                }
            })

    },
    DeleteReply({ state, commit, rootState, dispatch }, data) {
        rootState.tf = true;
        return DeleteReply(data)
            .then((res) => {
                rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {

                    // dispatch("BoardDetail", { menu: undefined, unid: undefined, comment: true });

                    return true;
                }
            })
    },
    WriteReply({ state, commit, rootState, dispatch }, data) {
        rootState.tf = true;
        return WriteReply(data)
            .then((res) => {
                rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {

                    // dispatch("BoardDetail", { menu: undefined, unid: undefined, comment: true });
                    return res.data;
                }
            })

    },
    ReplyInfo({state,rootState},data){
        rootState.tf = true;
        return ReplyInfo(data)
        .then((res) => {
            rootState.tf = false;
            if (res.status !== 200) {
                return false;
            } else {
                return res.data;
                // commit("BoardReplyInfo", res.data)
                // if (!comment) {
                //     router.push(
                //         {
                //             name: 'boardread',
                //             query: { data: JSON.stringify({ type, lnbid,title }) }
                //         });
                //         return true;
                // }
                // return false;
            }
        })


        // rootunid
    },
    BoardDetail({ state, commit, rootState }, { menu, unid, comment, type, lnbid,title,top },viewcount) {
        var data = {};
        data.viewcount = 1;
        if (menu) {
            data.menu = menu;
            commit("BoardWritePath", menu);
        } else {
            data.menu = state.store.board.path;
        }
        if (unid) {
            commit("BoardSaveUnid", unid);
            data.unid = unid;
        } else {
            data.unid = state.store.board.unid;
        }

        if(viewcount){
            data.viewcount =viewcount;

        }

        data.lnbid = lnbid;
        rootState.tf = true;
        return BoardDetail(data)
            .then((res) => {
                rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {
                    commit("BoardDetailData", res.data)
                    if (!comment) {
                        router.push(
                            {
                                name: 'boardread',
                                query: { data: JSON.stringify({ type, lnbid,title,top }) }
                            });
                            return true;
                    }
                    return false;
                }
            })

    },
    BoardWrite({ state, commit, rootState }, data) {
        rootState.tf = true;
        return BoardWrite(data)
            .then((res) => {
                rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {
                    // router.push(`/board_more/${state.store.board.path}`);
                    // commit("BoardWrite", { menu: type, data: res.data })
                    return res.data;
                }
            })

    },
    GetBoardList({ state, commit, rootState }, { type }) {


        var data = {};
        data.page = 0;
        data.size = rootState.configjs.store.config.listcount;
        data.boardtype = type;
        rootState.tf = true;
        Board(data)
            .then((res) => {
                rootState.tf = false;

                if (res.status !== 200) {
                    return false;
                } else {

                    commit("GetBoardList", { menu: type, data: res.data })
                    return true;

                }

            })
    },

}