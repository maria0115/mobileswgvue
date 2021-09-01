import {
    DocApproval, Approval
} from '../../../api/index';
export default {
   
    DocApproval({state,commit},{type}){

        DocApproval(type)
        .then((res) => {

            if (res.status !== 200) {
                return false;
            } else {
                commit("GetApprovalList",{menu:type,data:res.data})
                return true;

            }

        })

    },
    GetApprovalList({state,commit},{type}){
        var data = {};
        data.page = 0;
        data.size = state.approval.data[type].size;
        data.approvaltype = type;
        Approval(data)
        .then((res) => {

            if (res.status !== 200) {
                return false;
            } else {
                console.log("GetApprovalList", res.data,type)
                commit("GetApprovalList",{menu:type,data:res.data})
                return true;

            }

        })
    },

}