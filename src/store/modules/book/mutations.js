export default {
    isEdit(state, value) {
        state.store.edit = value;
    },
    NowRoom(state,data){
        state.store.nowroom = data;
    },
    BookDetail(state,data){
        state.detail = data;
    },
    SaveUnid(state,unid){
        state.store.unid = unid;

    },
    List(state, data) {
            state[data.type] = data.res;
        // }
    },
    MyreservationList(state,data){
        state.MyreservationList = data;
    },
}