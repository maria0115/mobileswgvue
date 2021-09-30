
export default {
    GetApprovalList(state,{data,menu}){
        state.approval.data[menu].data = data;
    },
    AppSaveUnid(state,{unid,openurl}){
        console.log(unid,openurl,"unid,openurl")
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