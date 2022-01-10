import {
    CalDelete,
    CalDetail,
    CalList,
    CalWrite,
    Holiday,
    OrgAutoSearch,
} from '../../../api/index';
import router from '../../../router/index';
export default {
    CalWrite({ state, commit, rootState }, { data, type }) {
        rootState.tf = true;
        CalWrite(data, type)
            .then(response => {
                rootState.tf = false;
                if (response.status !== 200) {
                    return false;
                } else {
                    var where = state.store.schedule.detail.where;
                    router.push({ name: `cal${where}` });
                    return true;
                }
            })
    },
    async Holiday({ state, commit, rootState }, data) {
        state.schedule.data.holiday = {};
        // rootState.tf = true;
        var result = await Holiday(data)
            .then(response => {
                // rootState.tf = false;
                if (response.status !== 200) {
                    return false;
                } else {
                    return response.data;
                }
            })

        if (result) {
            state.schedule.data.holiday = result;

        }
        return;
    },
    CalDelete({ state }, data) {
        return CalDelete(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {

                    return true;

                }

            })
    },
    CalDetail({ state, commit, rootState }, { data, path, which }) {
        // 
        return CalDetail(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {

                    commit("CalDetail", { data: res.data, which })
                    // .then((r) => {
                    return true;

                    // })

                }

            })
    },
    CalList({ state, commit, rootState }, { data, which }) {
        rootState.tf = true;
        commit("delCalList",{which});
        CalList(data)
            .then((res) => {
                if (res.status !== 200) {
                    rootState.tf = false;
                    return false;
                } else {
                    commit("CalList", { data: res.data, which, option: data })
                    rootState.tf = false;
                    return true;

                }

            })
    },
}