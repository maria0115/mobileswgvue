import {
    OrgAutoSearch,GetLanguage,
} from '../api/index.js';
import $, { data } from "jquery";
export default {
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
    
    ModalOrgAutoSearch({ state, commit }, data) {

        OrgAutoSearch(data)
            .then((res) => {

                if (res.status !== 200) {
                    return false;
                } else {
                    console.log(res.data, "ModalOrgAutoSearch");

                }

            })
    },
    
    
    // 다국어 data
    async GetLanguage({ commit }, { app }) {
        await GetLanguage(app)
            .then(response => {
                // 
                // 
                commit('GetLanguage', { res: response.data, app })
                return;

            });
    },
    Children({ commit }, { child }) {
        commit('Children', { child })

    },

}