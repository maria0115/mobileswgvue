import {
    OrgAutoSearch, GetLanguage, Login, InitOrg, Org, CategoryList, ListOfCategory, DocView, Logout
} from '../api/index.js';
import {jsonPost} from '@/api/editor';
import { setRawCookie, removeCookie } from 'tiny-cookie';
import cookie from 'vue-cookies';
import config from '../config/config.json';

var firstDot = window.location.hostname.indexOf(".");

var domain = window.location.hostname.substring(
    firstDot == -1 ? 0 : firstDot + 1
);
export default {
    editorJsonPost({ state, commit },data){
        console.log(data)
        return jsonPost(data)
        .then((res) => {
            res.status !== 200?res = false:res=res.data;
            return res;
        })
    },
    SetHeader({ dispatch, commit }, data) {

        commit("SetHeader", data);
    },
    ListOfCategory({ state, commit }, data) {
        state.tf = true;
        return ListOfCategory(data)
            .then((res) => {
                state.tf = false;

                if (res.status !== 200) {
                    return false;
                } else {
                    commit("ListOfCategory", { id: data.lnbid, list: res.data });
                    return res.data;

                }

            })
    },
    CategoryList({ state, commit }, id) {
        return CategoryList(id)
            .then((res) => {
                if (res.status !== 200) {
                    return false;
                } else {
                    commit("CategoryList", { id, list: res.data });
                    return res.data;
                }
            })
    },
    logout(s) {

        cookie.remove("LtpaToken", null, domain);
        cookie.remove("language", null, domain);

        if (!JSON.parse(localStorage.getItem("idSave"))) {
            localStorage.setItem(`${config.packageName}id`, "");
        }
        localStorage.setItem("autoLogin", false);
        localStorage.setItem(`${config.packageName}pass`, "");
        var info = JSON.parse(localStorage.getItem(`${config.packageName}deviceInformation`));
        Logout(info)
            .then((res) => {
                if (res.data.success) {
                    return;
                }
                return;
            })
        return;
    },
    setLogin() {
        const idSave = localStorage.getItem("idSave");
        const autoLogin = localStorage.getItem("autoLogin");
    },
    login({ state, commit }, credentials) {


        state.tf = true;
        return Login(credentials)
            .then((res) => {
                state.tf = false;
                if (res.data.success) {
                    var keys = Object.keys(res.data.cookies);
                    for (var i = 0; i < keys.length; i++) {
                        var key = keys[i];

                        // const encookie = escape(res.data.cookies[key]);
                        // 
                        // if(key=='LtpaToken'){
                        //     var deltpa = decodeURI(res.data.cookies[key]);
                        //     
                        //     deltpa = decodeURI(deltpa);
                        //     cookie.set(key, deltpa);
                        //     

                        // }else{
                        setRawCookie(key, res.data.cookies[key], { domain });

                        // }

                    }
                    // 
                    localStorage.setItem("idSave", credentials.idSave);
                    localStorage.setItem("autoLogin", credentials.autoLogin);

                    if (credentials.autoLogin) {
                        localStorage.setItem(`${config.packageName}id`, credentials.Username);
                        localStorage.setItem(`${config.packageName}pass`, credentials.Password);
                    }
                    else {
                        localStorage.setItem(`${config.packageName}id`, "");
                        localStorage.setItem(`${config.packageName}pass`, "");
                        if (credentials.idSave) {
                            localStorage.setItem(`${config.packageName}id`, credentials.Username);
                        }
                    }
                }
                return res.data;
            })
    },
    OrgAutoSearch({ state, commit }, data) {
        state.tf = true;
        OrgAutoSearch(data)
            .then((res) => {
                state.tf = false;

                if (res.status !== 200) {
                    return false;
                } else {

                    commit("AutoSearchOrg", { data: res.data, menu: data })

                }

            })
    },
    async Org({ state, commit, dispatch }, data) {
        // state.tf = true;
        var chdata = await Org(data)
            .then((res) => {
                // state.tf = false;
                return res.data;

            })
        return chdata;
        // dispatch("MoreOrg",chdata);
        // await commit("MailOrgData", chdata);
        // var result = await tree.fetch(state.mailorg);
        // commit("MailOrgTransData", result)
    },
    ModalOrgAutoSearch({ state, commit }, data) {

        state.tf = true;
        OrgAutoSearch(data)
            .then((res) => {
                state.tf = false;

                if (res.status !== 200) {
                    return false;
                } else {


                }

            })
    },
    tf({ state }, { data }) {
        state.tf = data;
    },

    DocView({ state }, data) {
        state.tf = true;
        return DocView(data)
            .then((res) => {
                // if (res.status === 200) {
                //     state.tf = false;
                // }
                return res;
            })

    },


    // 다국어 data
    GetLanguage({ commit }, { app }) {
        return GetLanguage(app)
            .then(response => {
                commit('GetLanguage', { res: response.data, app });

                return response.data;
                // .then(res=>{
                //     console.log(res);
                //     return;
                // })
            });
    },
    Children({ commit }, { child }) {
        commit('Children', { child })

    },

}