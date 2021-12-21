import {
    AppSearch, DocApproval, Approval, AppDetail, agreeNreject, AppWrite, deleteItem
} from '../../../api/index';
import router from '../../../router/index';
export default {
    AppSearch({ state, commit, rootState }, data) {
        data.size = rootState.configjs.store.config.listcount;
        rootState.tf = true;
        return AppSearch(data)
            .then((res) => {
                rootState.tf = false;

                if (res.status !== 200) {
                    return false;
                } else {

                    commit("GetApprovalList", { menu: data.type, data: res.data })
                    return true;

                }

            })
    },
    deleteItem({ state, commit, rootState }, data) {
        rootState.tf = true;
        return deleteItem(data)
            .then((res) => {
                rootState.tf = false;

                if (res.status !== 200) {
                    return false;
                } else {
                    return true;
                }
            })
    },
    AppWrite({ state, commit, rootState }, { data, type }) {
        rootState.tf = true;
        return AppWrite({ data, type })
            .then((res) => {
                rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {
                    return true;
                }
            })
    },
    agreeNreject({ state, commit, rootState }, data) {

        rootState.tf = true;
        return agreeNreject(data)
            .then((res) => {
                rootState.tf = false;
                if (res.status !== 200) {
                    return false;
                } else {

                    if (res.data) {
                        alert("처리되었습니다.")
                    }
                    return true;
                    // commit("SetDetail",res.data);
                    // // router.push(`/approval_more/${data.where}`);

                    // return true;

                }
            })

    },
    AppDetail({ state, commit, rootState }) {
        var data = {};
        data.openurl = state.store.app.openurl;
        data.unid = state.store.app.unid;
        data.type = state.store.app.from;

        rootState.tf = true;
        return AppDetail(data)
            .then((res) => {
                rootState.tf = false;

                if (res.status !== 200) {
                    return false;
                } else {


                    commit("SetDetail", res.data);
                    // router.push(`/approval_more/${data.where}`);

                    return true;

                }

            })

    },
    DocApproval({ state, commit, rootState }, { type }) {

        rootState.tf = true;
        DocApproval(type)
            .then((res) => {
                rootState.tf = false;

                if (res.status !== 200) {
                    return false;
                } else {
                    commit("GetApprovalList", { menu: type, data: res.data })
                    return true;

                }

            })

    },
    GetApprovalList({ state, commit, rootState }, { type }) {
        var data = {};
        data.page = 0;
        data.size = rootState.configjs.store.config.listcount;
        data.approvaltype = type;

        rootState.tf = true;
        return Approval(data)
            .then((res) => {
                rootState.tf = false;

                if (res.status !== 200) {
                    return false;
                } else {
                    commit("GetApprovalList", { menu: type, data: res.data })

                    return true;

                }

            })
    },

}