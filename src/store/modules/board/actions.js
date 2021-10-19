import {
    ReplyInfo,BoardSearch, BoardWrite, Board, BoardDetail, WriteReply, DeleteReply, Likeit, DeleteBoard, BoardEdit
} from '../../../api/index';
import router from '../../../router/index';
//system 모드이면 무슨 light 인지 dark 인지 감지
export default {
    BoardSearch({ state, commit }, data) {
        return BoardSearch(data)
            .then((res) => {
                if (res.status !== 200) {
                    return false;
                } else {
                    // commit("ListOfCategory", { id: data.lnbid, list: res.data });
                    return res.data;
                }

            })
    },
    BoardEdit({ state, commit }, data) {
        return BoardEdit(data)
            .then((res) => {
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
    EditMode({ state, commit }, boo) {
            // router.replace({name:"boardwrite"});
        commit("EditMode", boo);

    },
    DeleteBoard({ state, commit }, data) {
        return DeleteBoard(data)
            .then((res) => {
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
    Likeit({ dispatch }, data) {
        console.log("likeit",data)
        return Likeit(data)
            .then((res) => {
                if (res.status !== 200) {
                    return false;
                } else {
                    console.log(res.data)

                    // dispatch("BoardDetail", { menu: undefined, unid: undefined, comment: true });

                    return res.data;
                }
            })

    },
    DeleteReply({ state, commit, dispatch }, data) {
        return DeleteReply(data)
            .then((res) => {
                if (res.status !== 200) {
                    return false;
                } else {

                    // dispatch("BoardDetail", { menu: undefined, unid: undefined, comment: true });

                    return true;
                }
            })
    },
    WriteReply({ state, commit, dispatch }, data) {
        return WriteReply(data)
            .then((res) => {
                if (res.status !== 200) {
                    return false;
                } else {

                    // dispatch("BoardDetail", { menu: undefined, unid: undefined, comment: true });
                    return res.data;
                }
            })

    },
    ReplyInfo({state},data){
        return ReplyInfo(data)
        .then((res) => {
            if (res.status !== 200) {
                return false;
            } else {
                console.log(res.data);
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
    BoardDetail({ state, commit }, { menu, unid, comment, type, lnbid,title },viewcount) {
        var data = {};
        data.viewcount = 1;
        console.log(menu, unid, comment, type, lnbid,title)
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
        return BoardDetail(data)
            .then((res) => {
                if (res.status !== 200) {
                    return false;
                } else {
                    commit("BoardDetailData", res.data)
                    if (!comment) {
                        router.push(
                            {
                                name: 'boardread',
                                query: { data: JSON.stringify({ type, lnbid,title }) }
                            });
                            return true;
                    }
                    return false;
                }
            })

    },
    BoardWrite({ state, commit }, data) {
        return BoardWrite(data)
            .then((res) => {
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
        Board(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {

                    commit("GetBoardList", { menu: type, data: res.data })
                    return true;

                }

            })
    },

}