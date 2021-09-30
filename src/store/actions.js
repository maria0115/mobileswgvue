import {
    OrgAutoSearch, GetLanguage, Login, InitOrg, Org,
} from '../api/index.js';
import axios from 'axios';
import cookie from 'vue-cookie';
import $, { data } from "jquery";
import config from '../config/config.json';
export default {
    logout() {
        console.log("logout")
        if (!JSON.parse(localStorage.getItem("idSave"))) {
            localStorage.setItem(`${config.packageName}id`, "");
        }
        localStorage.setItem("autoLogin", false);
        localStorage.setItem(`${config.packageName}pass`, "");
        return;
    },
    setLogin() {
        const idSave = localStorage.getItem("idSave");
        const autoLogin = localStorage.getItem("autoLogin");
    },
    login({ commit }, credentials) {
        console.log(credentials)
        return Login(credentials)
            .then((res) => {
                if (res.data.success) {
                    var keys = Object.keys(res.data.cookies);
                    for (var i = 0; i < keys.length; i++) {
                        var key = keys[i];
                        console.log(key, res.data.cookies[key], "res.data.cookies[key]")
                        const encookie = escape(res.data.cookies[key]);
                        console.log(encookie)
                        cookie.set(key, res.data.cookies[key]);

                    }
                    localStorage.setItem("idSave", credentials.idSave);
                    localStorage.setItem("autoLogin", credentials.autoLogin);

                    if (credentials.autoLogin) {
                        localStorage.setItem(`${config.packageName}id`, credentials.Username);
                        localStorage.setItem(`${config.packageName}pass`, credentials.Password);
                    }
                    else {
                        localStorage.setItem(`${config.packageName}id`, "");
                        localStorage.setItem(`${config.packageName}pass`, "");
                    }
                    if (credentials.idSave) {

                        localStorage.setItem(`${config.packageName}id`, credentials.Username);
                    } else {
                        localStorage.setItem(`${config.packageName}id`, "");
                    }
                }
                return res.data;
            })
    },
    OrgAutoSearch({ state, commit }, data) {
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
    async Org({ state, commit, dispatch }, data) {
        var chdata = await Org(data)
            .then((res) => {
                return res.data;

            })
        return chdata;
        // dispatch("MoreOrg",chdata);
        // await commit("MailOrgData", chdata);
        // var result = await tree.fetch(state.mailorg);
        // commit("MailOrgTransData", result)
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