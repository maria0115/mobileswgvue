import Vue from 'vue';
import VueX from 'vuex';
import actions from './actions.js';
import mutations from './mutations.js';
import config from '../config/key.js';
import * as Cookies from "js-cookie";
import { dataStore } from './module';

import createPersistedState from 'vuex-persistedstate';
const dataState = createPersistedState({
    paths: ['store.config','store.systemcolor','store.language','store.myinfo'],
    // storage: {
    //     getItem: key => Cookies.get(key),
    //     setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
    //     removeItem: key => Cookies.remove(key)
    //   }
        
})
Vue.use(VueX)

export const store = new VueX.Store({
    // const data = {
    modules: {
        store:dataStore
    },
    plugins: [dataState],
    // plugins: [createPersistedState()],
    state: {
        // config: config.config,  //사용자가 설정한 환결설정
        // systemcolor: config.systemcolor,    // 환경설정에서 display를 system mode로 설정 했다면 os에 설정된 색
        // language: config.store.language,  //다국어
        // myinfo: {
        //     info: {
        //         dept: "",
        //         name: "",
        //         position: "",
        //         photo: ""
        //     },
        //     approvalCount: 0,
        //     mailCount: 0,
        //     scheduleCount: 0
        // },
        autoList: {}, // 자동완성 검색 결과,
        recent: {}, //최근검색 결과,
        sortdata: {},   //통합검색 데이터
        langa: { locale: "ko" },    //locale default 설정
        form: config.search.form,   // search tab menu 변수 설정
        children: [],
        main: config.main,  //main 변수 설정
        mail: config.mail,
        // language: config.language,  //다국어}
        data: {     //통합검색의 검색할 때 변수 설정
            from: 0,
            size: config.search.defaultSize, // 게시물 몇 개씩 보여줄건지
            fieldname: "all", //all 아니면
            // "subject",
            // "body",
            // "author",
            // "dept",
            // "attached",
            // "attachtext",
            // "phone",
            // "jobposition",
            // "companytel",
            // "email",
            // "job"
            searchword: "",
            searchwordarr: [], // AND 검색일 경우
            aOrd: "desc", //정확도순
            class: 'allsearch', // category (all은 전체검색) 변수
            //     "dept",
            //  "person",
            // "board",
            // "approval",
            // "mail"
            pagenum: 0, // 보낼 데이터의 page
            dateType: "all", // 날짜 필터 (all은 모든 날짜)
            gte: "default", // 날짜 필터의 값 (now-1d ...) 변수
            // 'now-1h/s
            //   'now-1d/d
            //   'now-7d/d
            //   'now-1M/d
            //   'now-1y/d
            utc: config.timezone,
            created: "", // 현재 시각 보낼때 마다 받아오기
        },
        moreList: false,
    },
    mutations,
    actions,
    getters: {
        GetConfig: (state) => {
            return state.store.config;
        },
        GetFont: (state) => {
            return state.store.config.font;
        },
        GetLanguageConfig: (state) => {
            return state.store.language.config;
        },
        GetAllim: (state) => {
            return state.store.language.config.allim;
        },
        GetDisplay: (state) => {
            return state.store.language.config.display;
        },
        GetStyle: (state) => {
            return state.store.language.config.style;
        },
        GetMainLanguage: (state) => {
            return state.store.language.main;
        },
        GetSearchLanguage: (state) => {
            return state.store.language.search;
        },
        GetMain: (state) => {
            return state.main.data;
        },
        GetMail: (state) => {
            return state.mail.data;
        },
        GetMyInfo: (state) => {
            return state.store.myinfo;
        },
        GetSystemColor: (state) => {
            return state.store.systemcolor;
        },
    },
    // }
})

// export async function getstore() {
//     // data.state.children = await child.get();
//     // console.log(data.state)
//     return new VueX.Store(data);
// }


