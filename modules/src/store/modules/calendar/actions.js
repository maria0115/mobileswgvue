import {
    CalDelete,
    CalDetail,
    CalList,
    
    Holiday,
    OrgAutoSearch,
    Schedule
} from '../../../api/index';
export default {
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
                    console.log("CalDelete", res.data);
                    return true;

                }

            })
    },
    CalDetail({ state, commit }, { data, path, which }) {
        return CalDetail(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    commit("CalDetail", { data: res.data, which });
                    return true;

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
    OrgAutoSearch({ state, commit }, data) {
        console.log(data)

        OrgAutoSearch(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    console.log(res.data)
                    commit("AutoSearchOrg", { data: res.data, menu: data })

                }

            })
    },
    // 일정 data
    GetSchedule({ commit, state }, { scheduletype, category }) {
        var data = state.main.data.scheduletype[scheduletype][category];
        data.scheduletype = scheduletype;
        Schedule(data)
            .then(response => {
                commit('Schedule', { res: response.data, scheduletype, category })
            });
    },

}