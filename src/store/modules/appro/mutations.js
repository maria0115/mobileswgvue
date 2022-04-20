
export default {
    SetSearchOption(state,data){
        state.searchoption =data;
    },
    GetApprovalList(state,{data,menu}){
        state.approval.data[menu].data = data;
        return;
    },
    AppSaveUnid(state,{unid,openurl}){
        state.store.app.unid = unid;
        state.store.app.openurl = openurl;

    },
    AppSaveFrom(state,from){
        state.store.app.from = from;

    },
    SetDetail(state,data){
        state.detail = data;
    },

}