import {
    BoardWrite, Board, BoardDetail, WriteReply, DeleteReply, Likeit,DeleteBoard ,BoardEdit
} from '../../../api/index';
import router from '../../../router/index';
//system 모드이면 무슨 light 인지 dark 인지 감지
export default {
    BoardEdit({ state, commit }, data) {
        BoardEdit(data)
            .then((res) => {
                if (res.status !== 200) {
                    return false;
                } else {
                    router.push(`/board_more/${state.store.board.path}`);
                    // commit("BoardWrite", { menu: type, data: res.data })
                    return true;
                }
            })

    },
    EditMode({state,commit},boo){
        router.replace(`/board_more/write`);
        commit("EditMode",boo);

    },
    DeleteBoard({ state, commit }, data){
        DeleteBoard(data)
        .then((res) => {
            if (res.status !== 200) {
                return false;
            } else {
                router.replace(`/board_more/${state.store.board.path}`);

                // dispatch("BoardDetail", { menu: undefined, unid: undefined,comment:true });

                return true;
            }
        })

    },
    Likeit({ dispatch }, data){
        Likeit(data)
        .then((res) => {
            if (res.status !== 200) {
                return false;
            } else {
                console.log(res.data)
                dispatch("BoardDetail", { menu: undefined, unid: undefined,comment:true });

                return true;
            }
        })

    },
    DeleteReply({ state, commit, dispatch }, data) {
        DeleteReply(data)
            .then((res) => {
                if (res.status !== 200) {
                    return false;
                } else {
                    console.log(res.data)
                    dispatch("BoardDetail", { menu: undefined, unid: undefined,comment:true });

                    return true;
                }
            })
    },
    WriteReply({ state, commit, dispatch }, data) {
        WriteReply(data)
            .then((res) => {
                if (res.status !== 200) {
                    return false;
                } else {
                    console.log(res.data)
                    dispatch("BoardDetail", { menu: undefined, unid: undefined,comment:true });
                    return true;
                }
            })

    },
    BoardDetail({ state, commit }, { menu, unid, comment }) {
        var data = {};
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
        BoardDetail(data)
            .then((res) => {
                if (res.status !== 200) {
                    return false;
                } else {
                    if (!comment) {
                        router.push({name:'boardread'});
                    }
                    commit("BoardDetailData", res.data)
                    return true;
                }
            })

    },
    BoardWrite({ state, commit }, data) {
        BoardWrite(data)
            .then((res) => {
                if (res.status !== 200) {
                    return false;
                } else {
                    router.push(`/board_more/${state.store.board.path}`);
                    // commit("BoardWrite", { menu: type, data: res.data })
                    return true;
                }
            })

    },
    GetBoardList({ state, commit, rootState }, { type }) {
        console.log("Get", type)
        console.log(state)
        var data = {};
        data.page = 0;
        data.size = rootState.configjs.store.config.listcount;
        data.boardtype = type;
        Board(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    console.log("GetBoardList", res.data, type)
                    commit("GetBoardList", { menu: type, data: res.data })
                    return true;

                }

            })
    },

}