
export default {
    GetApprovalList(state,{data,menu}){
        state.approval.data[menu].data = data;
    },
    AppSaveUnid(state,{unid}){
        state.store.app.unid = unid;

    },
    AppSaveFrom(state,from){
        state.store.app.from = from;

    },
    SetDetail(state,data){
        state.detail = data;
    },

}