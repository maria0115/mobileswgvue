export default {
    EditMode(state,boo){
        state.store.board.edit = boo;

    },
    BoardDetailData(state, data) {
        
        state.store.board.parents = [];
        var reply = data.reply;
        for(var i in reply) {
            var d = {};
            d.unid = reply[i].my_unid;
            d.data = reply[i];
            state.store.board.parents.push(d);
        }
        state.store.board.detail = data;
    },
    BoardSaveUnid(state,unid) {
        state.store.board.unid= unid;
    },
    BoardWritePath(state, path) {
        
        state.store.board.path = path;

    },
    GetBoardList(state,{data,menu}){
        state.board.data[menu].data = data;

    },
}