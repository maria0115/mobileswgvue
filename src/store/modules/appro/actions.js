import {
    AppSearch,DocApproval, Approval,AppDetail,agreeNreject,AppWrite,deleteItem
} from '../../../api/index';
import router from '../../../router/index';
export default {
    AppSearch({state,commit,rootState},data){
        data.size = rootState.configjs.store.config.listcount;
        AppSearch(data)
        .then((res) => {

            if (res.status !== 200) {
                return false;
            } else {
                console.log(res.data,"appsearch 됐다!!")
                commit("GetApprovalList",{menu:data.type,data:res.data})
                return true;

            }

        })
    },
    deleteItem({state,commit},data){
        return deleteItem(data.unid)
        .then((res) => {
            console.log(res,"resaction");
            if (res.status !== 200) {
                return false;
            } else {
                return true;
            }
        })
    },
    AppWrite({state,commit},data){
        return AppWrite(data)
        .then((res) => {
            if (res.status !== 200) {
                return false;
            } else {
                return true;
            }
        })
    },
    agreeNreject({state,commit},data){
        console.log(data)
        return agreeNreject(data)
        .then((res) => {
            if (res.status !== 200) {
                return false;
            } else {
                
                if(res.data){
                    alert("완료")
                }
                return true;
                // commit("SetDetail",res.data);
                // // router.push(`/approval_more/${data.where}`);

                // return true;

            }
        })

    },
    AppDetail({state,commit}){
        var data = {};
        data.openurl = state.store.app.openurl;
        data.unid = state.store.app.unid;
        data.type = state.store.app.from;
        
        return AppDetail(data)
        .then((res) => {

            if (res.status !== 200) {
                return false;
            } else {
                
                
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

        return Approval(data)
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