
export default {
    GetApprovalList(state,{data,menu}){
        state.approval.data[menu].data = data;
    },

}