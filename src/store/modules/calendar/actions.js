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
    CalWrite({ state, commit }, { data, type }) {
        CalWrite(data, type)
            .then(response => {
                if (response.status !== 200) {
                    return false;
                } else {
                    var where = state.store.schedule.detail.where;
                    router.push({ name: `cal${where}` });
                    return true;
                }
            })
    },
    async Holiday({ state, commit }, data) {
        state.schedule.data.holiday = {};
        var result = await Holiday(data)
            .then(response => {
                if (response.status !== 200) {
                    return false;
                } else {
                    if (response.data.item) {
                        return response.data.item;
                    } else {
                        return {};
                    }
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
    CalDetail({ state, commit }, { data, path, which }) {
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
    CalList({ state, commit }, { data, which }) {

        CalList(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    commit("CalList", { data: res.data, which, option: data })
                    return true;

                }

            })
    },
}