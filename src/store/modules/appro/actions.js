import {
    DocApproval, Approval,AppDetail,agreeNreject,AppWrite
} from '../../../api/index';
import router from '../../../router/index';
export default {
    AppWrite({state,commit},data){
        AppWrite(data)
        .then((res) => {
            if (res.status !== 200) {
                return false;
            } else {
                console.log(res.data,"AppWrite");
            }
        })
    },
    agreeNreject({state,commit},data){
        agreeNreject(data)
        .then((res) => {
            if (res.status !== 200) {
                return false;
            } else {
                console.log(res.data,"agreeNreject");
                if(res.data){
                    alert("완료")
                }
                
                // commit("SetDetail",res.data);
                // // router.push(`/approval_more/${data.where}`);

                // return true;

            }
        })

    },
    AppDetail({state,commit}){
        var data = {};
        data.openurl = state.store.app.openurl;
        data.type = state.store.app.from;
        console.log(data)
        return AppDetail(data)
        .then((res) => {

            if (res.status !== 200) {
                return false;
            } else {
                console.log(res.data);
                
                commit("SetDetail",res.data);
                // router.push(`/approval_more/${data.where}`);

                return true;

            }

        })

    },
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
    GetApprovalList({state,commit,rootState},{type}){
        var data = {};
        data.page = 0;
        data.size = rootState.configjs.store.config.listcount;
        data.approvaltype = type;
        Approval(data)
        .then((res) => {

            if (res.status !== 200) {
                return false;
            } else {
                commit("GetApprovalList",{menu:type,data:res.data})
                return true;

            }

        })
    },

}